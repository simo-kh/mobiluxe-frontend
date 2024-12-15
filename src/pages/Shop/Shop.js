import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Categories from '../../components/CategoriesComponent/Categories';
import Products from '../../components/Products/Products';
import { getCategories, getFilteredProducts } from '../../components/Api/api';
import './Shop.css';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(response.data);
            if (response.data.length > 0) {
                const categoryFromUrl = new URLSearchParams(location.search).get('category');
                setSelectedCategory(categoryFromUrl || response.data[0].id); // Use URL category or first category
            }
        };
        fetchCategories();
    }, [location.search]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (selectedCategory) {
                const response = await getFilteredProducts(selectedCategory, {}, [0, 5000]);
                setProducts(response.data);
            }
        };
        fetchProducts();
    }, [selectedCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category.id);
        setSelectedSubcategory(null); // Reset subcategory when a new category is selected
        setShowCategories(false); // Hide categories on category selection for small screens
    };

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory.id);
        setShowCategories(false); // Hide categories on subcategory selection for small screens
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const onProductsUpdate = (updatedProducts) => {
        setProducts(updatedProducts);
    };

    return (
        <div className="shop-page">
            <div className={`categories-wrapper ${showCategories ? 'show' : ''}`}>
                <Categories
                    categories={categories}
                    onCategoryClick={handleCategoryClick}
                    onSubcategoryClick={handleSubcategoryClick}
                    onProductsUpdate={onProductsUpdate} // Pass the handler here
                />
                <button className="close-btn" onClick={toggleCategories}><i className="fas fa-times"></i></button>
            </div>
            <div className="products-wrapper">
                <button className="filter-btn" onClick={toggleCategories}><i className="fas fa-filter"></i></button>
                <Products products={products} />
            </div>
        </div>
    );
};

export default Shop;
