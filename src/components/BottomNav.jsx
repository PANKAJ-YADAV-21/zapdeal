import React from 'react';

const BottomNav = ({ currentView, onViewChange }) => {
  const navItems = [
    {
      id: 'shop',
      label: 'Home',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'search',
      label: 'Search',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      )
    },
    {
      id: 'referral',
      label: 'Earn ₹',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="3" y="8" width="18" height="12" rx="2" ry="2" />
          <line x1="12" y1="12" x2="12" y2="16" />
          <line x1="8" y1="14" x2="16" y2="14" />
          <path d="M12 8V3M8 6c0-1.66 1.79-3 4-3s4 1.34 4 3c0 1.66-1.79 3-4 3" />
        </svg>
      )
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      )
    },
    {
      id: 'account',
      label: 'Account',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button 
          key={item.id}
          className={`nav-btn ${currentView === item.id || (item.id === 'shop' && currentView === 'detail') ? 'is-active' : ''}`}
          onClick={() => onViewChange(item.id)}
          aria-label={item.label}
        >
          {item.icon}
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
