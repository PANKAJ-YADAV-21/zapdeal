import { PRODUCTS, SUPPORTED_MODELS, DISCOUNT_CODES } from '../data/mockData';

// Helper to initialize local storage
const initLocalStorage = () => {
  if (!localStorage.getItem('zappdeal_custom_designs')) {
    localStorage.setItem('zappdeal_custom_designs', JSON.stringify([]));
  }
  if (!localStorage.getItem('zappdeal_reviews')) {
    const initialReviews = {};
    PRODUCTS.forEach(p => {
      initialReviews[p.id] = [
        {
          id: `r-1-${p.id}`,
          userName: 'Alex Carter',
          rating: 5,
          date: '2026-08-10',
          comment: `Absolutely love this case! Fits my device perfectly and the print quality is stunning.`
        },
        {
          id: `r-2-${p.id}`,
          userName: 'Sarah Jenkins',
          rating: 4,
          date: '2026-08-14',
          comment: `Great feel and weight. Very slim but feels secure. Highly recommend!`
        }
      ];
    });
    localStorage.setItem('zappdeal_reviews', JSON.stringify(initialReviews));
  }
  if (!localStorage.getItem('zappdeal_orders')) {
    localStorage.setItem('zappdeal_orders', JSON.stringify([]));
  }
};

initLocalStorage();

export const apiService = {
  // Get all catalog products
  getProducts: async () => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...PRODUCTS];
  },

  // Get a single product
  getProduct: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return { ...product };
  },

  // Save a custom case design
  saveCustomDesign: async (designData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const designs = JSON.parse(localStorage.getItem('zappdeal_custom_designs') || '[]');
    const newDesign = {
      id: `custom-${Date.now()}`,
      name: `Custom Case - ${designData.modelName}`,
      basePrice: 25, // custom case base price
      rating: 5.0,
      reviewsCount: 0,
      description: `Custom designed cover for ${designData.modelName} with ${designData.materialName} material.`,
      badge: 'Your Creation',
      isCustom: true,
      customDetails: designData, // includes: text, textColor, fontStyle, textPosition, bgImage, bgColor, materialId, modelId
      gradient: designData.bgColor ? `linear-gradient(135deg, ${designData.bgColor}, ${designData.bgColor})` : null
    };
    designs.push(newDesign);
    localStorage.setItem('zappdeal_custom_designs', JSON.stringify(designs));
    return newDesign;
  },

  // Get custom designs created by the user
  getCustomDesigns: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return JSON.parse(localStorage.getItem('zappdeal_custom_designs') || '[]');
  },

  // Get reviews for a product
  getReviews: async (productId) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const allReviews = JSON.parse(localStorage.getItem('zappdeal_reviews') || '{}');
    return allReviews[productId] || [];
  },

  // Add review
  addReview: async (productId, reviewData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const allReviews = JSON.parse(localStorage.getItem('zappdeal_reviews') || '{}');
    if (!allReviews[productId]) {
      allReviews[productId] = [];
    }
    const newReview = {
      id: `r-${Date.now()}`,
      userName: reviewData.userName || 'Anonymous',
      rating: Number(reviewData.rating) || 5,
      date: new Date().toISOString().split('T')[0],
      comment: reviewData.comment || ''
    };
    allReviews[productId].unshift(newReview);
    localStorage.setItem('zappdeal_reviews', JSON.stringify(allReviews));
    return newReview;
  },

  // Validate discount code
  validateDiscount: async (code) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const normalizedCode = code.trim().toUpperCase();
    if (normalizedCode in DISCOUNT_CODES) {
      return {
        valid: true,
        code: normalizedCode,
        value: DISCOUNT_CODES[normalizedCode]
      };
    }
    return { valid: false };
  },

  // Submit order
  submitOrder: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const orders = JSON.parse(localStorage.getItem('zappdeal_orders') || '[]');
    const newOrder = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      items: orderData.items,
      totals: orderData.totals,
      shippingAddress: orderData.address,
      paymentMethod: orderData.paymentMethod,
      status: 'Processing',
      trackingSteps: [
        { label: 'Order Placed', date: new Date().toLocaleDateString(), completed: true },
        { label: 'Printed & Assembled', date: 'Pending', completed: false },
        { label: 'Shipped', date: 'Pending', completed: false },
        { label: 'Delivered', date: 'Pending', completed: false }
      ]
    };
    orders.push(newOrder);
    localStorage.setItem('zappdeal_orders', JSON.stringify(orders));
    return newOrder;
  }
};
