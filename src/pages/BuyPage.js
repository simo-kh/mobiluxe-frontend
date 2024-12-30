import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './buyPage.css';

const BuyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    buyerName: '',
    buyerPhone: '',
    buyerAddress: '',
    buyerCity: '',
  });

  const [errors, setErrors] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState(null); // New state for confirmation message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when input changes
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.buyerName.trim()) newErrors.buyerName = 'Nom complet requis';
    if (!formData.buyerPhone.trim()) newErrors.buyerPhone = 'Numéro de téléphone requis';
    if (!formData.buyerAddress.trim()) newErrors.buyerAddress = 'Adresse complète requise';
    if (!formData.buyerCity.trim()) newErrors.buyerCity = 'Ville requise';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async () => {
    setConfirmationMessage(null); // Clear previous confirmation message

    if (!validateForm()) return;

    const orderData = {
      productId: product.name,
      ...formData,
      price: product.price + 35,
    };

    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setConfirmationMessage('Commande passée avec succès !'); // Set success message
      } else {
        setConfirmationMessage('Erreur lors de la commande.'); // Set error message
      }
    } catch (error) {
      console.error('Erreur:', error);
      setConfirmationMessage('Une erreur est survenue. Réessayez plus tard.'); // Handle fetch errors
    }
  };

  if (confirmationMessage) {
    return (
      <div className="confirmation-page">
        <h2>Confirmation de commande</h2>
        <p className="confirmation-message">{confirmationMessage}</p>
        <button className="back-button" onClick={() => navigate('/')}>
          Revenir à la page d'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="buy-page-container">
      <div className="order-summary">
        {product && (
          <>
            <h2>Votre commande</h2>
            <div className="product-item">
              <img src={product.main_photo} alt={product.name} />
              <div>
                <h4>{product.name}</h4>
                <p>{product.price} MAD</p>
              </div>
            </div>
            <div className="price-details">
              <p>Liste des prix: <span>{product.price} MAD</span></p>
              <p>Frais de livraison: <span>40 MAD</span></p>
              <hr />
              <p className="total-price">Prix total: <span>{parseFloat(product.price) + 40} MAD</span></p>
            </div>
          </>
        )}
      </div>

      <div className="form-section">
        <h2>Informations client</h2>
        <div className="form-grid">
          <div>
            <input
              type="text"
              name="buyerName"
              placeholder="Nom Complet"
              value={formData.buyerName}
              onChange={handleChange}
            />
            {errors.buyerName && <p className="error">{errors.buyerName}</p>}
          </div>

          <div>
            <input
              type="text"
              name="buyerPhone"
              placeholder="Numéro de Téléphone"
              value={formData.buyerPhone}
              onChange={handleChange}
            />
            {errors.buyerPhone && <p className="error">{errors.buyerPhone}</p>}
          </div>

          <div>
            <input
              type="text"
              name="buyerCity"
              placeholder="Ville"
              value={formData.buyerCity}
              onChange={handleChange}
            />
            {errors.buyerCity && <p className="error">{errors.buyerCity}</p>}
          </div>

          <div>
            <input
              type="text"
              name="buyerAddress"
              placeholder="Adresse Complète"
              value={formData.buyerAddress}
              onChange={handleChange}
            />
            {errors.buyerAddress && <p className="error">{errors.buyerAddress}</p>}
          </div>
        </div>
        <button className="submit-button" onClick={handleSubmitOrder}>
          Poursuivre au mode de livraison
        </button>
      </div>
    </div>
  );
};

export default BuyPage;
