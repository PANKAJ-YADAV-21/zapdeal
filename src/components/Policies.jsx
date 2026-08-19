import React, { useState } from 'react';

const Policies = ({ initialTab = 'shipping' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [faqExpanded, setFaqExpanded] = useState({});
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Query', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: "Does ZappDeal support MagSafe charging?",
      a: "Yes! Our 'Crystal MagSafe Shield' case features built-in N52 strong magnets that lock securely to any MagSafe charger, wallet, or stand. Base silicone/slim cases also support wireless charging, but without magnetic lock."
    },
    {
      q: "Are the custom printed case designs scratchproof?",
      a: "Absolutely. We use high-grade UV cured inks with a protective matte or gloss clear-coat. The design is printed deep into the case backing, preventing scratches, peeling, and yellowing over extended daily use."
    },
    {
      q: "What is your standard shipping & delivery timeline?",
      a: "We process and print orders within 24-48 hours. Shipping takes 2-5 business days across major cities in India. Remote locations may take up to 7 business days."
    },
    {
      q: "Can I return a custom printed design case?",
      a: "Since custom cases are tailored specifically to your upload or design, we only accept returns if there is a printing defect, transport damage, or sizing mismatch from our end. Pre-designed catalog covers can be returned within 15 days of delivery."
    },
    {
      q: "Do you offer corporate or bulk discounts?",
      a: "Yes! We offer bulk prices for orders of 10 or more cases (perfect for company branding, community merch, or family events). Please use the form under the 'Bulk Orders' tab to get a custom quote."
    }
  ];

  const toggleFaq = (idx) => {
    setFaqExpanded(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    
    // Open standard mail client
    const mailtoUrl = `mailto:support@zappdeal.com?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`)}`;
    window.location.href = mailtoUrl;

    setSubmitted(true);
    setContactForm({ name: '', email: '', subject: 'Query', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="checkout-page-container">
      <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '30px' }}>Information Desk</h2>
      
      <div className="checkout-layout">
        {/* Left Side Tab Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="checkout-box glass-panel" style={{ padding: '16px' }}>
            <button 
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
              style={{ textAlign: 'left', display: 'block', width: '100%', padding: '12px' }}
            >
              🚚 Shipping Policy
            </button>
            <button 
              className={`tab-btn ${activeTab === 'warranty' ? 'active' : ''}`}
              onClick={() => setActiveTab('warranty')}
              style={{ textAlign: 'left', display: 'block', width: '100%', padding: '12px' }}
            >
              🛡️ Return & Warranty
            </button>
            <button 
              className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
              onClick={() => setActiveTab('faq')}
              style={{ textAlign: 'left', display: 'block', width: '100%', padding: '12px' }}
            >
              ❓ FAQs
            </button>
            <button 
              className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
              style={{ textAlign: 'left', display: 'block', width: '100%', padding: '12px' }}
            >
              ✉️ Contact & Bulk Orders
            </button>
          </div>
        </div>

        {/* Right Side Content Area */}
        <div className="checkout-box glass-panel" style={{ minHeight: '400px', padding: '30px' }}>
          
          {/* TAB: SHIPPING */}
          {activeTab === 'shipping' && (
            <div>
              <h3 style={{ marginBottom: '16px' }}>Shipping Information</h3>
              <div style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '15px' }}>
                <p style={{ marginBottom: '16px' }}>
                  At ZappDeal, we ensure that your covers are printed, quality-tested, and shipped with utmost care.
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li><strong>Free Shipping</strong>: All orders above $50 qualify for free standard shipping. For orders below $50, a flat shipping fee of $4.99 is applied.</li>
                  <li><strong>Dispatch Window</strong>: Pre-designed covers are dispatched within 24 hours. Custom designs requiring graphic adjustments are dispatched within 48 hours.</li>
                  <li><strong>Cash on Delivery (COD)</strong>: We support COD across major pincodes in India. A handling fee of $1.50 is added for COD orders to cover additional courier processing fees.</li>
                  <li><strong>Courier Partners</strong>: We ship using premium logistics providers like BlueDart, Delhivery, and Xpressbees to guarantee fast, secure hand-delivery.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: WARRANTY & RETURNS */}
          {activeTab === 'warranty' && (
            <div>
              <h3 style={{ marginBottom: '16px' }}>Returns, Exchange & Warranty</h3>
              <div style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '15px' }}>
                <p style={{ marginBottom: '16px' }}>
                  We stand by the craftsmanship of our mobile cases. If you aren't completely happy with your cover, we are here to assist.
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li><strong>15-Day Return Policy</strong>: Non-customized products from our catalog can be returned or exchanged within 15 days of delivery, no questions asked.</li>
                  <li><strong>Custom Design Warranty</strong>: Custom prints are covered by a 6-month printing warranty. If your custom cover peels, fades, or cracks, we will print and ship a replacement for free.</li>
                  <li><strong>Process</strong>: To request an exchange or refund, contact us at `support@zappdeal.com` with your Order ID and photos showing the issue. We'll arrange a free return pickup.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: FAQs */}
          {activeTab === 'faq' && (
            <div>
              <h3 style={{ marginBottom: '24px' }}>Frequently Asked Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {faqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className="glass-panel" 
                    style={{ padding: '16px', cursor: 'pointer' }}
                    onClick={() => toggleFaq(idx)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600', fontSize: '15px' }}>
                      <span>{faq.q}</span>
                      <span style={{ color: 'var(--primary)', fontSize: '18px' }}>
                        {faqExpanded[idx] ? '−' : '+'}
                      </span>
                    </div>
                    {faqExpanded[idx] && (
                      <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACT & BULK */}
          {activeTab === 'contact' && (
            <div>
              <h3 style={{ marginBottom: '10px' }}>Contact & Bulk Inquiries</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>
                Looking to order custom covers for your business, event, or team? Fill out the details below. We reply within 24 hours.
              </p>

              {submitted && (
                <div style={{ color: '#10b981', padding: '12px', background: 'rgba(16,185,129,0.1)', borderRadius: '4px', marginBottom: '16px', fontSize: '14px' }}>
                  ✓ Inquiry form compiled! Opening your email client to dispatch the request...
                </div>
              )}

              <form onSubmit={handleContactSubmit}>
                <div className="form-group-row">
                  <div>
                    <label className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      className="form-input"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="form-input"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <label className="form-label">Subject</label>
                <select 
                  className="model-select-dropdown"
                  style={{ marginBottom: '16px' }}
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                >
                  <option value="Bulk Order Inquiry">Bulk / Corporate Order Request (10+ covers)</option>
                  <option value="Customer Support Query">Help with My Order / Refund</option>
                  <option value="Custom Design Question">Custom Print Graphic Design Help</option>
                  <option value="Other">General Feedback</option>
                </select>

                <label className="form-label">Message Details</label>
                <textarea 
                  placeholder="Tell us what you need. (If requesting bulk, mention model list and quantities)..."
                  className="review-textarea"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                ></textarea>

                <button type="submit" className="neon-btn" style={{ width: '100%' }}>
                  Submit Inquiry & Open Mail Client
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Policies;
