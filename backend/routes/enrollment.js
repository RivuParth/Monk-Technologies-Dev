const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Read the logo image
const logoPath = path.join(__dirname, '..', 'public', 'images', 'mail.png');

// Submit enrollment form
router.post('/', async (req, res) => {
  try {
    console.log('Received enrollment submission:', req.body);

    const { name, email, phone, experience, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !experience) {
      return res.status(400).json({ 
        message: 'All required fields must be filled out',
        missingFields: {
          name: !name,
          email: !email,
          phone: !phone,
          experience: !experience
        }
      });
    }

    // Check for duplicate enrollment
    const existingEnrollment = await Enrollment.findOne({ email });
    if (existingEnrollment) {
      return res.status(400).json({ 
        message: 'You have already submitted an enrollment request'
      });
    }

    const enrollment = new Enrollment({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      experience: experience.trim(),
      message: message ? message.trim() : ''
    });

    await enrollment.save();

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
          subject: 'Enrollment Request Received - Monk Technologies',
          html: `
            <h2>Thank you for your interest in our Cloud & DevOps Bootcamp!</h2>
            <p>Dear ${name},</p>
            <p>We have received your enrollment request. Our team will review your application and contact you soon.</p>
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
          subject: 'New Enrollment Request Received',
          html: `
            <h2>New Enrollment Request Received</h2>
            <p>A new enrollment request has been submitted:</p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Experience:</strong> ${experience}</li>
              <li><strong>Message:</strong> ${message || 'Not provided'}</li>
            </ul>
            <p>You can view the full enrollment request in the admin dashboard.</p>
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
      message: 'Enrollment request submitted successfully',
      enrollment
    });
  } catch (error) {
    console.error('Error submitting enrollment:', error);
    
    // Send appropriate error response
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation Error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'You have already submitted an enrollment request'
      });
    }

    res.status(500).json({ 
      message: 'Error submitting enrollment request',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all enrollments (admin only)
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ message: 'Error fetching enrollments' });
  }
});

// Update enrollment status (admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(enrollment);
  } catch (error) {
    console.error('Error updating enrollment status:', error);
    res.status(500).json({ message: 'Error updating enrollment status' });
  }
});

module.exports = router; 