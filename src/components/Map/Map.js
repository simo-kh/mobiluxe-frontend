import React from 'react';
import './map.css';

const Map = () => {
  return (
    <>
      <h2 id="map">Notre Localisation</h2>
      <div className="map-container">
        <iframe
          title="Store Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255.9892530562897!2d-5.010418826448531!3d34.022701461928584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b68af1c2383%3A0x8b0be71a59df3e5e!2sKissariat%20Nour!5e0!3m2!1sfr!2sma!4v1718036819826!5m2!1sfr!2sma"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
};

export default Map;
