import React, { useState } from 'react';

const Footer = ({ onViewChange }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
            Zapp<span>Deal</span>
          </div>
          <p>Premium, high-performance covers & cases designed to elevate your device aesthetics and protection.</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <div className="footer-links">
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('shop')}>Shop Catalog</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('customize')}>Custom Designer</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('orders')}>Order Tracking</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <div className="footer-links">
            <a href="#" className="footer-link">Help Center</a>
            <a href="#" className="footer-link">Shipping Policy</a>
            <a href="#" className="footer-link">Returns & Refund</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Newsletter</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>
            Subscribe to receive launch details, limited discounts, and updates.
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="neon-btn" style={{ padding: '10px 16px', fontSize: '13px' }}>
              {subscribed ? 'Joined!' : 'Join'}
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ZappDeal. All rights reserved.</p>
        <p style={{ display: 'flex', gap: '16px' }}>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
