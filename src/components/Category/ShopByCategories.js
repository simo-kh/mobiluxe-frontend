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

  const calculateCardWidth = () => {
    const card = containerRef.current?.querySelector('.category-card');
    const cards = containerRef.current?.querySelector('.category-cards');
    if (!card) return 0;
    const style = getComputedStyle(cards);

    return card.offsetWidth +  parseInt(style.gap, 10); // 25 is the gap between cards
  };

  const handleArrowClick = (direction) => {
    const cardWidth = calculateCardWidth();
    const visibleWidth = containerRef.current?.offsetWidth || 0;
    const itemsVisible = Math.floor(visibleWidth / cardWidth);

    if (!cardWidth || itemsVisible === 0) return; // Exit if no valid width or items visible

    const totalItems = categories.length;
    const itemsToMove = 1; // Move by exactly one card

    const newIndex =
      direction === 'left'
        ? currentIndex - itemsToMove
        : currentIndex + itemsToMove;

    setCurrentIndex(newIndex);
  };

  const calculateTransform = () => {
    const cardWidth = calculateCardWidth();
    const totalItems = categories.length;

    if (totalItems === 0 || !cardWidth) return 0;

    // Calculate the shift
    return -(currentIndex * cardWidth);
  };

  useEffect(() => {
    // Reset index for seamless looping
    const totalItems = categories.length;
    if (currentIndex < 0) {
      setTimeout(() => setCurrentIndex(totalItems - 1), 0);
    } else if (currentIndex >= totalItems) {
      setTimeout(() => setCurrentIndex(0), 0);
    }
  }, [currentIndex, categories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.remove('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = containerRef.current?.querySelectorAll('.category-card');
    if (cards) {
      cards.forEach((card) => observer.observe(card));
    }

    return () => {
      if (cards) {
        cards.forEach((card) => observer.unobserve(card));
      }
    };
  }, [categories]);

  return (
    <div className="shop-by-categories-section">
      <div className="section-header">
        <h2 className="section-title">ACHETEZ PAR CATÉGORIES</h2>
      </div>
      <div
        className="navigation-arrows left-arrow"
        onClick={() => handleArrowClick('left')}
      >
        &#9664;
      </div>
      <div className="category-cards-wrapper" ref={containerRef}>
        <div
          className="category-cards"
          style={{
            transform: `translateX(${calculateTransform()}px)`,
            transition: 'transform 0.5s ease',
          }}
        >
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
      <div
        className="navigation-arrows right-arrow"
        onClick={() => handleArrowClick('right')}
      >
        &#9654;
      </div>
    </div>
  );
};

export default ShopByCategories;
