# Monk Technologies

A full-stack web application for Monk Technologies, featuring job applications, contact forms, and course enrollment functionality.

## Features

- Job Application System
- Contact Form
- Course Enrollment
- Admin Dashboard
- Email Notifications
- File Upload Support
- Responsive Design

## Tech Stack

### Frontend
- React.js
- SCSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Nodemailer
- Multer

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/Monk-Technologies-Dev.git
cd Monk-Technologies-Dev
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:
```bash
# In backend directory
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development servers:
```bash
# Start backend server (from backend directory)
npm start

# Start frontend server (from frontend directory)
npm start
```

## Deployment

For deployment instructions, please refer to [DEPLOYMENT.md](DEPLOYMENT.md)

## Project Structure

```
Monk-Technologies-Dev/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
├── .gitignore
├── DEPLOYMENT.md
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@monktechnologies.com or create an issue in the repository. 