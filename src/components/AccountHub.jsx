import React, { useState } from 'react';
import { SUPPORTED_MODELS } from '../data/mockData';

const AccountHub = ({ 
  wishlist, 
  onRemoveFromWishlist, 
  onAddToCart, 
  walletBalance, 
  onAddWalletFunds,
  addresses,
  onAddAddress,
  onDeleteAddress,
  onSelectProduct,
  pastOrders
}) => {
  const [activeTab, setActiveTab] = useState('wishlist'); // wishlist, wallet, addresses, orders
  
  // Address form states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({ name: '', address: '', city: '', zip: '' });
  
  // Wallet top up state
  const [topUpAmount, setTopUpAmount] = useState('20');
  const [walletHistory, setWalletHistory] = useState([
    { id: 'wh-1', type: 'Welcome Bonus', amount: 10, date: '2026-08-16', status: 'Credit' }
  ]);

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) return;
    
    onAddWalletFunds(amt);
    setWalletHistory([
      {
        id: `wh-${Date.now()}`,
        type: 'Wallet Top-up',
        amount: amt,
        date: new Date().toISOString().split('T')[0],
        status: 'Credit'
      },
      ...walletHistory
    ]);
    setTopUpAmount('20');
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!addressForm.name || !addressForm.address || !addressForm.city || !addressForm.zip) return;
    onAddAddress(addressForm);
    setAddressForm({ name: '', address: '', city: '', zip: '' });
    setShowAddressForm(false);
  };

  return (
    <div className="checkout-page-container">
      <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '30px' }}>My Dashboard</h2>
      
      <div className="checkout-layout">
        {/* Left Side: Navigation Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="checkout-box glass-panel" style={{ padding: '16px' }}>
            <div 
              className={`tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
              style={{ textAlign: 'left', display: 'block', width: '100%', padding: '12px' }}
            >
              ❤️ Wishlist ({wishlist.length})
            </div>
            <div 
              className={`tab-btn ${activeTab === 'wallet' ? 'active' : ''}`}
              onClick={() => setActiveTab('wallet')}
              style={{ textAlign: 'left', display: 'block', width: '100%', padding: '12px' }}
            >
              💳 My Wallet (${walletBalance.toFixed(2)})
            </div>
            <div 
              className={`tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
              style={{ textAlign: 'left', display: 'block', width: '100%', padding: '12px' }}
            >
              📍 Address Book ({addresses.length})
            </div>
            <div 
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
              style={{ textAlign: 'left', display: 'block', width: '100%', padding: '12px' }}
            >
              📦 Order History ({pastOrders.length})
            </div>
          </div>
        </div>

        {/* Right Side: Tab View */}
        <div className="checkout-box glass-panel" style={{ minHeight: '400px' }}>
          
          {/* TAB: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>My Wishlist</h3>
              {wishlist.length === 0 ? (
                <div className="cart-empty-message" style={{ marginTop: '30px' }}>
                  <span style={{ fontSize: '48px' }}>❤️</span>
                  <p>Your wishlist is empty. Browse cases to add items you love!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {wishlist.map(item => (
                    <div 
                      key={item.id} 
                      className="glass-panel" 
                      style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}
                    >
                      <div className="cart-item-preview">
                        <div className="phone-mockup" style={{ width: '48px', height: '76px', borderRadius: '10px', borderWidth: '2px' }}>
                          <div className="camera-island" style={{ width: '14px', height: '14px', borderRadius: '3px', top: '4px', left: '4px', gap: '1px' }}>
                            <div className="lens" style={{ width: '3px', height: '3px' }}></div>
                          </div>
                          <div 
                            className="case-body" 
                            style={{ background: item.gradient || 'var(--bg-card)' }}
                          >
                            {item.hasPattern && <div className={`case-pattern pattern-${item.patternType}`} style={{ opacity: 0.1 }} />}
                          </div>
                        </div>
                      </div>

                      <div style={{ flexGrow: 1 }}>
                        <h4 
                          style={{ cursor: 'pointer', hover: { color: 'var(--primary)' } }}
                          onClick={() => onSelectProduct(item.id)}
                        >
                          {item.name}
                        </h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
                          {item.tagline}
                        </p>
                        <p style={{ color: 'var(--secondary)', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>
                          ${item.basePrice}
                        </p>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button 
                          className="neon-btn" 
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                          onClick={() => {
                            onAddToCart({
                              id: item.id,
                              name: item.name,
                              gradient: item.gradient,
                              hasPattern: item.hasPattern,
                              patternType: item.patternType,
                              price: item.basePrice,
                              modelId: SUPPORTED_MODELS[0].id,
                              modelName: SUPPORTED_MODELS[0].name,
                              materialId: 'silicone',
                              materialName: 'Liquid Silicone',
                              quantity: 1
                            });
                          }}
                        >
                          Add to Cart
                        </button>
                        <button 
                          className="secondary-btn" 
                          style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--accent-rose)' }}
                          onClick={() => onRemoveFromWishlist(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: WALLET */}
          {activeTab === 'wallet' && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>Zapp Wallet</h3>
              
              {/* Card visual */}
              <div 
                className="glass-panel" 
                style={{ 
                  padding: '24px', 
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.3) 100%)',
                  borderColor: 'var(--secondary)',
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: '24px',
                  boxShadow: '0 8px 32px rgba(6,182,212,0.1)'
                }}
              >
                <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>ZappDeal Digital Balance</div>
                <div style={{ fontSize: '36px', fontWeight: '800', margin: '14px 0 28px', color: '#fff' }}>
                  ${walletBalance.toFixed(2)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', opacity: 0.8 }}>
                  <span>Pankaj Yadav</span>
                  <span>★★★★ 5173</span>
                </div>
              </div>

              {/* Top up form */}
              <form onSubmit={handleTopUpSubmit} className="coupon-section" style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <label className="form-label">Top-up Wallet ($)</label>
                  <input 
                    type="number" 
                    placeholder="Enter amount" 
                    className="form-input" 
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    min="5"
                    max="500"
                    required
                  />
                </div>
                <button type="submit" className="neon-btn" style={{ height: '42px', marginTop: '22px' }}>
                  Add Balance
                </button>
              </form>

              {/* Transaction History */}
              <div>
                <h4 style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Transaction History</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {walletHistory.map(tx => (
                    <div 
                      key={tx.id} 
                      style={{ 
                        padding: '12px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        fontSize: '13px',
                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                      }}
                    >
                      <div>
                        <strong>{tx.type}</strong>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{tx.date}</div>
                      </div>
                      <span style={{ color: tx.status === 'Credit' ? '#10b981' : '#f43f5e', fontWeight: '700' }}>
                        {tx.status === 'Credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ADDRESS BOOK */}
          {activeTab === 'addresses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Address Book</h3>
                <button 
                  className="neon-btn" 
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  {showAddressForm ? 'Cancel' : '+ Add Address'}
                </button>
              </div>

              {showAddressForm && (
                <form onSubmit={handleAddressSubmit} className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Doe"
                    className="form-input"
                    value={addressForm.name}
                    onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                    required
                  />

                  <label className="form-label">Address Line</label>
                  <input 
                    type="text" 
                    placeholder="123 Evershine Rd"
                    className="form-input"
                    value={addressForm.address}
                    onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                    required
                  />

                  <div className="form-group-row">
                    <div>
                      <label className="form-label">City</label>
                      <input 
                        type="text" 
                        placeholder="Mumbai"
                        className="form-input"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">ZIP Code</label>
                      <input 
                        type="text" 
                        placeholder="400064"
                        className="form-input"
                        value={addressForm.zip}
                        onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="neon-btn" style={{ width: '100%' }}>Save Address</button>
                </form>
              )}

              {addresses.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginTop: '30px' }}>
                  No saved delivery addresses found. Add one above!
                </p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id} 
                      className="glass-panel" 
                      style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    >
                      <div>
                        <strong style={{ fontSize: '15px' }}>{addr.name}</strong>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px', lineHeight: '1.5' }}>
                          {addr.address}<br />
                          {addr.city}, {addr.zip}
                        </p>
                      </div>
                      <button 
                        className="secondary-btn" 
                        style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--accent-rose)', alignSelf: 'flex-start', marginTop: '16px' }}
                        onClick={() => onDeleteAddress(addr.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: ORDERS */}
          {activeTab === 'orders' && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>Order History</h3>
              {pastOrders.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginTop: '30px' }}>
                  You have not placed any orders yet.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {pastOrders.map(order => (
                    <div key={order.id} className="glass-panel" style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', marginBottom: '12px' }}>
                        <div>
                          <strong style={{ color: 'var(--primary)' }}>{order.id}</strong>
                          <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginLeft: '12px' }}>{order.date}</span>
                        </div>
                        <span style={{ 
                          fontSize: '11px', 
                          fontWeight: '700', 
                          padding: '3px 8px', 
                          borderRadius: '12px', 
                          background: order.status === 'Processing' ? 'rgba(6,182,212,0.1)' : 'rgba(16,185,129,0.1)',
                          color: order.status === 'Processing' ? 'var(--secondary)' : '#10b981'
                        }}>
                          {order.status}
                        </span>
                      </div>

                      {/* Items list */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                        {order.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                            <span>{item.quantity}x {item.name} ({item.modelName})</span>
                            <span style={{ color: 'var(--text-muted)' }}>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', fontSize: '13px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Payment: {order.paymentMethod.toUpperCase()}</span>
                        <strong>Total: ${order.totals.total.toFixed(2)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AccountHub;
