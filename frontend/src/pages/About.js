import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
import JobApplicationForm from '../components/JobApplicationForm';
import '../styles/about.scss';

const About = () => {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');

  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash === '#careers') {
      // Wait for the component to render
      setTimeout(() => {
        const careersSection = document.getElementById('careers');
        if (careersSection) {
          careersSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const handleApplyClick = (position) => {
    setSelectedPosition(position);
    setIsApplicationFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsApplicationFormOpen(false);
    setSelectedPosition('');
  };

  const teamMembers = [
    {
      name: "Aaron Beyer",
      position: "Senior Data Architect",
      image: "/images/team-1.jpg"
    },
    {
      name: "Alex Dupuy",
      position: "Lead Cloud Engineer",
      image: "/images/team-2.jpg"
    },
    {
      name: "Andriy Duyko",
      position: "Engineering Manager",
      image: "/images/team-3.jpg"
    },
  ];

  const openPositions = [
    {
      title: "Cloud Analyst",
      location: "Remote"
    },
    // {
    //   title: "Software Developer",
    //   location: "Remote"
    // },
    {
      title: "Cloud Engineers",
      location: "Remote"
    },
    {
      title: "Data Engineers",
      location: "Remote"
    }
  ];

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="about_page">
        <div className="about_hero">
          <div className="container">
            <h1>About Us</h1>
            <p>Empowering businesses through innovative cloud solutions and DevOps practices</p>
          </div>
        </div>

        <section className="about_section">
          <div className="container">
            <div className="about_content">
              <div className="about_text">
                <h2>Our Story</h2>
                <p className="fade-in">Monk Technologies is a leading cloud service provider and DevOps solutions company. We specialize in helping businesses transform their digital infrastructure through innovative cloud solutions and expert DevOps practices.</p>
                <p className="fade-in">With a team of certified cloud architects and DevOps engineers, we deliver cutting-edge solutions that drive efficiency, scalability, to enabling us to provide comprehensive solutions tailored to your specific needs.</p>
                <div className="stats_container">
                  <div className="stat_item fade-in">
                    <span className="number">10+</span>
                    <span className="label">Years Experience</span>
                  </div>
                  <div className="stat_item fade-in">
                    <span className="number">500+</span>
                    <span className="label">Projects Completed</span>
                  </div>
                  <div className="stat_item fade-in">
                    <span className="number">50+</span>
                    <span className="label">Team Members</span>
                  </div>
                </div>
              </div>
              <div className="about_image fade-in">
                <img src="/images/about-img.jpg" alt="About Us" />
              </div>
            </div>
          </div>
        </section>

        <section className="team_section">
          <div className="container">
            <h2 className="section_title">Meet the Team</h2>
            <p className="section_subtitle">We are a vibrant team of engineering-driven and people-focused professionals, priding ourselves on being approachable experts and innovative problem solvers. We're also known for being kind, interesting, and genuinely fun to work with, making every project not just a success, but a truly enjoyable journey.</p>
            <div className="team_grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team_member">
                  <div className="member_image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="member_info">
                    <h3>{member.name}</h3>
                    <p>{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="careers_section" id="careers">
          <div className="container">
            <div className="careers_content">
              <h2>Are you eager to join our team?</h2>
              <p>Check out the open positions!</p>
              <div className="positions_grid">
                {openPositions.map((position, index) => (
                  <div key={index} className="position_card">
                    <h3>{position.title}</h3>
                    <p><i className="fas fa-map-marker-alt"></i> {position.location}</p>
                    <button 
                      className="apply_button"
                      onClick={() => handleApplyClick(position.title)}
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <JobApplicationForm
        position={selectedPosition}
        isOpen={isApplicationFormOpen}
        onClose={handleCloseForm}
      />
    </>
  );
};

export default About; 