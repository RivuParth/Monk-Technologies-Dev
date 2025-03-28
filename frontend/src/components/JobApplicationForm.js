import React, { useState, useEffect } from 'react';
import { submitJobApplication } from '../services/api';
import '../styles/jobApplication.scss';

const JobApplicationForm = ({ position, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    position: position || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Update formData when position prop changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      position: position || ''
    }));
  }, [position]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      
      // Log form data before submission
      console.log('Form data before submission:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        coverLetter: formData.coverLetter,
        resume: formData.resume?.name
      });

      // Add all form fields except resume
      Object.keys(formData).forEach(key => {
        if (key !== 'resume') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add resume if it exists
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      // Log FormData contents
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await submitJobApplication(formDataToSend);
      
      if (response) {
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          position: '',
          coverLetter: '',
          resume: null
        });
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="job-application-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h2>Apply for {position}</h2>
        {success ? (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            <h3>Application Submitted Successfully!</h3>
            <p>Thank you for applying. We will review your application and get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
              <label htmlFor="resume">Resume/CV *</label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="coverLetter">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="5"
              />
            </div>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobApplicationForm; 