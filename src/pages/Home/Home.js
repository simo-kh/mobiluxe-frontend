import React from 'react';
import Hero from '../../components/Hero/Hero';
import TopProducts from '../../components/Products/TopProducts/TopProducts';
import ShopByCategories from '../../components/Category/ShopByCategories';

const Home = () => {
  return (
    <div>
      <Hero />
      <TopProducts />
      <ShopByCategories />
    </div>
  );
};

export default Home;
