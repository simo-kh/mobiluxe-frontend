import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-title">À Propos de Nous</h1>
      <div className="about-us-content">
        <p>
          Bienvenue chez 🍏Mobiluxe Store🍏! Nous sommes votre destination de confiance pour des produits mobiles de haute qualité et des services exceptionnels. Engagés dans l'excellence, nous offrons une large gamme de produits authentiques, fiables et à des prix compétitifs.
        </p>

        <h2 className="about-us-subtitle">Nos Services</h2>
        <p>
          <strong>Vente :</strong> Nous proposons une grande variété de téléphones, accessoires et produits de gaming de haute qualité. Que vous recherchiez le dernier modèle de smartphone ou des accessoires pour améliorer votre expérience de jeu, nous avons tout ce qu'il vous faut.
        </p>
        <p>
          <strong>Réparation :</strong> Nos techniciens qualifiés sont équipés pour gérer divers besoins de réparation de téléphones, garantissant que votre appareil vous soit rendu rapidement et en parfait état de marche.
        </p>

        <h2 className="about-us-subtitle">Pourquoi Choisir 🍏Mobiluxe Store🍏?</h2>
        <ul className="about-us-list">
          <li>Authenticité Garantie : Profitez de produits certifiés originaux.</li>
          <li>Fiabilité et Sécurité : Achetez en toute confiance.</li>
          <li>Rapport Qualité-Prix Inégalé : Obtenez le meilleur pour votre argent.</li>
          <li>Support Technique 7/7 : Nous sommes toujours disponibles pour vous.</li>
          <li>Paiement à la Livraison : Commode et sécurisé.</li>
          <li>Remboursement Intégral : Aucun risque, satisfaction garantie.</li>
        </ul>
        <p>
          Faites confiance à 🍏Mobiluxe Store🍏 pour tous vos besoins mobiles !
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
