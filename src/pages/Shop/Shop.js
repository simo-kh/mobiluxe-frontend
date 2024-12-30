import React, { useState, useEffect } from 'react';
import Categories from '../../components/CategoriesComponent/Categories';
import Products from '../../components/Products/Products';
import { getCategories, getFilteredProducts, getProducts } from '../../components/Api/api';
import './Shop.css';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [showCategories, setShowCategories] = useState(false); // State to toggle category visibility

    // Fetch categories and all products on initial load
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(response.data);
        };

        const fetchAllProducts = async () => {
            const response = await getProducts(); // Fetch all products
            setProducts(response.data);
        };

        fetchCategories();
        fetchAllProducts();
    }, []);

    // Fetch products when category or subcategory changes
    useEffect(() => {
        const fetchProducts = async () => {
            if (selectedSubcategory) {
                const response = await getFilteredProducts(selectedSubcategory, {}, [0, 20000], true);
                setProducts(response.data);
            } else if (selectedCategory) {
                const response = await getFilteredProducts(selectedCategory, {}, [0, 20000], false);
                setProducts(response.data);
            } else {
                const response = await getProducts();
                setProducts(response.data);
            }
        };

        fetchProducts();
    }, [selectedCategory, selectedSubcategory]);

    // Handle category click
    const handleCategoryClick = (category) => {
        setSelectedCategory(category.id);
        setSelectedSubcategory(null); // Reset subcategory when a new category is selected
        setShowCategories(false); // Hide categories on category selection
    };

    // Handle subcategory click
    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory.id);
        setShowCategories(false); // Hide categories on subcategory selection
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
                <button className="filter-btn" onClick={toggleCategories}>
                    <i className="fas fa-filter"></i>
                </button>
                <Products products={products} />
            </div>
        </div>
    );
};

export default Shop;
