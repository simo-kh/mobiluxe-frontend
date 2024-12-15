import React, { useState } from 'react';
import './productModal.css';

function ProductModal({ product, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const {
    name,
    price,
    stock,
    description,
    extra_attributes,
    is_promotion: isOnSale,
    original_price: originalPrice,
    main_photo,
    photos = [],
    is_used: isUsed,
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <div className="gallery-container">
          <button className="gallery-button left" onClick={handlePrevImage}>
            &#9664;
          </button>
          <img
            src={galleryImages[currentImageIndex] || "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ9_LVcKEev1SQM_WkDTDqsr6Qz0JfvJhgqianTiu6gibzSe_Ccc9NrkaGMV1MSl6Mp1ex-rk-tn0pI5_--apXnvwt4TDrnfcOf297Bwd7DNY9i5qFwxJPd2A"}
            alt={name}
            className="gallery-image"
          />
          <button className="gallery-button right" onClick={handleNextImage}>
            &#9654;
          </button>
        </div>
        <h2>{name}</h2>
        <hr className="divider" />
        <h5 className={`condition ${isUsed ? 'used' : 'new'}`}>{isUsed ? "D'occasion" : "Neuf"}</h5>

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

        <p>
          <span className="bold-text">Stock:</span> {stock}
        </p>
        <hr className="divider" />
        <div id="product-description">
          <h5>Description:</h5>
          <p>{description}</p>
        </div>
        <table className="characteristics-table">
          <tbody>
            {extra_attributes &&
              Object.keys(extra_attributes).map((key) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{extra_attributes[key]}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <a
          href={`https://wa.me/+212669833742?text=I'm interested in ${name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button"
        >
          Contacter pour acheter
        </a>
      </div>
    </div>
  );
}

export default ProductModal;
