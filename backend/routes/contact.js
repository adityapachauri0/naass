const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Lead = require('../models/Lead');
const nodemailer = require('nodemailer');
const getClientIp = require('../utils/getClientIp');
const axios = require('axios');

// Validation middleware
const validateContact = [
  body('name').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone').optional().trim().escape(),
  body('company').optional().trim().escape(),
  body('service').notEmpty().trim().escape(),
  body('message').optional().trim().escape()
];

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// POST /api/contact - Submit contact form
router.post('/', validateContact, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, phone, company, service, message } = req.body;

    // Get client IP with enhanced detection
    let ipAddress = getClientIp(req);
    const userAgent = req.headers['user-agent'];
    
    // If localhost, try to get public IP for testing
    if (ipAddress === '::1' || ipAddress === '127.0.0.1' || ipAddress === '::ffff:127.0.0.1') {
      try {
        const response = await axios.get('https://api.ipify.org?format=json', { timeout: 2000 });
        ipAddress = response.data.ip || ipAddress;
      } catch (error) {
        console.log('Could not fetch public IP, using local:', ipAddress);
      }
    }
    
    // Get location data from IP
    let location = null;
    if (ipAddress && ipAddress !== 'unknown' && !ipAddress.includes('127.0.0.1') && !ipAddress.includes('::1')) {
      try {
        const geoResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`, { timeout: 2000 });
        if (geoResponse.data.status === 'success') {
          location = {
            city: geoResponse.data.city,
            region: geoResponse.data.regionName,
            country: geoResponse.data.country,
            lat: geoResponse.data.lat,
            lng: geoResponse.data.lon
          };
        }
      } catch (error) {
        console.log('Could not fetch location data');
      }
    }

    // Create new lead with enhanced tracking
    const newLead = new Lead({
      name,
      email,
      phone,
      company,
      service,
      message,
      ipAddress,
      userAgent,
      location
    });

    // Save to database
    await newLead.save();

    // Send notification email (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        
        // Email to admin
        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `New Lead from NAASS Website - ${name}`,
          html: `
            <h2>New Lead Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong> ${message || 'No message'}</p>
            <hr>
            <p><small>IP: ${ipAddress}</small></p>
          `
        };

        // Email to customer
        const customerMailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Thank you for contacting NAASS',
          html: `
            <h2>Thank you for your interest, ${name}!</h2>
            <p>We've received your inquiry about <strong>${service}</strong>.</p>
            <p>Our team will get back to you within 24 hours.</p>
            <br>
            <p>Best regards,</p>
            <p><strong>NAASS Team</strong></p>
            <p>Creating monumental customer growth through quality leads</p>
          `
        };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(customerMailOptions);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      leadId: newLead._id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

module.exports = router;