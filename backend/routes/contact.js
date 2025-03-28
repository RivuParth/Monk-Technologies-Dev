const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Read the logo image
const logoPath = path.join(__dirname, '..', 'public', 'images', 'mail.png');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);

    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'All fields are required',
        missingFields: {
          name: !name,
          email: !email,
          subject: !subject,
          message: !message
        }
      });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();

    // Send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports like 587
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Send to admin
      const adminMailOptions = {
        from: `"Monk Technologies" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <img src="cid:logo" alt="Monk Technologies Logo" style="max-width: 200px; margin-top: 20px;">
        `,
        attachments: [{
          filename: 'mail.png',
          path: logoPath,
          cid: 'logo'
        }]
      };

      // Send auto-reply to sender
      const senderMailOptions = {
        from: `"Monk Technologies" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for contacting Monk Technologies',
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you soon.</p>
          <p>Best regards,<br>Monk Technologies Team</p>
          <img src="cid:logo" alt="Monk Technologies Logo" style="max-width: 200px; margin-top: 20px;">
        `,
        attachments: [{
          filename: 'mail.png',
          path: logoPath,
          cid: 'logo'
        }]
      };

      try {
        // Send both emails
        await Promise.all([
          transporter.sendMail(adminMailOptions),
          transporter.sendMail(senderMailOptions)
        ]);
        console.log('Emails sent successfully');
      } catch (emailError) {
        console.error('Failed to send emails:', emailError);
        // Don't throw the error, just log it
      }
    }

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact form:', error);
    res.status(500).json({ 
      message: 'Error sending message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all messages (admin only)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Update message status (admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error updating message status' });
  }
});

module.exports = router; 