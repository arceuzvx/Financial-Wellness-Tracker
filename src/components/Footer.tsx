import React from 'react';
import { GitHub, Code, Heart } from 'react-feather';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a 
            href="https://github.com/arceuzvx/Financial-Wellness-Tracker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            <GitHub size={18} /> GitHub Repository
          </a>
          <a 
            href="https://github.com/arceuzvx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            <Code size={18} /> Developer
          </a>
        </div>
        <div className="footer-credit">
          <p>Made with <Heart size={14} style={{ verticalAlign: 'middle', color: 'var(--danger-color)' }} /> by arceuzvx © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}; 