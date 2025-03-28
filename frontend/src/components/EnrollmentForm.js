import React, { useState } from 'react';
import { submitEnrollment } from '../services/api';
import '../styles/enrollment-form.scss';

const EnrollmentForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      await submitEnrollment(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        message: ''
      });
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to submit enrollment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="enrollment_popup">
      <div className="enrollment_overlay" onClick={onClose}></div>
      <div className="enrollment_content">
        <button className="close_button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h2>Enroll in Cloud & DevOps Bootcamp</h2>
        <p>Fill out the form below and we'll get back to you shortly.</p>
        
        {success ? (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            <h3>Enrollment Submitted Successfully!</h3>
            <p>Thank you for your interest. We will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form_group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form_group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form_group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form_group">
              <label htmlFor="experience">Years of Experience *</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Select Experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            <div className="form_group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnrollmentForm; 