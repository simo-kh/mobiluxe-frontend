import axios from 'axios';

const getApiUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  } else {
    return `http://${window.location.hostname}:5000`;
  }
};

const API_URL = getApiUrl();

export const getProductsByCategory = async (categoryId, subcategoryId = null) => {
  const params = { category_id: categoryId };
  if (subcategoryId) {
    params.subcategory_id = subcategoryId;
  }
  return await axios.get(`${API_URL}/products`, { params });
};

export const getProducts = async () => {
  return await axios.get(`${API_URL}/products`);
};

export const getCategories = async () => {
  return await axios.get(`${API_URL}/categories`);
};

export const getSubcategories = async (categoryId) => {
  return axios.get(`${API_URL}/subcategories?category_id=${categoryId}`);
};

export const getAttributes = async (categoryId, subcategoryId) => {
  const params = new URLSearchParams();
  if (categoryId) params.append('category_id', categoryId);
  if (subcategoryId) params.append('subcategory_id', subcategoryId);

  const response = await axios.get(`${API_URL}/attributes?${params.toString()}`);
  return response;
};


export const getFilteredProducts = async (subcategoryId, filters, priceRange) => {
  return axios.get(`${API_URL}/products`, {
    params: {
      subcategory_id: subcategoryId,
      filters: JSON.stringify(filters),
      price_min: priceRange[0],
      price_max: priceRange[1]
    }
  });
};
