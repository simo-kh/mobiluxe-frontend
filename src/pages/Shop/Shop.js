import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Categories from '../../components/CategoriesComponent/Categories';
import Products from '../../components/Products/Products';
import { getCategories, getFilteredProducts, getProducts } from '../../components/Api/api';
import './Shop.css';

const Shop = () => {
  const [categories, setCategories] = useState([]); // List of categories
  const [products, setProducts] = useState([]); // List of products
  const [selectedCategory, setSelectedCategory] = useState(null); // Currently selected category
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Currently selected subcategory
  const [showCategories, setShowCategories] = useState(false); // State to toggle category visibility
  const [filters, setFilters] = useState({}); // Active filters
  const [priceRange, setPriceRange] = useState([0, 20000]); // Active price range

  const location = useLocation(); // Access the current URL
  const navigate = useNavigate(); // For programmatic navigation
  const searchParams = new URLSearchParams(location.search);
  const categoryFromQuery = searchParams.get('category'); // Get the category ID from query params

  useEffect(() => {
    window.scrollTo(0, 60);


  })

  // Fetch categories and set the initial state
  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when the category query changes or category/subcategory selection updates
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (categoryFromQuery) {
          // Fetch products for the category from query params
          const response = await getFilteredProducts(categoryFromQuery, filters, priceRange, false);
          setProducts(response.data);
          setSelectedCategory(categoryFromQuery); // Update the selected category
        } else if (selectedSubcategory) {
          // Fetch products for the selected subcategory
          const response = await getFilteredProducts(selectedSubcategory, filters, priceRange, true);
          setProducts(response.data);
        } else if (selectedCategory) {
          // Fetch products for the selected category
          const response = await getFilteredProducts(selectedCategory, filters, priceRange, false);
          setProducts(response.data);
        } else {
          // Fetch all products
          const response = await getProducts();
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryFromQuery, selectedCategory, selectedSubcategory, filters, priceRange]);

  // Handle category click
  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category.id}`); // Update the URL with the selected category
    setSelectedCategory(category.id); // Update the selected category
    setSelectedSubcategory(null); // Reset the subcategory
    setShowCategories(false); // Hide categories on selection
  };

  // Handle subcategory click
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory.id); // Update the selected subcategory
    setShowCategories(false); // Hide categories on selection
  };

  // Toggle categories visibility
  const toggleCategories = () => {
    setShowCategories((prev) => !prev); // Toggle show/hide state
  };

  // Close categories when clicking outside
  const handleCloseCategories = () => {
    setShowCategories(false); // Close the menu
  };

  return (
    <div className="shop-page">
      {/* Overlay for click-detection */}
      {showCategories && <div className="overlay" onClick={handleCloseCategories}></div>}

      <div className={`categories-wrapper ${showCategories ? 'show' : ''}`}>
        <Categories
          categories={categories}
          onCategoryClick={handleCategoryClick}
          onSubcategoryClick={handleSubcategoryClick}
        />
        <button className="close-btn" onClick={toggleCategories}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="products-wrapper">
        {/* Filter Button */}
        <button className="filter-btn" onClick={toggleCategories}>
          <i className="fas fa-filter"></i>
        </button>
        <Products products={products} />
      </div>
    </div>
  );
};

export default Shop;
