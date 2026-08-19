import React from 'react';

const Footer = ({ onViewChange }) => {
  return (
    <footer className="footer desktop-footer">
      {/* 1. Footer Trust Badges */}
      <div 
        className="footer-trust" 
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '24px 5%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--text-main)'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          100% Secure Payment
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <rect width="16" height="12" x="2" y="6" rx="2" />
            <path d="M16 8h4l3 3v7a2 2 0 0 1-2 2h-1M6 18H4a2 2 0 0 1-2-2v-1" />
            <circle cx="9" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
          </svg>
          Free Shipping
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          7 Days Returns
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Premium Quality
        </span>
      </div>

      {/* 2. Main Columns */}
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="logo" onClick={() => onViewChange('shop')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
            Zapp<span style={{ color: 'var(--primary)' }}>Deal</span>
          </div>
          <p style={{ marginTop: '16px', lineHeight: '1.6' }}>
            Your one-stop destination for premium iPhone covers. Stylish, durable protection designed exclusively for iPhones.
          </p>
          
          {/* Social Links Row */}
          <div style={{ display: 'flex', gap: '14px', marginTop: '20px' }}>
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/zappdeal_india/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: 'var(--text-muted)', transition: 'var(--transition-smooth)' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4.06 4.06 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/zappdeal.india" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{ color: 'var(--text-muted)', transition: 'var(--transition-smooth)' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Customer Service */}
        <div className="footer-col">
          <h4>Customer Service</h4>
          <div className="footer-links">
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('orders')}>My Orders</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('orders')}>Track Order</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('policies')}>Returns & Refunds</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('policies')}>Shipping Policy</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('policies')}>Warranty Policy</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('policies')}>FAQs</span>
          </div>
        </div>

        {/* My Account */}
        <div className="footer-col">
          <h4>My Account</h4>
          <div className="footer-links">
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('account')}>My Account</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('account')}>Wishlist</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('account')}>Recently Viewed</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('account')}>Addresses</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('account')}>Wallet</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('shop')}>Logout</span>
          </div>
        </div>

        {/* Help & Support */}
        <div className="footer-col">
          <h4>Help & Support</h4>
          <div className="footer-links">
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('policies')}>Help Center</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('policies')}>Contact Us</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('policies')}>Terms & Conditions</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('policies')}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('policies')}>About Us</span>
            <span style={{ cursor: 'pointer' }} className="footer-link" onClick={() => onViewChange('policies')}>Bulk Orders</span>
          </div>
        </div>

        {/* Get In Touch */}
        <div className="footer-col" style={{ gridColumn: 'span 1' }}>
          <h4>Get In Touch</h4>
          <div className="footer-links" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            <p style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span>✉</span>
              <a href="mailto:support@zappdeal.com" style={{ color: 'inherit', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'inherit'}>
                support@zappdeal.com<br />
                <small style={{ opacity: 0.8 }}>We reply within 24 hours</small>
              </a>
            </p>
            <p style={{ display: 'flex', gap: '8px' }}>
              <span>📍</span>
              <span>209 2nd floor Evershine Mall, Malad, Chincholi Bunder, Malad West, Mumbai, Maharashtra 400064</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div 
        className="footer-bottom"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '24px',
          marginTop: '40px',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px'
        }}
      >
        <span>© 2026 ZappDeal. All Rights Reserved.</span>
        
        {/* Payment Icons */}
        <span style={{ letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
          Visa &nbsp;&bull;&nbsp; Mastercard &nbsp;&bull;&nbsp; UPI &nbsp;&bull;&nbsp; Paytm &nbsp;&bull;&nbsp; GPay
        </span>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span>Managed by <a href="https://tcongsinfotech.com/index.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Tcongs Infotech</a></span>
          <span style={{ color: 'var(--text-muted)' }}>India (IN)</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
