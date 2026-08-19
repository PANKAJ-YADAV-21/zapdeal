import React from 'react';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onCheckout }) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingThreshold = 50;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingProgress = Math.min((subtotal / shippingThreshold) * 100, 100);
  const remainingForFreeShipping = shippingThreshold - subtotal;

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-drawer">
        <div className="cart-header">
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Your Cart ({cartItems.length})</h2>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="cart-items-container">
          {cartItems.length > 0 && (
            <div className="shipping-progress-box">
              {isFreeShipping ? (
                <span>🎉 You qualify for <strong>FREE Shipping!</strong></span>
              ) : (
                <span>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for FREE Shipping.</span>
              )}
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${shippingProgress}%` }}></div>
              </div>
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="cart-empty-message">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3 }}>
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <p>Your cart is empty.</p>
              <button className="neon-btn" onClick={onClose} style={{ padding: '10px 20px', fontSize: '14px' }}>
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.cartId}>
                <div className="cart-item-preview">
                  {/* Small preview of the cover case */}
                  <div className="phone-mockup" style={{ width: '50px', height: '80px', borderRadius: '10px', borderWidth: '2px' }}>
                    <div className="camera-island" style={{ width: '16px', height: '16px', borderRadius: '4px', top: '4px', left: '4px', gap: '2px' }}>
                      <div className="lens" style={{ width: '4px', height: '4px', borderWidth: '1px' }}></div>
                    </div>
                    <div 
                      className="case-body" 
                      style={{ 
                        background: item.gradient || item.customDetails?.bgColor || 'var(--bg-card)'
                      }}
                    >
                      {item.hasPattern && <div className={`case-pattern pattern-${item.patternType}`} style={{ opacity: 0.1 }} />}
                    </div>
                  </div>
                </div>

                <div className="cart-item-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="cart-item-name">{item.name}</span>
                    <button 
                      onClick={() => onRemoveItem(item.cartId)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      aria-label="Remove item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                  <span className="cart-item-meta">{item.modelName} ({item.materialName})</span>
                  
                  <div className="cart-item-actions" style={{ marginTop: 'auto' }}>
                    <div className="quantity-controller">
                      <button className="qty-btn" onClick={() => onUpdateQty(item.cartId, item.quantity - 1)}>-</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.cartId, item.quantity + 1)}>+</button>
                    </div>
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-totals">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span style={{ fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                <span>{isFreeShipping ? 'FREE' : '$4.99'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', marginTop: '8px' }}>
                <span>Estimated Total</span>
                <span style={{ color: 'var(--secondary)' }}>
                  ${(subtotal + (isFreeShipping ? 0 : 4.99)).toFixed(2)}
                </span>
              </div>
            </div>
            <button className="neon-btn" style={{ width: '100%', padding: '16px' }} onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
