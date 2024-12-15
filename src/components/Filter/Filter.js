import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getAttributes } from '../Api/api';
import './Filter.css';

const Filter = ({ categoryId, subcategoryId, onFilterChange }) => {
  const [attributes, setAttributes] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [priceRange, setPriceRange] = useState([0, 5000]);

  useEffect(() => {
    const fetchAttributes = async () => {
      if (categoryId || subcategoryId) {
        const response = await getAttributes(categoryId, subcategoryId);
        setAttributes(response.data);
        setSelectedFilters(response.data.reduce((acc, attr) => {
          acc[attr.name] = [];
          return acc;
        }, {}));
      }
    };
    fetchAttributes();
  }, [categoryId, subcategoryId]);

  const handleCheckboxChange = (attributeName, value) => {
    setSelectedFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (!newFilters[attributeName]) {
        newFilters[attributeName] = [];
      }
      if (newFilters[attributeName].includes(value)) {
        newFilters[attributeName] = newFilters[attributeName].filter(v => v !== value);
      } else {
        newFilters[attributeName].push(value);
      }
      return newFilters;
    });
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  useEffect(() => {
    onFilterChange(selectedFilters, priceRange);
  }, [selectedFilters, priceRange, onFilterChange]);

  return (
    <div className="filter-container">
      <h3>Filtrer les Produits</h3>
      <div className="price-filter">
        <h4>Plage de Prix</h4>
        <Slider
          range
          min={0}
          max={5000}
          value={priceRange}
          onChange={handlePriceChange}
        />
        <div>Prix: {priceRange[0]} - {priceRange[1]}</div>
      </div>
      {attributes.map(attr => (
        <div key={attr.id} className="attribute-filter">
          <h4>{attr.name}</h4>
          {attr.options.map(option => (
            <div key={option}>
              <input
                type="checkbox"
                id={`${attr.name}-${option}`}
                name={attr.name}
                value={option}
                onChange={() => handleCheckboxChange(attr.name, option)}
              />
              <label htmlFor={`${attr.name}-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <div className="attribute-filter">
        <h4>Promotion</h4>
        <div>
          <input
            type="checkbox"
            id="is_promotion"
            name="is_promotion"
            value="true"
            onChange={() => handleCheckboxChange("is_promotion", "true")}
          />
          <label htmlFor="is_promotion">En Promotion</label>
        </div>
      </div>
      <div className="attribute-filter">
        <h4>Condition</h4>
        <div>
          <input
            type="checkbox"
            id="is_used"
            name="is_used"
            value="true"
            onChange={() => handleCheckboxChange("is_used", "true")}
          />
          <label htmlFor="is_used">D'occasion</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="is_new"
            name="is_new"
            value="false"
            onChange={() => handleCheckboxChange("is_used", "false")}
          />
          <label htmlFor="is_new">Neuf</label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
