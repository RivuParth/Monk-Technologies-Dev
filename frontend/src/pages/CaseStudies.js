import React, { useState } from 'react';
import Header from '../components/Header';
import EnrollmentForm from '../components/EnrollmentForm';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/case-studies.scss';

const CaseStudies = () => {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  return (
    <>
     <ScrollToTop />
      <Header />
      <div className="case_studies_page">
        <div className="case_studies_hero">
          <div className="container">
            <h1>Case Studies</h1>
            <p>Explore our successful training programs and student achievements</p>
          </div>
        </div>

        <section className="course_details">
          <div className="container">
            <div className="course_header">
              <h2>Cloud & DevOps Interview Prep Bootcamp 2.0</h2>
              <div className="course_meta">
                <span className="duration"><i className="fas fa-clock"></i> 45 Days</span>
                <span className="start_date"><i className="fas fa-calendar"></i> July 15th, 2024</span>
                <span className="end_date"><i className="fas fa-calendar-check"></i> August 30th, 2024</span>
              </div>
            </div>

            <div className="course_features">
              <div className="feature_card">
                <i className="fas fa-question-circle"></i>
                <h3>450+ Interview Questions</h3>
                <p>Comprehensive question bank with detailed explanations</p>
              </div>
              <div className="feature_card">
                <i className="fas fa-file-alt"></i>
                <h3>Resume Building</h3>
                <p>Professional resume crafted by our experts</p>
              </div>
              <div className="feature_card">
                <i className="fab fa-linkedin"></i>
                <h3>LinkedIn Makeover</h3>
                <p>Enhanced online presence for better opportunities</p>
              </div>
              <div className="feature_card">
                <i className="fas fa-users"></i>
                <h3>Mock Interviews</h3>
                <p>Practice with industry experts</p>
              </div>
            </div>

            <div className="course_schedule">
              <h3>Course Schedule</h3>
              <ul>
                <li><i className="fas fa-clock"></i> 7 PM EST - 10 PM EST</li>
                <li><i className="fas fa-hourglass-half"></i> 3 hours per day</li>
                <li><i className="fas fa-calendar-alt"></i> Monday, Wednesday & Saturday (Mock Interviews)</li>
              </ul>
            </div>

            <div className="course_topics">
              <h3>Topics Covered</h3>
              <div className="topics_grid">
                <div className="topic_item">Linux</div>
                <div className="topic_item">Git</div>
                <div className="topic_item">Cloud Computing</div>
                <div className="topic_item">AWS</div>
                <div className="topic_item">DevSecOps</div>
                <div className="topic_item">Terraform</div>
                <div className="topic_item">Ansible</div>
                <div className="topic_item">Vaults</div>
                <div className="topic_item">Nexus Artifactory</div>
                <div className="topic_item">Docker</div>
                <div className="topic_item">Security & Networking</div>
                <div className="topic_item">Cloud Migration & Disaster Recovery</div>
                <div className="topic_item">Kubernetes & Helm</div>
                <div className="topic_item">Monitoring (Prometheus) & Alerting (Grafana)</div>
                <div className="topic_item">Python</div>
                <div className="topic_item">Agile & SCRUM</div>
                <div className="topic_item">Behavioural based questions</div>
                <div className="topic_item">STAR approach</div>
                <div className="topic_item">System Design</div>
                <div className="topic_item">Scenario based questions</div>
              </div>
            </div>

            <div className="career_opportunities">
              <h3>Career Opportunities</h3>
              <div className="careers_grid">
                <div className="career_item">Cloud Engineer</div>
                <div className="career_item">DevOps Engineer</div>
                <div className="career_item">AWS Solutions Architect</div>
                <div className="career_item">AWS Systems Administrator</div>
                <div className="career_item">Cloud Support Engineer</div>
                <div className="career_item">Cloud Security Engineer</div>
                <div className="career_item">Infrastructure Automation Engineer</div>
                <div className="career_item">DevSecOps Engineer</div>
                <div className="career_item">Site Reliability Engineer</div>
              
                <div className="career_item">Systems Engineer</div>
                
              </div>
            </div>

            <div className="cta_section">
              <h3>Ready to Start Your Journey?</h3>
              <p>Join our comprehensive bootcamp and prepare yourself for a successful career in Cloud & DevOps</p>
              <button 
                className="btn btn-primary"
                onClick={() => setIsEnrollmentOpen(true)}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </section>
      </div>

      <EnrollmentForm 
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
      />
    </>
  );
};

export default CaseStudies; 