import React, { useState, useEffect, useRef } from 'react';
import ProductItem from '../ProductItem';
import ProductModal from '../ProductModal';
import productsData from '../../../data/products.json';
import './topProducts.css';

function TopProducts() {
  const [activeCategory, setActiveCategory] = useState('iphones');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const topProductsRef = useRef(null);

  const categories = Object.keys(productsData);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      },
      { threshold: 0.1 }
    );

    if (topProductsRef.current) {
      observer.observe(topProductsRef.current);
    }

    return () => {
      if (topProductsRef.current) {
        observer.unobserve(topProductsRef.current);
      }
    };
  }, []);

  return (
    <div ref={topProductsRef} className="top-products-section">
      <div className="section-header">
        <h2 className="section-title">TOP PRODUCTS</h2>
        <div className="category-tabs">
          {categories.map((category) => (
            <span
              key={category}
              className={`tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ')}
            </span>
          ))}
        </div>
      </div>
      <div className="product-cards">
        {productsData[activeCategory].map((product, index) => (
          <ProductItem
            key={index}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>
      <ProductModal 
        product={selectedProduct} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default TopProducts;


