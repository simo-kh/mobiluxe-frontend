import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import './productModal.css';

function ProductModal({ product, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null); // Reference to the gallery container
  const navigate = useNavigate();

  const galleryImages = product ? [product.main_photo, ...(product.photos || [])] : [];

  // Handle next image
  const handleNext = () => {
    if (galleryImages.length > 1 && galleryRef.current) {
      galleryRef.current.style.transition = 'transform 0.4s ease-in-out';
      galleryRef.current.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;

      setTimeout(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= galleryImages.length) {
          // Reset to first image
          galleryRef.current.style.transition = 'none';
          galleryRef.current.style.transform = 'translateX(0)';
          newIndex = 0;
        }
        setCurrentIndex(newIndex);
      }, 400); // Match CSS transition duration
    }
  };

  // Handle previous image
  const handlePrev = () => {
    if (galleryImages.length > 1 && galleryRef.current) {
      galleryRef.current.style.transition = 'transform 0.4s ease-in-out';
      galleryRef.current.style.transform = `translateX(-${(currentIndex - 1) * 100}%)`;

      setTimeout(() => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
          // Reset to last image
          galleryRef.current.style.transition = 'none';
          galleryRef.current.style.transform = `translateX(-${(galleryImages.length - 1) * 100}%)`;
          newIndex = galleryImages.length - 1;
        }
        setCurrentIndex(newIndex);
      }, 400); // Match CSS transition duration
    }
  };

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleNavigateToBuyPage = () => {
    navigate('/buy', { state: { product } });
  };

  if (!product) return null;

  const {
    name,
    price,
    description,
    extra_attributes,
    is_promotion: isOnSale,
    original_price: originalPrice,
    condition,
  } = product;

  const displayableAttributes = extra_attributes
    ? Object.entries(extra_attributes).filter(([, attr]) => attr.is_displayable)
    : [];

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="gallery-container" {...swipeHandlers}>
          {galleryImages.length > 1 && (
            <button className="gallery-button left" onClick={handlePrev}>
              &#9664;
            </button>
          )}
          <div
            className="gallery-wrapper"
            ref={galleryRef}
            style={{
              display: 'flex',
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${galleryImages.length * 100}%`,
            }}
          >
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="gallery-image"
                aria-hidden={index !== currentIndex} // Accessibility for screen readers
              />
            ))}
          </div>
          {galleryImages.length > 1 && (
            <button className="gallery-button right" onClick={handleNext}>
              &#9654;
            </button>
          )}
        </div>
        <div className="product-container">
          <h2 id="store-name">Mobiluxe</h2>
          <h2 className="product-card-title">{name}</h2>
          <div className="product-attributes">
            {displayableAttributes.map(([key, attr], index) => (
              <React.Fragment key={key}>
                {index > 0 && ' • '}
                <span>{attr.value}</span>
              </React.Fragment>
            ))}
            {condition && (displayableAttributes.length > 0 ? ' • ' : '')}
            {condition && <span>{condition}</span>}
          </div>
          <div className="price-section">
            {isOnSale && originalPrice ? (
              <>
                <h3 className="sale-price">{price} MAD</h3>
                <h3 className="original-price">
                  <del>{originalPrice} MAD</del>
                </h3>
              </>
            ) : (
              <h3 className="regular-price">{price} MAD</h3>
            )}
          </div>
        </div>
        {description && (
          <div id="product-description">
            <h5 className="product-h5">Description:</h5>
            <p>{description}</p>
          </div>
        )}
        <div>
          <h5 className="product-h5">Plus d'informations:</h5>
          <table className="characteristics-table">
            <tbody>
              {extra_attributes &&
                Object.entries(extra_attributes).map(([key, attr]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{attr.value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="order-section">
          <a onClick={handleNavigateToBuyPage} className="contact-button">
            Acheter
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ProductModal;
