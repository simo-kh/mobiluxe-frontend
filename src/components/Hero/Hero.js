import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './hero.css';

// Separate images for web and mobile
const webImage =  "images/simo_mobiluxe4.jpg";
const mobileImage =  "images/simo_mobiluxe.jpg";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect screen size and update `isMobile`
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    // Initialize screen size
    updateScreenSize();

    // Add event listener for screen resizing
    // Cleanup event listener
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const handleShopNowClick = () => {
    navigate('/shop');
  };

  // Choose the image based on screen size
  const backgroundImage = isMobile ? mobileImage : webImage;

  return (
    <div 
      className="section-container" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
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
