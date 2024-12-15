import React, { useState, useEffect, useRef } from 'react';
import CategoryCard from './CategoryCard';
import './ShopByCategories.css';
import { getCategories } from '../../components/Api/api';

const ShopByCategories = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

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

  const handleArrowClick = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.remove('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = containerRef.current.querySelectorAll('.category-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, [categories]);

  return (
    <div className="shop-by-categories-section">
      <div className="section-header">
        <h2 className="section-title">ACHETEZ PAR CATÉGORIES</h2>
      </div>
      <div className="navigation-arrows left-arrow" onClick={() => handleArrowClick('left')}>&#9664;</div>
      <div className="category-cards-wrapper" ref={containerRef}>
        <div className="category-cards" style={{ transform: `translateX(-${currentIndex * 280}px)` }}>
          {categories.concat(categories).map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
      <div className="navigation-arrows right-arrow" onClick={() => handleArrowClick('right')}>&#9654;</div>
      <div className="dots-navigation">
        {Array.from({ length: categories.length }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex % categories.length ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategories;
