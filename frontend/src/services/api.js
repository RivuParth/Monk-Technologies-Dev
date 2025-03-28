const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const submitJobApplication = async (formData) => {
  try {
    console.log('Submitting application with data:', {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      position: formData.get('position'),
      resume: formData.get('resume')?.name,
      coverLetter: formData.get('coverLetter')
    });

    const response = await fetch(`${API_URL}/job-applications`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit application');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const submitContactForm = async (formData) => {
  try {
    console.log('Submitting contact form with data:', formData);

    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send message');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const submitEnrollment = async (formData) => {
  try {
    console.log('Submitting enrollment with data:', formData);

    const response = await fetch(`${API_URL}/enrollment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit enrollment');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}; 