import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="container text-center my-5">
    
      <div className="card mx-auto user-card p-4">
        <div className="card-body">
          <h2 className="card-title">Muhammad Abdullah</h2>
          <p className="card-text">
            A Web Developer with a focus on front-end development and UX/UI design.
          </p>

          <hr />

          <div className="user-details">
            <h3>Skills</h3>
            <ul className="list-unstyled">
              <li><strong>Languages:</strong> JavaScript, Python, HTML, CSS</li>
              <li><strong>Frameworks:</strong> React, Angular, Django</li>
            </ul>
          </div>

          <hr />

          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Email: <a href="mailto:abdullah72@gmail.com">abdullah72@gmail.com</a></p>
            <p>Phone: +92 316-5450012</p>
          </div>

          <hr />

          <div className="social-media">
            <h3>Follow Me</h3>
            {/* Provide valid social media links or replace '#' with real URLs */}
            <a href="https://twitter.com/your-profile" className="btn btn-primary me-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://linkedin.com/in/your-profile" className="btn btn-info me-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="https://github.com/your-profile" className="btn btn-dark" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
