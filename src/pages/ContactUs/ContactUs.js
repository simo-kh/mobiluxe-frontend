import React from 'react';
import Map from '../../components/Map/Map';

import './contactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h2 className="contact-us-title">APPELEZ-NOUS OU VISITEZ-NOUS</h2>
      <div className="contact-us-details">
        <div className="contact-us-item">
          <h3>ADRESSE</h3>
          <p>Kissariat nour entrée 4 en face de rihana, Fès</p>
        </div>
        <div className="contact-us-item">
          <h3>EMAIL</h3>
          <p>mobiluxe95@gmail.com</p>
        </div>
        <div className="contact-us-item">
          <h3>TÉLÉPHONE</h3>
          <p>+212 707729431</p>
        </div>
        <div className="contact-us-item">
          <h3>HEURES D'OUVERTURE</h3>
          <p>Lun - Ven : 9h - 23h</p>
        </div>
      </div>
      <div className="contact-us-map">
        <Map />
      </div>
    </div>
  );
};

export default ContactUs;
