import React, { useEffect, useRef } from 'react';
import './productItem.css';

function ProductItem({ image, name, price, extraAttributes, onClick, isOnSale, isUsed, originalPrice , condition}) {
  const productCardRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-animate');
        }
      },
      { threshold: 0.1 }
    );

    if (productCardRef.current) {
      observer.observe(productCardRef.current);
    }

    return () => {
      if (productCardRef.current) {
        observer.unobserve(productCardRef.current);
      }
    };
  }, []);

  const imageUrl = image
    ? `${image.replace(/\\/g, '/')}`
    : "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ9_LVcKEev1SQM_WkDTDqsr6Qz0JfvJhgqianTiu6gibzSe_Ccc9NrkaGMV1MSl6Mp1ex-rk-tn0pI5_--apXnvwt4TDrnfcOf297Bwd7DNY9i5qFwxJPd2A";

  // Extract displayable attributes
  const displayableAttributes = extraAttributes
    ? Object.entries(extraAttributes).filter(([, attr]) => attr.is_displayable)
    : [];

  return (
    <div ref={productCardRef} className="card" onClick={onClick}>
      <div className="card-upper">
        {isOnSale && <div className="card-sale-badge">PROMO</div>}
        <img src={imageUrl} alt={name} className="card-image" />
      </div>
      <div className="card-lower">
        <h4 className="card-title">{name}</h4>
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
        <div className="card-price-container">
          <p className="card-price">{price} MAD</p>
          {isOnSale && originalPrice && (
            <p className="card-original-price">
              <del>{originalPrice} MAD</del>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
