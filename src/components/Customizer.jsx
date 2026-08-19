import React, { useState, useRef } from 'react';
import { SUPPORTED_MODELS, CASE_MATERIALS, BASE_COLORS } from '../data/mockData';

const Customizer = ({ onAddToCart }) => {
  const [modelId, setModelId] = useState(SUPPORTED_MODELS[0].id);
  const [materialId, setMaterialId] = useState(CASE_MATERIALS[0].id);
  const [bgColor, setBgColor] = useState(BASE_COLORS[0].hex);
  
  // Custom text states
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('Outfit');
  const [textY, setTextY] = useState(50); // Vertical offset in %
  const [textFontSize, setTextFontSize] = useState(24);

  // Custom image states
  const [imageSrc, setImageSrc] = useState(null);
  const [imageSize, setImageSize] = useState(60); // Width scale in %
  const [imageY, setImageY] = useState(50); // Vertical position in %
  const [imageOpacity, setImageOpacity] = useState(0.85);

  const fileInputRef = useRef(null);

  const selectedModel = SUPPORTED_MODELS.find(m => m.id === modelId);
  const selectedMaterial = CASE_MATERIALS.find(m => m.id === materialId);

  // Price calculations
  const basePrice = 25.00;
  const materialAddon = selectedMaterial ? selectedMaterial.priceModifier : 0;
  const textAddon = text ? 2.00 : 0;
  const imageAddon = imageSrc ? 4.00 : 0;
  const totalPrice = basePrice + materialAddon + textAddon + imageAddon;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const src = URL.createObjectURL(file);
      setImageSrc(src);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const src = URL.createObjectURL(file);
      setImageSrc(src);
    }
  };

  const handleAddToCart = () => {
    const customDesign = {
      name: `Custom Cover`,
      modelId,
      modelName: selectedModel.name,
      materialId,
      materialName: selectedMaterial.name,
      price: totalPrice,
      quantity: 1,
      isCustom: true,
      gradient: bgColor, // Simple color hex background
      customDetails: {
        bgColor,
        text,
        textColor,
        fontFamily,
        textY,
        textFontSize,
        imageSrc,
        imageSize,
        imageY,
        imageOpacity
      }
    };
    onAddToCart(customDesign);
  };

  const resetDesigner = () => {
    setText('');
    setImageSrc(null);
    setBgColor(BASE_COLORS[0].hex);
    setMaterialId(CASE_MATERIALS[0].id);
  };

  return (
    <div className="customizer-workspace">
      <div className="customizer-layout">
        {/* Left Side: Mockup Preview */}
        <div className="preview-container glass-panel">
          <div className="phone-mockup customizer-mock" style={{ backgroundColor: '#18181b' }}>
            <div className="camera-island">
              <div className="lens"></div>
              <div className="lens"></div>
              <div className="lens"></div>
              <div className="camera-island-flash"></div>
            </div>
            
            {/* Case Body Color */}
            <div 
              className="case-body" 
              style={{ backgroundColor: bgColor }}
            >
              {/* Image Overlay */}
              {imageSrc && (
                <img 
                  src={imageSrc} 
                  alt="Custom Upload" 
                  className="user-custom-image"
                  style={{
                    left: '50%',
                    top: `${imageY}%`,
                    width: `${imageSize}%`,
                    opacity: imageOpacity
                  }}
                />
              )}

              {/* Text Overlay */}
              {text && (
                <div 
                  className="user-custom-text"
                  style={{
                    left: '50%',
                    top: `${textY}%`,
                    color: textColor,
                    fontFamily: fontFamily === 'Outfit' ? 'var(--font-heading)' : fontFamily,
                    fontSize: `${textFontSize}px`
                  }}
                >
                  {text}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Configuration Form */}
        <div className="control-panel glass-panel">
          <div>
            <h2 className="customizer-title">Design Studio</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
              Create a custom phone cover designed entirely by you. High-definition scratchproof print.
            </p>
          </div>

          <div className="control-section">
            <label className="option-title">1. Device Model</label>
            <select 
              value={modelId} 
              onChange={(e) => setModelId(e.target.value)}
              className="model-select-dropdown"
            >
              {SUPPORTED_MODELS.map(model => (
                <option key={model.id} value={model.id}>
                  {model.brand} - {model.name}
                </option>
              ))}
            </select>
          </div>

          <div className="control-section">
            <label className="option-title">2. Case Material</label>
            <div className="material-selector">
              {CASE_MATERIALS.map(material => (
                <div 
                  key={material.id}
                  className={`material-option ${materialId === material.id ? 'selected' : ''}`}
                  onClick={() => setMaterialId(material.id)}
                >
                  <div className="material-name">{material.name}</div>
                  <div className="material-desc">{material.description}</div>
                  <div className="material-price">
                    {material.priceModifier > 0 ? `+$${material.priceModifier}` : material.priceModifier < 0 ? `-$${Math.abs(material.priceModifier)}` : 'Included'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="control-section">
            <label className="option-title">3. Base Color</label>
            <div className="color-palette">
              {BASE_COLORS.map(color => (
                <div 
                  key={color.name}
                  className={`color-bubble ${bgColor === color.hex ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  onClick={() => setBgColor(color.hex)}
                ></div>
              ))}
            </div>
          </div>

          {/* Custom Text and Upload Tabs */}
          <div className="control-section">
            <div className="tab-selector">
              <button 
                className="tab-btn active"
                onClick={() => {
                  document.getElementById('text-controls').style.display = 'flex';
                  document.getElementById('image-controls').style.display = 'none';
                  document.querySelectorAll('.tab-btn')[0].classList.add('active');
                  document.querySelectorAll('.tab-btn')[1].classList.remove('active');
                }}
              >
                Add Text
              </button>
              <button 
                className="tab-btn"
                onClick={() => {
                  document.getElementById('text-controls').style.display = 'none';
                  document.getElementById('image-controls').style.display = 'flex';
                  document.querySelectorAll('.tab-btn')[1].classList.add('active');
                  document.querySelectorAll('.tab-btn')[0].classList.remove('active');
                }}
              >
                Upload Image
              </button>
            </div>

            {/* Text Options */}
            <div id="text-controls" style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
              <div>
                <label className="form-label">Type Text</label>
                <input 
                  type="text" 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text on case..."
                  className="text-input-field"
                  maxLength={25}
                />
              </div>

              {text && (
                <>
                  <div className="form-group-row">
                    <div>
                      <label className="form-label">Font Family</label>
                      <select 
                        value={fontFamily} 
                        onChange={(e) => setFontFamily(e.target.value)}
                        className="model-select-dropdown"
                        style={{ padding: '8px' }}
                      >
                        <option value="Outfit">Outfit Bold</option>
                        <option value="'Courier New', monospace">Courier Retro</option>
                        <option value="Georgia, serif">Georgia Elegant</option>
                        <option value="'Brush Script MT', cursive">Script Handwritten</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Text Color</label>
                      <input 
                        type="color" 
                        value={textColor} 
                        onChange={(e) => setTextColor(e.target.value)}
                        className="text-input-field" 
                        style={{ padding: '2px 8px', height: '42px', cursor: 'pointer' }}
                      />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div>
                      <label className="form-label">Font Size ({textFontSize}px)</label>
                      <input 
                        type="range" 
                        min="14" 
                        max="36" 
                        value={textFontSize}
                        onChange={(e) => setTextFontSize(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--primary)' }}
                      />
                    </div>
                    <div>
                      <label className="form-label">Position ({textY}%)</label>
                      <input 
                        type="range" 
                        min="10" 
                        max="90" 
                        value={textY}
                        onChange={(e) => setTextY(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--primary)' }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Image Options */}
            <div id="image-controls" style={{ display: 'none', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
              <div 
                className="custom-image-uploader"
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="uploader-icon">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <div style={{ fontSize: '13px', fontWeight: '500' }}>
                  {imageSrc ? 'Change Image File' : 'Click to Upload or Drag & Drop'}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Supports PNG, JPG, JPEG (transparency recommended)
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="upload-input-element"
                />
              </div>

              {imageSrc && (
                <>
                  <div className="form-group-row">
                    <div>
                      <label className="form-label">Scale Size ({imageSize}%)</label>
                      <input 
                        type="range" 
                        min="20" 
                        max="95" 
                        value={imageSize}
                        onChange={(e) => setImageSize(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--primary)' }}
                      />
                    </div>
                    <div>
                      <label className="form-label">Vertical Pos ({imageY}%)</label>
                      <input 
                        type="range" 
                        min="20" 
                        max="80" 
                        value={imageY}
                        onChange={(e) => setImageY(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--primary)' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Image Opacity ({Math.round(imageOpacity * 100)}%)</label>
                    <input 
                      type="range" 
                      min="20" 
                      max="100" 
                      step="5"
                      value={imageOpacity * 100}
                      onChange={(e) => setImageOpacity(Number(e.target.value) / 100)}
                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="customizer-summary">
            <div className="summary-row">
              <span>Base Custom Case</span>
              <span>$25.00</span>
            </div>
            <div className="summary-row">
              <span>Material Add-on ({selectedMaterial.name})</span>
              <span>{materialAddon > 0 ? `+$${materialAddon.toFixed(2)}` : materialAddon < 0 ? `-$${Math.abs(materialAddon).toFixed(2)}` : '$0.00'}</span>
            </div>
            {text && (
              <div className="summary-row">
                <span>Text Printing Fee</span>
                <span>+$2.00</span>
              </div>
            )}
            {imageSrc && (
              <div className="summary-row">
                <span>Custom Graphics Fee</span>
                <span>+$4.00</span>
              </div>
            )}
            <div className="summary-row">
              <span>Total Price</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button className="secondary-btn" style={{ flexGrow: 1 }} onClick={resetDesigner}>
              Clear
            </button>
            <button className="neon-btn" style={{ flexGrow: 2 }} onClick={handleAddToCart}>
              Add Custom Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customizer;
