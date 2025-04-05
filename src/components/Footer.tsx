import React from 'react';

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
            <span className="footer-icon">📦</span> GitHub Repository
          </a>
          <a 
            href="https://github.com/arceuzvx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            <span className="footer-icon">👨‍💻</span> Developer
          </a>
        </div>
        <div className="footer-credit">
          <p>Made with <span style={{ color: 'var(--danger-color)' }}>❤️</span> by arceuzvx © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}; 