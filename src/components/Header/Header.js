  import React, { useState, useEffect } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import './header.css';

  const Header = () => {
    const location = useLocation();
    const [selectedPage, setSelectedPage] = useState(location.pathname);
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
      setSelectedPage(location.pathname);
    }, [location]);

    const handleNavClick = (page) => {
      setSelectedPage(page);
      setMenuActive(false); // Close menu on item click
    };

    const toggleMenu = () => {
      setMenuActive(!menuActive);
    };

    return (
      <header className="header-container">
        <div className="logo">
          <a href="/"><img src="images/mobiluxe_store2.png" alt="Mobiluxe Logo" /></a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <i className={`fas ${menuActive ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
        <nav className={`navigation-menu ${menuActive ? 'active' : ''}`}>
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => handleNavClick('/')}
                className={selectedPage === '/' ? 'selected' : ''}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                onClick={() => handleNavClick('/shop')}
                className={selectedPage === '/shop' ? 'selected' : ''}
              >
                Boutique
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                onClick={() => handleNavClick('/about-us')}
                className={selectedPage === '/about-us' ? 'selected' : ''}
              >
                À Propos
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                onClick={() => handleNavClick('/contact-us')}
                className={selectedPage === '/contact-us' ? 'selected' : ''}
              >
                Contactez-nous
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  };

  export default Header;
