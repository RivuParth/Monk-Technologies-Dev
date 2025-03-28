import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
import { submitContactForm } from '../services/api';
import '../styles/contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Scroll to form section if hash is present in URL
    if (window.location.hash === '#contact-form') {
      const formSection = document.getElementById('contact-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await submitContactForm(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="contact_page">
        <div className="contact_hero">
          <div className="container">
            <h1>Contact Us</h1>
            <p>Get in touch with us for any questions or inquiries</p>
          </div>
        </div>

        <section className="contact_section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="contact_info">
                  <h3>Get in Touch</h3>
                  <div className="info_items">
                    <div className="info_item">
                      <i className="fas fa-map-marker-alt"></i>
                      <div className="info_content">
                        <h4>Address</h4>
                        <p>123 Tech Street, Digital City<br />Innovation Hub, 12345</p>
                      </div>
                    </div>
                    <div className="info_item">
                      <i className="fas fa-phone"></i>
                      <div className="info_content">
                        <h4>Phone</h4>
                        <p>+1 234 567 890<br />+1 234 567 891</p>
                      </div>
                    </div>
                    <div className="info_item">
                      <i className="fas fa-envelope"></i>
                      <div className="info_content">
                        <h4>Email</h4>
                        <p>info@monktech.com<br />support@monktech.com</p>
                      </div>
                    </div>
                    <div className="info_item">
                      <i className="fas fa-clock"></i>
                      <div className="info_content">
                        <h4>Working Hours</h4>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="contact_form" id="contact-form">
                  <h3>Send us a Message</h3>
                  {success ? (
                    <div className="success-message">
                      <i className="fas fa-check-circle"></i>
                      <h4>Message Sent Successfully!</h4>
                      <p>Thank you for contacting us. We will get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {error && <div className="error-message">{error}</div>}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form_group">
                            <label htmlFor="name">Full Name</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form_group">
                            <label htmlFor="email">Email Address</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form_group">
                        <label htmlFor="subject">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="message">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="5"
                          required
                        ></textarea>
                      </div>
                      <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="map_section">
          <div className="container">
            <div className="map_container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986532934473!3d40.69714941945631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact; 