const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const JobApplication = require('../models/JobApplication');
const nodemailer = require('nodemailer');

// Read the logo image
const logoPath = path.join(__dirname, '..', 'public', 'images', 'mail.png');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'resumes');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Sanitize filename
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, Date.now() + '-' + sanitizedFilename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed!'));
    }
  }
});

// Submit job application
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    console.log('Received application submission:', {
      body: req.body,
      file: req.file
    });

    const { firstName, lastName, email, phone, position, coverLetter } = req.body;
    const resumePath = req.file ? path.relative(path.join(__dirname, '..'), req.file.path) : null;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !position) {
      return res.status(400).json({ 
        message: 'All required fields must be filled out',
        missingFields: {
          firstName: !firstName,
          lastName: !lastName,
          email: !email,
          phone: !phone,
          position: !position
        }
      });
    }

    if (!resumePath) {
      return res.status(400).json({ message: 'Resume is required' });
    }

    if (!position || typeof position !== 'string') {
      return res.status(400).json({ message: 'Valid position is required' });
    }

    // Check for duplicate application
    const existingApplication = await JobApplication.findOne({ email, position });
    if (existingApplication) {
      return res.status(400).json({ 
        message: 'You have already applied for this position',
        existingApplication
      });
    }

    const application = new JobApplication({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      position: position.trim(),
      resume: resumePath,
      coverLetter: coverLetter ? coverLetter.trim() : ''
    });

    await application.save();

    // Try to send confirmation emails, but don't fail if they don't work
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        // Send confirmation to applicant
        const applicantMailOptions = {
          from: `"Monk Technologies" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Job Application Received - Monk Technologies',
          html: `
            <h2>Thank you for applying to Monk Technologies!</h2>
            <p>Dear ${firstName},</p>
            <p>We have received your application for the ${position} position. Our team will review your application and get back to you soon.</p>
            <p>Best regards,<br>Monk Technologies Team</p>
            <img src="cid:logo" alt="Monk Technologies Logo" style="max-width: 200px; margin-top: 20px;">
          `,
          attachments: [{
            filename: 'mail.png',
            path: logoPath,
            cid: 'logo'
          }]
        };

        // Send notification to admin
        const adminMailOptions = {
          from: `"Monk Technologies" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Job Application Received',
          html: `
            <h2>New Job Application Received</h2>
            <p>A new job application has been submitted:</p>
            <ul>
              <li><strong>Name:</strong> ${firstName} ${lastName}</li>
              <li><strong>Position:</strong> ${position}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Resume:</strong> ${resumePath}</li>
              <li><strong>Cover Letter:</strong> ${coverLetter || 'Not provided'}</li>
            </ul>
            <p>You can view the full application in the admin dashboard.</p>
            <img src="cid:logo" alt="Monk Technologies Logo" style="max-width: 200px; margin-top: 20px;">
          `,
          attachments: [{
            filename: 'mail.png',
            path: logoPath,
            cid: 'logo'
          }]
        };

        // Send both emails
        await Promise.all([
          transporter.sendMail(applicantMailOptions),
          transporter.sendMail(adminMailOptions)
        ]);
      }
    } catch (emailError) {
      console.error('Failed to send confirmation emails:', emailError);
      // Don't throw the error, just log it
    }

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    
    // If there was a file upload error, clean up the uploaded file
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting uploaded file:', err);
      });
    }

    // Send appropriate error response
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation Error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'You have already applied for this position'
      });
    }

    res.status(500).json({ 
      message: 'Error submitting application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all applications (admin only)
router.get('/', async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Update application status (admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(application);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Error updating application status' });
  }
});

module.exports = router; 