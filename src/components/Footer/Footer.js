import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <div className="footer-logo">
          
          <img src="images/mobiluxe_store2.png" alt="Mobiluxe Logo" className="logo-image" />
          <p>© 2024 Mobiluxe. Tous droits réservés</p>
        </div>
      </div>
      <div className="footer-column">
        <h3>Contactez-nous</h3>
        <p><i className="fas fa-envelope"></i> mobiluxe95@gmail.com</p>
        <p><i className="fas fa-map-marker-alt"></i> Kissariat nour entrée 4 en face de rihana, Fes</p>
        <p><i className="fas fa-phone"></i> +212 707729431</p>
      </div>
      <div className="footer-column">
        <h3>Suivez-nous</h3>
        <div className='social-media'>
          <p><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a></p>
          <p><a href="https://www.instagram.com/mobiluxe_store/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></p>
          <p><a href="https://www.tiktok.com/@mobiluxe_store" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a></p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
