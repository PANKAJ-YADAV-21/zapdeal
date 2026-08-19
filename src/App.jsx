import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Customizer from './components/Customizer';
import AccountHub from './components/AccountHub';
import Policies from './components/Policies';
import { apiService } from './services/api';
import { SUPPORTED_MODELS, CASE_MATERIALS } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('shop'); // shop, detail, customize, checkout, orders, success, account, policies
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Expanded Feature States
  const [wishlist, setWishlist] = useState([]);
  const [walletBalance, setWalletBalance] = useState(50.00); // Start with some promo balance
  const [addresses, setAddresses] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [showCashfreeModal, setShowCashfreeModal] = useState(false);
  const [cashfreeProcessing, setCashfreeProcessing] = useState(false);
  const [cashfreeUpi, setCashfreeUpi] = useState('');

  // Detail View Configs
  const [detailModelId, setDetailModelId] = useState('');
  const [detailMaterialId, setDetailMaterialId] = useState('');
  const [detailReviews, setDetailReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ userName: '', rating: 5, comment: '' });

  // Checkout Form
  const [checkoutForm, setCheckoutForm] = useState({
    name: '', email: '', address: '', city: '', zip: ''
  });
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderSubmitting, setOrderSubmitting] = useState(false);

  // Orders / Success
  const [activeOrder, setActiveOrder] = useState(null);
  const [trackOrderIdInput, setTrackOrderIdInput] = useState('');
  const [trackError, setTrackError] = useState('');

  // Load state on mount
  useEffect(() => {
    const loadData = async () => {
      const list = await apiService.getProducts();
      setProducts(list);
    };
    loadData();

    // Local Storage syncs
    setCart(JSON.parse(localStorage.getItem('zappdeal_cart') || '[]'));
    setWishlist(JSON.parse(localStorage.getItem('zappdeal_wishlist') || '[]'));
    setAddresses(JSON.parse(localStorage.getItem('zappdeal_addresses') || '[]'));
    setPastOrders(JSON.parse(localStorage.getItem('zappdeal_orders') || '[]'));
    
    const savedWallet = localStorage.getItem('zappdeal_wallet');
    if (savedWallet) {
      setWalletBalance(parseFloat(savedWallet));
    }
  }, []);

  // Sync wrappers
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('zappdeal_cart', JSON.stringify(newCart));
  };

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem('zappdeal_wishlist', JSON.stringify(newWishlist));
  };

  const saveAddresses = (newAddresses) => {
    setAddresses(newAddresses);
    localStorage.setItem('zappdeal_addresses', JSON.stringify(newAddresses));
  };

  const saveWallet = (newBalance) => {
    setWalletBalance(newBalance);
    localStorage.setItem('zappdeal_wallet', newBalance.toString());
  };

  // Load detailed product and reviews
  useEffect(() => {
    if (selectedProductId) {
      const loadDetail = async () => {
        try {
          const product = await apiService.getProduct(selectedProductId);
          setSelectedProduct(product);
          setDetailModelId(SUPPORTED_MODELS[0].id);
          setDetailMaterialId(CASE_MATERIALS[0].id);

          const reviews = await apiService.getReviews(selectedProductId);
          setDetailReviews(reviews);
        } catch (err) {
          console.error(err);
        }
      };
      loadDetail();
    } else {
      setSelectedProduct(null);
    }
  }, [selectedProductId]);

  // Cart operations
  const handleAddToCart = (item) => {
    const existingIndex = cart.findIndex(
      cartItem => 
        cartItem.id === item.id && 
        cartItem.modelId === item.modelId && 
        cartItem.materialId === item.materialId &&
        JSON.stringify(cartItem.customDetails) === JSON.stringify(item.customDetails)
    );

    let newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += item.quantity || 1;
    } else {
      newCart.push({
        ...item,
        cartId: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      });
    }
    saveCart(newCart);
    setCartOpen(true);
  };

  const handleUpdateQty = (cartId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    const newCart = cart.map(item => item.cartId === cartId ? { ...item, quantity } : item);
    saveCart(newCart);
  };

  const handleRemoveItem = (cartId) => {
    const newCart = cart.filter(item => item.cartId !== cartId);
    saveCart(newCart);
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId) => {
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) return;

    const exists = wishlist.some(p => p.id === productId);
    let newWishlist;
    if (exists) {
      newWishlist = wishlist.filter(p => p.id !== productId);
    } else {
      newWishlist = [...wishlist, targetProduct];
    }
    saveWishlist(newWishlist);
  };

  // Address book actions
  const handleAddAddress = (addressData) => {
    const newAddresses = [...addresses, { ...addressData, id: `addr-${Date.now()}` }];
    saveAddresses(newAddresses);
  };

  const handleDeleteAddress = (addrId) => {
    const newAddresses = addresses.filter(a => a.id !== addrId);
    saveAddresses(newAddresses);
  };

  // Wallet actions
  const handleAddWalletFunds = (amount) => {
    saveWallet(walletBalance + amount);
  };

  // Product reviews submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.userName || !reviewForm.comment) return;

    const newReview = await apiService.addReview(selectedProductId, reviewForm);
    setDetailReviews([newReview, ...detailReviews]);
    setReviewForm({ userName: '', rating: 5, comment: '' });
  };

  // Checkout calculation helper
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = cartSubtotal >= 50;
  const shippingCost = isFreeShipping ? 0 : 4.99;
  
  let discountAmount = 0;
  if (appliedDiscount) {
    if (typeof appliedDiscount.value === 'number') {
      discountAmount = cartSubtotal * appliedDiscount.value;
    }
  }

  const finalTotal = Math.max(0, cartSubtotal + shippingCost - discountAmount);

  // Auto-fill address fields if user selects a saved address
  const handleSelectSavedAddress = (addr) => {
    setCheckoutForm({
      name: addr.name,
      email: checkoutForm.email,
      address: addr.address,
      city: addr.city,
      zip: addr.zip
    });
  };

  // Apply Coupon
  const handleApplyCoupon = async () => {
    if (!discountCode) return;
    const result = await apiService.validateDiscount(discountCode);
    if (result.valid) {
      setAppliedDiscount(result);
    } else {
      alert('Invalid coupon code!');
      setAppliedDiscount(null);
    }
  };

  // Checkout order dispatcher
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Check wallet balance
    if (paymentMethod === 'wallet' && walletBalance < finalTotal) {
      alert("Insufficient wallet balance! Please add funds in Dashboard or select another payment option.");
      return;
    }

    if (paymentMethod === 'upi') {
      // Trigger Cashfree simulated modal
      setShowCashfreeModal(true);
    } else {
      processOrderSubmission();
    }
  };

  const processOrderSubmission = async () => {
    setOrderSubmitting(true);
    const orderPayload = {
      items: cart,
      totals: {
        subtotal: cartSubtotal,
        shipping: shippingCost,
        discount: discountAmount,
        total: finalTotal
      },
      address: checkoutForm,
      paymentMethod
    };

    try {
      const order = await apiService.submitOrder(orderPayload);
      
      // Deduct wallet balance if paid with wallet
      if (paymentMethod === 'wallet') {
        saveWallet(walletBalance - finalTotal);
      }

      // Sync orders state
      const updatedOrders = [order, ...pastOrders];
      setPastOrders(updatedOrders);

      // Empty the cart
      saveCart([]);
      setAppliedDiscount(null);
      setDiscountCode('');
      setCheckoutForm({ name: '', email: '', address: '', city: '', zip: '' });
      setActiveOrder(order);
      setCurrentView('success');
    } catch (err) {
      console.error(err);
      alert('Order placement failed.');
    } finally {
      setOrderSubmitting(false);
    }
  };

  // Cashfree UPI submission handler
  const handleCashfreePaymentSubmit = (e) => {
    e.preventDefault();
    if (!cashfreeUpi) return;
    setCashfreeProcessing(true);

    setTimeout(() => {
      setCashfreeProcessing(false);
      setShowCashfreeModal(false);
      setCashfreeUpi('');
      processOrderSubmission();
    }, 2000);
  };

  // Track Order search
  const handleTrackOrder = (e) => {
    e.preventDefault();
    setTrackError('');
    if (!trackOrderIdInput) return;

    const savedOrders = JSON.parse(localStorage.getItem('zappdeal_orders') || '[]');
    const order = savedOrders.find(o => o.id === trackOrderIdInput.trim().toUpperCase());
    if (order) {
      setActiveOrder(order);
      setCurrentView('success');
    } else {
      setTrackError('Order ID not found. Please verify and try again.');
      setActiveOrder(null);
    }
  };

  // Navigation handlers
  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view !== 'success' && view !== 'detail') {
      setSelectedProductId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      <Header 
        currentView={currentView}
        onViewChange={handleViewChange}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartToggle={() => setCartOpen(!cartOpen)}
      />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          handleViewChange('checkout');
        }}
      />

      {/* CASHFREE PAYMENT GATEWAY MODAL SIMULATION */}
      {showCashfreeModal && (
        <div className="cart-overlay" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="checkout-box glass-panel" style={{ width: '400px', padding: '24px', border: '2px solid var(--secondary)', boxShadow: '0 0 20px var(--secondary-glow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--secondary)' }}>
                Cashfree<span>payments</span>
              </div>
              <button 
                onClick={() => setShowCashfreeModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '16px' }}
              >
                ✕
              </button>
            </div>

            {cashfreeProcessing ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div className="purchase-spinner-ring" style={{ width: '40px', height: '40px', borderColor: 'var(--secondary)', borderTopColor: 'transparent', margin: '0 auto 16px' }}></div>
                <strong>Verifying UPI Payment...</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '8px' }}>Please check your mobile UPI app to authorize the transaction.</p>
              </div>
            ) : (
              <form onSubmit={handleCashfreePaymentSubmit}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span>Merchant</span>
                    <strong>ZappDeal India</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Amount Payable</span>
                    <strong style={{ color: 'var(--secondary)' }}>${finalTotal.toFixed(2)}</strong>
                  </div>
                </div>

                <label className="form-label">Enter UPI ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. name@okhdfcbank" 
                  className="form-input"
                  style={{ fontSize: '16px', textAlign: 'center' }}
                  value={cashfreeUpi}
                  onChange={(e) => setCashfreeUpi(e.target.value)}
                  required
                />
                
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '16px', textAlign: 'center' }}>
                  A payment request notification will be sent to your UPI app.
                </p>

                <button type="submit" className="neon-btn" style={{ width: '100%', background: 'linear-gradient(135deg, var(--secondary), var(--primary))' }}>
                  Pay via Cashfree
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <main style={{ flexGrow: 1 }}>
        {/* VIEW: CATALOG / SHOP */}
        {currentView === 'shop' && (
          <>
            {/* Hero Section */}
            <section className="hero">
              <div className="hero-content">
                <h1 className="gradient-text">Unleash Your Device's True Aesthetic</h1>
                <p>
                  Explore premium, high-protection covers or jump into our Design Studio to build your own masterpiece with dynamic text and custom photo printing.
                </p>
                <div className="hero-cta">
                  <button className="neon-btn" onClick={() => handleViewChange('customize')}>
                    Design Your Own Case
                  </button>
                  <button className="secondary-btn" onClick={() => {
                    document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Browse Designs
                  </button>
                </div>
              </div>

              <div className="hero-showcase">
                <div className="showcase-bg"></div>
                <div className="showcase-phone">
                  <div className="phone-mockup customizer-mock" style={{ transform: 'rotate(-8deg)', boxShadow: '0 30px 60px rgba(139,92,246,0.3)' }}>
                    <div className="camera-island">
                      <div className="lens"></div>
                      <div className="lens"></div>
                      <div className="lens"></div>
                      <div className="camera-island-flash"></div>
                    </div>
                    <div className="case-body" style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4, #f43f5e)' }}>
                      <div className="case-pattern pattern-waves"></div>
                      <div className="user-custom-text" style={{ top: '65%', left: '50%', color: '#ffffff', fontSize: '20px', fontFamily: 'var(--font-heading)' }}>
                        ZAPPDEAL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Shop Catalog */}
            <section id="shop-section" className="shop-section">
              <h2 className="section-title">Explore Premium Designs</h2>
              
              {/* Category selector */}
              <div className="filter-tabs-container">
                {['all', 'clear', 'silicone', 'printed', 'rugged'].map(cat => (
                  <button 
                    key={cat} 
                    className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Products list */}
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onSelect={handleSelectProduct}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {/* VIEW: PRODUCT DETAIL */}
        {currentView === 'detail' && selectedProduct && (
          <div className="detail-view-container">
            <button className="back-btn" onClick={() => handleViewChange('shop')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Catalog
            </button>

            <div className="detail-layout">
              {/* Image Preview */}
              <div className="detail-image-section">
                <div className="showcase-bg"></div>
                <div className="phone-mockup customizer-mock">
                  <div className="camera-island">
                    <div className="lens"></div>
                    <div className="lens"></div>
                    <div className="camera-island-flash"></div>
                  </div>
                  <div 
                    className="case-body" 
                    style={{ 
                      backgroundImage: selectedProduct.image ? `url(${selectedProduct.image})` : (selectedProduct.gradient || 'none'),
                      backgroundColor: selectedProduct.gradient && !selectedProduct.image ? 'transparent' : 'var(--bg-card)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: selectedProduct.isTransparent ? '1px dashed rgba(255,255,255,0.2)' : 'none'
                    }}
                  >
                    {selectedProduct.hasPattern && <div className={`case-pattern pattern-${selectedProduct.patternType}`} />}
                    
                    {/* MagSafe Ring Visual Overlay */}
                    {selectedProduct.isTransparent && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        opacity: 0.8,
                        pointerEvents: 'none'
                      }}>
                        <div style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          border: '3px solid rgba(255, 255, 255, 0.65)',
                          boxShadow: '0 0 6px rgba(255,255,255,0.2)'
                        }}></div>
                        <div style={{
                          width: '6px',
                          height: '24px',
                          background: 'rgba(255, 255, 255, 0.65)',
                          marginTop: '4px',
                          borderRadius: '1.5px'
                        }}></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Purchase Config Form */}
              <div className="detail-info-section">
                <h2>{selectedProduct.name}</h2>
                <div className="detail-rating-row">
                  <div className="product-rating">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>{selectedProduct.rating}</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}>({selectedProduct.reviewsCount} customer reviews)</span>
                </div>

                <div className="detail-price">
                  ${(selectedProduct.basePrice + (CASE_MATERIALS.find(m => m.id === detailMaterialId)?.priceModifier || 0)).toFixed(2)}
                </div>

                <p className="detail-description">{selectedProduct.description}</p>

                {/* Device Selector */}
                <div className="option-group">
                  <label className="option-title">1. Device Model</label>
                  <select 
                    value={detailModelId} 
                    onChange={(e) => setDetailModelId(e.target.value)}
                    className="model-select-dropdown"
                  >
                    {SUPPORTED_MODELS.map(model => (
                      <option key={model.id} value={model.id}>{model.brand} - {model.name}</option>
                    ))}
                  </select>
                </div>

                {/* Material Selector */}
                <div className="option-group">
                  <label className="option-title">2. Material Choice</label>
                  <div className="material-selector">
                    {CASE_MATERIALS.map(mat => (
                      <div 
                        key={mat.id}
                        className={`material-option ${detailMaterialId === mat.id ? 'selected' : ''}`}
                        onClick={() => setDetailMaterialId(mat.id)}
                      >
                        <div className="material-name">{mat.name}</div>
                        <div className="material-desc">{mat.description}</div>
                        <div className="material-price">
                          {mat.priceModifier > 0 ? `+$${mat.priceModifier}` : mat.priceModifier < 0 ? `-$${Math.abs(mat.priceModifier)}` : 'Included'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Features List */}
                <div className="feature-list">
                  {selectedProduct.features.map((feature, i) => (
                    <div className="feature-item" key={i}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    className="neon-btn" 
                    style={{ flexGrow: 2, padding: '16px', fontSize: '16px' }}
                    onClick={() => {
                      const modelName = SUPPORTED_MODELS.find(m => m.id === detailModelId).name;
                      const materialName = CASE_MATERIALS.find(m => m.id === detailMaterialId).name;
                      const price = selectedProduct.basePrice + (CASE_MATERIALS.find(m => m.id === detailMaterialId)?.priceModifier || 0);

                      handleAddToCart({
                        id: selectedProduct.id,
                        name: selectedProduct.name,
                        gradient: selectedProduct.gradient,
                        hasPattern: selectedProduct.hasPattern,
                        patternType: selectedProduct.patternType,
                        price,
                        modelId: detailModelId,
                        modelName,
                        materialId: detailMaterialId,
                        materialName,
                        quantity: 1
                      });
                    }}
                  >
                    Add Cover to Cart
                  </button>

                  <button 
                    className="secondary-btn"
                    style={{ flexGrow: 1, display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => handleToggleWishlist(selectedProduct.id)}
                  >
                    {wishlist.some(p => p.id === selectedProduct.id) ? '❤️ Wishlisted' : '♡ Wishlist'}
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
              <div className="reviews-summary-bar">
                <h3 style={{ fontSize: '24px', fontWeight: '700' }}>Reviews & Feedbacks</h3>
                <span className="product-rating" style={{ fontSize: '18px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {selectedProduct.rating} / 5.0
                </span>
              </div>

              {/* Reviews List */}
              <div className="reviews-list">
                {detailReviews.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No reviews yet. Be the first to share your thoughts!</p>
                ) : (
                  detailReviews.map(review => (
                    <div className="review-item-card" key={review.id}>
                      <div className="review-header">
                        <span className="review-author">{review.userName}</span>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <div className="review-stars">
                        {Array.from({ length: review.rating }).map((_, i) => '★').join('')}
                      </div>
                      <p className="review-body">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Review Form */}
              <form className="write-review-form glass-panel" onSubmit={handleReviewSubmit}>
                <h4 style={{ marginBottom: '16px', fontWeight: '700' }}>Write a Review</h4>
                
                <div className="form-group-row">
                  <div>
                    <label className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      className="form-input"
                      value={reviewForm.userName}
                      onChange={(e) => setReviewForm({ ...reviewForm, userName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Rating</label>
                    <div className="star-rating-selector">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className={`star-btn ${reviewForm.rating >= star ? 'active' : ''}`}
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="form-label">Review Details</label>
                  <textarea 
                    placeholder="Share your experience with this cover design..."
                    className="review-textarea"
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="neon-btn">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

        {/* VIEW: DESIGNER LAB */}
        {currentView === 'customize' && (
          <Customizer onAddToCart={handleAddToCart} />
        )}

        {/* VIEW: MY DASHBOARD */}
        {currentView === 'account' && (
          <AccountHub 
            wishlist={wishlist}
            walletBalance={walletBalance}
            addresses={addresses}
            pastOrders={pastOrders}
            onRemoveFromWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onAddWalletFunds={handleAddWalletFunds}
            onAddAddress={handleAddAddress}
            onDeleteAddress={handleDeleteAddress}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* VIEW: INFORMATION DESK */}
        {currentView === 'policies' && (
          <Policies />
        )}

        {/* VIEW: CHECKOUT PAGE */}
        {currentView === 'checkout' && (
          <div className="checkout-page-container">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '30px' }}>Secure Checkout</h2>
            
            <div className="checkout-layout">
              {/* Left Column: Form Details */}
              <form onSubmit={handlePlaceOrder}>
                {addresses.length > 0 && (
                  <div className="checkout-box glass-panel">
                    <h3>Select Saved Address</h3>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {addresses.map(addr => (
                        <button 
                          key={addr.id}
                          type="button"
                          className="secondary-btn"
                          style={{ padding: '8px 12px', fontSize: '12px' }}
                          onClick={() => handleSelectSavedAddress(addr)}
                        >
                          📍 {addr.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="checkout-box glass-panel">
                  <h3>Shipping Details</h3>
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="form-input"
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                    required
                  />

                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="form-input"
                    value={checkoutForm.email}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                    required
                  />

                  <label className="form-label">Delivery Address</label>
                  <input 
                    type="text" 
                    placeholder="Street Address, Apartment, suite" 
                    className="form-input"
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                    required
                  />

                  <div className="form-group-row">
                    <div>
                      <label className="form-label">City</label>
                      <input 
                        type="text" 
                        placeholder="New York" 
                        className="form-input"
                        value={checkoutForm.city}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">ZIP / Postal Code</label>
                      <input 
                        type="text" 
                        placeholder="10001" 
                        className="form-input"
                        value={checkoutForm.zip}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, zip: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="checkout-box glass-panel">
                  <h3>Payment Method</h3>
                  <div className="payment-methods-grid">
                    <div 
                      className={`payment-option-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="radio-dot"><div className="radio-dot-inner"></div></div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>Credit / Debit Card</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Visa, Mastercard, AMEX</span>
                      </div>
                    </div>

                    <div 
                      className={`payment-option-card ${paymentMethod === 'upi' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="radio-dot"><div className="radio-dot-inner"></div></div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>Pay via Cashfree (UPI Gateway)</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Google Pay, PhonePe, UPI apps</span>
                      </div>
                    </div>

                    <div 
                      className={`payment-option-card ${paymentMethod === 'wallet' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('wallet')}
                    >
                      <div className="radio-dot"><div className="radio-dot-inner"></div></div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>Zapp Wallet Balance (${walletBalance.toFixed(2)})</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pay instantly using your digital wallet funds</span>
                      </div>
                    </div>

                    <div 
                      className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="radio-dot"><div className="radio-dot-inner"></div></div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>Cash on Delivery</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pay cash when delivered (+$1.50 handling)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="neon-btn" 
                  style={{ width: '100%', padding: '16px', fontSize: '16px' }}
                  disabled={orderSubmitting}
                >
                  {orderSubmitting ? 'Processing Order...' : `Pay & Place Order ($${(finalTotal + (paymentMethod === 'cod' ? 1.50 : 0)).toFixed(2)})`}
                </button>
              </form>

              {/* Right Column: Order Summary */}
              <div>
                <div className="checkout-box glass-panel">
                  <h3>Order Summary</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                    {cart.map(item => (
                      <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <div>
                          <strong>{item.quantity}x</strong> {item.name}
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {item.modelName} ({item.materialName})
                          </div>
                        </div>
                        <span style={{ fontWeight: '600' }}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="coupon-section">
                    <input 
                      type="text" 
                      placeholder="Coupon (e.g. ZAPP20)" 
                      className="form-input" 
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button type="button" className="secondary-btn" onClick={handleApplyCoupon} style={{ padding: '0 16px' }}>
                      Apply
                    </button>
                  </div>

                  {appliedDiscount && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#10b981', marginBottom: '10px' }}>
                      <span>Discount Coupon ({appliedDiscount.code})</span>
                      <span>-{appliedDiscount.value * 100}% (-${discountAmount.toFixed(2)})</span>
                    </div>
                  )}

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                      <span>{isFreeShipping ? 'FREE' : '$4.99'}</span>
                    </div>
                    {paymentMethod === 'cod' && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>COD Surcharge</span>
                        <span>$1.50</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', marginTop: '8px' }}>
                      <span>Grand Total</span>
                      <span style={{ color: 'var(--secondary)' }}>
                        ${(finalTotal + (paymentMethod === 'cod' ? 1.50 : 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: ORDER SUCCESS / TRACK DETAILS */}
        {currentView === 'success' && activeOrder && (
          <div className="success-page glass-panel">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Order Confirmed!</h2>
            <div className="order-number">Order ID: {activeOrder.id}</div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>
              Thank you for shopping at ZappDeal! Your order has been registered and is now in production. You can track its status using the tracking timeline below.
            </p>

            <div className="tracking-timeline">
              {activeOrder.trackingSteps.map((step, idx) => (
                <div key={idx} className={`tracking-step ${step.completed ? 'completed' : ''}`}>
                  <div className="step-dot">{idx + 1}</div>
                  <span className="step-label">{step.label}</span>
                </div>
              ))}
            </div>

            <button className="neon-btn" onClick={() => handleViewChange('shop')} style={{ marginTop: '20px' }}>
              Continue Shopping
            </button>
          </div>
        )}

        {/* VIEW: TRACK / SEARCH EXISTING ORDERS */}
        {currentView === 'orders' && (
          <div className="success-page glass-panel" style={{ maxWidth: '500px', margin: '80px auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Track Your Order</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
              Enter your ZappDeal Order ID (e.g. ZP-123456) to track the printing, packaging, and shipping status.
            </p>

            <form onSubmit={handleTrackOrder}>
              <input 
                type="text" 
                placeholder="ZP-XXXXXX" 
                className="form-input" 
                style={{ textAlign: 'center', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                value={trackOrderIdInput}
                onChange={(e) => setTrackOrderIdInput(e.target.value)}
                required
              />
              {trackError && <p style={{ color: 'var(--accent-rose)', fontSize: '12px', marginBottom: '16px' }}>{trackError}</p>}
              
              <button type="submit" className="neon-btn" style={{ width: '100%', padding: '12px' }}>
                Track Status
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer onViewChange={handleViewChange} />
    </div>
  );
}

export default App;
