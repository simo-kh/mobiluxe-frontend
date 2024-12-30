import React, { useState, useEffect } from 'react';
import './Categories.css';
import { getSubcategories, getFilteredProducts } from '../../components/Api/api';
import Filter from '../Filter/Filter';

const Categories = ({ categories, onCategoryClick, onSubcategoryClick, onProductsUpdate }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({});
  const [priceRange, setPriceRange] = useState([0, 20000]);

  // Fetch subcategories when a category is expanded
  useEffect(() => {
    if (expandedCategory) {
      fetchSubcategories(expandedCategory);
    }
  }, [expandedCategory]);

  // Fetch products when selectedCategory changes
  useEffect(() => {
    if (selectedCategory && !selectedSubcategory) {
      // Fetch all products for the selected category
      fetchProductsForCategory(selectedCategory);
    }
  }, [selectedCategory, filters, priceRange]);

  // Fetch products when selectedSubcategory changes
  useEffect(() => {
    if (selectedSubcategory) {
      // Fetch all products for the selected subcategory
      fetchProductsForSubcategory(selectedSubcategory);
    }
  }, [selectedSubcategory, filters, priceRange]);

  // Fetch subcategories for a category
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await getSubcategories(categoryId);
      setSubcategories((prevSubcategories) => ({
        ...prevSubcategories,
        [categoryId]: response.data.filter(subcategory => subcategory.category_id === categoryId),
      }));
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // Fetch products for a category
  const fetchProductsForCategory = async (categoryId) => {
    try {
      const response = await getFilteredProducts(categoryId, filters, priceRange, false); // false = category
      onProductsUpdate(response.data); // Notify parent with updated products
    } catch (error) {
      console.error('Error fetching products for category:', error);
    }
  };

  // Fetch products for a subcategory
  const fetchProductsForSubcategory = async (subcategoryId) => {
    try {
      const response = await getFilteredProducts(subcategoryId, filters, priceRange, true); // true = subcategory
      onProductsUpdate(response.data); // Notify parent with updated products
    } catch (error) {
      console.error('Error fetching products for subcategory:', error);
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id);
    setSelectedSubcategory(null); // Reset subcategory when a new category is selected
    setExpandedCategory(category.id === expandedCategory ? null : category.id); // Toggle expanded state
    onCategoryClick(category); // Notify parent about the category click
  };

  // Handle subcategory click
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory.id); // Set selected subcategory
    onSubcategoryClick(subcategory); // Notify parent about the subcategory click
  };

  // Handle filter changes
  const handleFilterChange = (newFilters, newPriceRange) => {
    setFilters(newFilters); // Update filters
    setPriceRange(newPriceRange); // Update price range
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
        <Filter
          categoryId={selectedCategory}
          subcategoryId={selectedSubcategory}
          onFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
};

export default Categories;
