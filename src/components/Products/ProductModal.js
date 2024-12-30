import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './productModal.css';

function ProductModal({ product, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  
  // Render nothing if no product is selected
  if (!product) return null;

  const {
    name,
    price,
    description,
    extra_attributes,
    is_promotion: isOnSale,
    original_price: originalPrice,
    main_photo,
    photos = [],
    condition
  } = product;

  const galleryImages = [main_photo, ...photos];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const displayableAttributes = extra_attributes
    ? Object.entries(extra_attributes).filter(([, attr]) => attr.is_displayable)
    : [];

  const handleNavigateToBuyPage = () => {
    navigate('/buy', { state: { product } });
  };

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <div className="gallery-container">
          <button className="gallery-button left" onClick={handlePrevImage}>
            &#9664;
          </button>
          <img
            src={
              galleryImages[currentImageIndex] ||
              "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ9_LVcKEev1SQM_WkDTDqsr6Qz0JfvJhgqianTiu6gibzSe_Ccc9NrkaGMV1MSl6Mp1ex-rk-tn0pI5_--apXnvwt4TDrnfcOf297Bwd7DNY9i5qFwxJPd2A"
            }
            alt={name}
            className="gallery-image"
          />
          <button className="gallery-button right" onClick={handleNextImage}>
            &#9654;
          </button>
        </div>
        <div className="product-container">
          <h2 id="store-name">Mobiluxe</h2>
          <h2 className="product-card-title">{name}</h2>
          <div className="product-attributes">
          {/* Render displayable attributes */}
          {displayableAttributes.map(([key, attr], index) => (
            <React.Fragment key={key}>
              {index > 0 && ' • '}
              <span>{attr.value}</span>
            </React.Fragment>
          ))}
          {/* Append condition if it exists */}
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
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default ProductModal;
