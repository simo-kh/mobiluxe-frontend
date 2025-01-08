import axios from 'axios';

const getApiUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  } else {
    return `http://192.168.100.233:5000`;
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

// export const getCategories = async () => {
//   // Simulate an API call with a short delay
//   return new Promise((resolve) => {
//     const randomCategories = [];
//     for (let i = 0; i < 3; i++) {
//       randomCategories.push({
//         id: i + 1,
//         name: `Category ${i + 1}`,
//         image: `https://via.placeholder.com/150?text=Category+${i + 1}`, // Placeholder image
//       });
//     }
//     setTimeout(() => resolve({ data: randomCategories }), 500); // Simulate network delay
//   });
// };

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


export const getFilteredProducts = async (id, filters, priceRange, isSubcategory = false) => {
  const params = {
    filters: JSON.stringify(filters), // Serialize filters
    price_min: priceRange[0], // Minimum price
    price_max: priceRange[1], // Maximum price
  };

  // Determine if the request is for a category or a subcategory
  if (isSubcategory) {
    params.subcategory_id = id; // Use subcategory ID
  } else {
    params.category_id = id; // Use category ID
  }

  try {
    const response = await axios.get(`${API_URL}/products`, { params });
    return response; // Return API response
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    throw error; // Re-throw error to be handled by the caller
  }
};
