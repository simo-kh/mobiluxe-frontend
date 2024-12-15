import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './hero.css';

const images = [
  // "https://demo-61.woovinapro.com/wp-content/uploads/2022/04/slider1.jpg",
  // "https://demo-61.woovinapro.com/wp-content/uploads/2022/04/slider2.jpg"
  "https://amanto-store-demo.myshopify.com/cdn/shop/files/section-slideshow-v2.jpg?v=1614297690",
  "https://amanto-store-demo.myshopify.com/cdn/shop/files/section-slideshow-v2-img3.jpg?v=1614297689"
];


const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleShopNowClick = () => {
    navigate('/shop');
  };

  return (
    <div 
      className="section-container" 
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="text-block">
        <p className="subtitle">Bienvenue chez Mobiluxe</p>
        <h1 className="main-headline">Votre destination pour les appareils mobiles premium</h1>
        <div className="button-container">
          <button className="cta-button" onClick={handleShopNowClick}>Achetez Maintenant</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
