

import React, { useState, useEffect, useRef } from 'react';
import ProductItem from '../ProductItem';
import ProductModal from '../ProductModal';
import { getProducts } from '../../Api/api';
import './topProducts.css';

function TopProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const topProductsRef = useRef(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const promotionProducts = response.data.filter(product => product.is_top_product);
        setProducts(promotionProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
        <h2 className="section-title">BEST SELLERS</h2>
      </div>
      <div className="product-cards">
        
        {products.map((product, index) => (
          <ProductItem
            key={index}
            image={product.main_photo}
            name={product.name}
            price={product.price}
            description={product.description}
            isOnSale={product.is_promotion}
            isUsed={product.is_used}
            originalPrice={product.original_price}
            extraAttributes={product.extra_attributes} // Pass `extra_attributes` to `ProductItem`
            condition={product.condition}
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
