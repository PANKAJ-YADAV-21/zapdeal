import React from 'react';

const ProductCard = ({ product, onSelect }) => {
  const { name, tagline, basePrice, rating, reviewsCount, badge, gradient, hasPattern, patternType, isTransparent } = product;

  return (
    <div className="product-card glass-panel" onClick={() => onSelect(product.id)}>
      {badge && <span className="product-badge">{badge}</span>}
      
      <div className="product-image-container">
        <div className="showcase-bg"></div>
        {/* Render a realistic mini CSS phone mockup for the case design */}
        <div className="phone-mockup">
          <div className="camera-island">
            <div className="lens"></div>
            <div className="lens"></div>
            <div className="camera-island-flash"></div>
          </div>
          <div 
            className="case-body" 
            style={{ 
              backgroundImage: product.image ? `url(${product.image})` : (product.gradient || 'none'),
              backgroundColor: product.gradient && !product.image ? 'transparent' : 'var(--bg-card)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: product.isTransparent ? '1px dashed rgba(255,255,255,0.2)' : 'none'
            }}
          >
            {product.hasPattern && <div className={`case-pattern pattern-${product.patternType}`} />}
            
            {/* MagSafe Ring Visual Overlay */}
            {product.isTransparent && (
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
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.65)',
                  boxShadow: '0 0 4px rgba(255,255,255,0.2)'
                }}></div>
                <div style={{
                  width: '4px',
                  height: '18px',
                  background: 'rgba(255, 255, 255, 0.65)',
                  marginTop: '2px',
                  borderRadius: '1px'
                }}></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-tagline">{tagline}</p>
        
        <div className="product-meta">
          <div className="product-rating">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{rating}</span>
            <span className="product-reviews">({reviewsCount})</span>
          </div>
          <div className="product-price">${basePrice}</div>
        </div>
        
        <button className="neon-btn product-card-btn">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
