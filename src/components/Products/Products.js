import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import ProductModal from './ProductModal';
import './products.css';

const Products = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortType, setSortType] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  useEffect(() => {
    let sorted = [...products];
    if (sortType === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sorted);
  }, [sortType, products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <div className="products-count">
          Affichage de {sortedProducts.length} articles
        </div>
        <div className="products-sort">
          <label htmlFor="sort">Trier par :</label>
          <select id="sort" value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="default">Par défaut</option>
            <option value="price-asc">Prix : du moins cher au plus cher</option>
            <option value="price-desc">Prix : du plus cher au moins cher</option>
          </select>
        </div>
      </div>
      <div className="products-grid">
        {sortedProducts.map((product) => (
          <ProductItem
            key={product.id}
            image={product.main_photo}
            name={product.name}
            price={product.price}
            description={product.description}
            isOnSale={product.is_promotion}
            isUsed={product.is_used}
            originalPrice={product.original_price}
            onClick={() => handleProductClick(product)}
            photos={product.photos}
          />
        ))}
      </div>
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
};

export default Products;
