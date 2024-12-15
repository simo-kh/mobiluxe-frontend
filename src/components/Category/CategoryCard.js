import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop?category=${category.id}`);
  };

  const imageUrl = category.image ? `${category.image.replace(/\\/g, '/')}` : 'https://scontent-cdg4-3.cdninstagram.com/v/t51.2885-19/444503560_1682025305905415_9216673548248353259_n.jpg?_nc_ht=scontent-cdg4-3.cdninstagram.com&_nc_cat=111&_nc_ohc=uV4pgT7pOG0Q7kNvgFkQdHl&edm=AEhyXUkBAAAA&ccb=7-5&oh=00_AYABDMLVmmHZc7JeYs1Y42oFUUsypbsB8T-rGX07EAX8Ug&oe=668512B2&_nc_sid=8f1549'; // Replace 'default-image-url.jpg' with your default image

  return (
    <div className="category-card" onClick={handleClick}>
      <img src={imageUrl} alt="Category" className="category-image" />
      <h3 className="category-title">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
