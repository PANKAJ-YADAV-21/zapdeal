import React from 'react';

const Header = ({ 
  currentView, 
  onViewChange, 
  cartCount, 
  wishlistCount, 
  onCartToggle, 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <header className="header desktop-header">
      {/* Brand logo */}
      <div 
        className="logo" 
        onClick={() => onViewChange('shop')} 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
        Zapp<span style={{ color: 'var(--primary)' }}>Deal</span>
      </div>

      {/* Desktop navigation */}
      <nav className="desktop-nav" aria-label="Desktop navigation">
        <span 
          className={`nav-link ${currentView === 'shop' || currentView === 'detail' ? 'active' : ''}`}
          onClick={() => onViewChange('shop')}
        >
          Home
        </span>
        <span 
          className={`nav-link ${currentView === 'customize' ? 'active' : ''}`}
          onClick={() => onViewChange('customize')}
        >
          Shop
        </span>
        <span 
          className={`nav-link ${currentView === 'orders' || currentView === 'success' ? 'active' : ''}`}
          onClick={() => onViewChange('orders')}
        >
          Orders
        </span>
        <span 
          className={`nav-link ${currentView === 'policies' ? 'active' : ''}`}
          onClick={() => onViewChange('policies')}
        >
          Support
        </span>
      </nav>

      {/* Search Input */}
      <div className="desktop-search" style={{ position: 'relative' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="search" 
          placeholder="Search gadgets, models..." 
          aria-label="Search products"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            if (currentView !== 'shop') {
              onViewChange('shop');
            }
          }}
          style={{
            padding: '10px 14px 10px 38px',
            width: '240px',
            background: 'var(--bg-input)',
            border: '1px solid var(--glass-border)',
            borderRadius: '20px',
            color: 'var(--text-main)',
            fontSize: '13px',
            outline: 'none',
            transition: 'var(--transition-smooth)'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
        />
      </div>

      {/* Desktop Quick Actions */}
      <div className="desktop-actions">
        {/* Wishlist Quick Access */}
        <button 
          className="cart-icon-btn" 
          onClick={() => onViewChange('account')} 
          aria-label="Open wishlist"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          {wishlistCount > 0 && <span className="cart-badge" style={{ background: 'var(--primary)' }}>{wishlistCount}</span>}
        </button>

        {/* User Account Account Dashboard */}
        <button 
          className="cart-icon-btn" 
          onClick={() => onViewChange('account')} 
          aria-label="Account Dashboard"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>

        {/* Shopping Cart Trigger */}
        <button className="cart-icon-btn" onClick={onCartToggle} aria-label="Open shopping cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;
