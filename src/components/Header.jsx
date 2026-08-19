import React from 'react';

const Header = ({ currentView, onViewChange, cartCount, onCartToggle, wishlistCount }) => {
  return (
    <header className="header">
      <div className="logo" onClick={() => onViewChange('shop')} style={{ cursor: 'pointer' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
        Zapp<span>Deal</span>
      </div>

      <nav className="nav-links">
        <span 
          className={`nav-link ${currentView === 'shop' || currentView === 'detail' ? 'active' : ''}`}
          onClick={() => onViewChange('shop')}
        >
          Shop Cases
        </span>
        <span 
          className={`nav-link ${currentView === 'customize' ? 'active' : ''}`}
          onClick={() => onViewChange('customize')}
        >
          Design Lab
        </span>
        <span 
          className={`nav-link ${currentView === 'policies' ? 'active' : ''}`}
          onClick={() => onViewChange('policies')}
        >
          Info Desk
        </span>
        <span 
          className={`nav-link ${currentView === 'account' ? 'active' : ''}`}
          onClick={() => onViewChange('account')}
        >
          Dashboard
        </span>
      </nav>

      <div className="header-actions">
        {/* Wishlist Quick Access */}
        <button 
          className="cart-icon-btn" 
          onClick={() => onViewChange('account')} 
          aria-label="Open wishlist"
          style={{ marginRight: '4px' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          {wishlistCount > 0 && <span className="cart-badge" style={{ background: 'var(--primary)', boxShadow: '0 0 8px var(--primary-glow)' }}>{wishlistCount}</span>}
        </button>

        {/* Shopping Cart Trigger */}
        <button className="cart-icon-btn" onClick={onCartToggle} aria-label="Open shopping cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        
        <button 
          className="neon-btn" 
          onClick={() => onViewChange('customize')}
          style={{ padding: '8px 16px', fontSize: '14px' }}
        >
          Customize
        </button>
      </div>
    </header>
  );
};

export default Header;
