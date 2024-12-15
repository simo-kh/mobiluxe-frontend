import React, { useState, useEffect } from 'react';
import './Categories.css';
import { getSubcategories, getAttributes, getFilteredProducts } from '../../components/Api/api';
import Filter from '../Filter/Filter';

const Categories = ({ categories, onCategoryClick, onSubcategoryClick, onProductsUpdate }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({});
  const [priceRange, setPriceRange] = useState([0, 5000]);

  useEffect(() => {
    if (expandedCategory) {
      fetchSubcategories(expandedCategory);
    }
  }, [expandedCategory]);

  useEffect(() => {
    if (selectedSubcategory) {
      applyFilters(selectedSubcategory);
    }
  }, [filters, priceRange, selectedSubcategory]);

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await getSubcategories(categoryId);
      setSubcategories((prevSubcategories) => ({
        ...prevSubcategories,
        [categoryId]: response.data.filter(subcategory => subcategory.category_id === categoryId)
      }));
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleCategoryClick = (category) => {
    if (expandedCategory === category.id) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category.id);
      setSelectedCategory(category.id);
      onCategoryClick(category);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory.id);
    onSubcategoryClick(subcategory);
  };

  const handleFilterChange = (newFilters, newPriceRange) => {
    setFilters(newFilters);
    setPriceRange(newPriceRange);
  };

  const applyFilters = async (subcategoryId) => {
    try {
      const response = await getFilteredProducts(subcategoryId, filters, priceRange);
      onProductsUpdate(response.data); // Update products in the parent component
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  };

  return (
    <div className="categories-container">
      <h2 className="categories-title">Catégories</h2>
      <ul className="categories-list">
        {categories.map((category) => (
          <li key={category.id} className="category-item">
            <div className="category-header" onClick={() => handleCategoryClick(category)}>
              {category.name}
              <span className={`arrow ${expandedCategory === category.id ? 'down' : 'right'}`}></span>
            </div>
            {expandedCategory === category.id && subcategories[category.id] && (
              <ul className="subcategories-list">
                {subcategories[category.id].map((subcategory) => (
                  <li
                    key={subcategory.id}
                    className={`subcategory-item ${selectedSubcategory === subcategory.id ? 'selected' : ''}`}
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    {subcategory.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {selectedSubcategory && (
        <Filter categoryId={selectedCategory} subcategoryId={selectedSubcategory} onFilterChange={handleFilterChange} />
      )}
    </div>
  );
};

export default Categories;
