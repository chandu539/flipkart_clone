import React from "react";
import "../Styles/Home.css";
import Navbar from "../Components/Navbar";
import ImageSlider from "../Components/ImageSlider";
import FeaturedProducts from "../Components/FeaturedProducts";
import Categories from "../Components/Categories"; 
import TopDeals from "../Components/TopDeals";
import CategoryHighlight from "../Components/CategoryHighlight";
import FurnitureDeals from "../Components/FurnituteDeals";
import FashionTopDeals from "../Components/FashionTopDeals";
import ProductGrid from "../Components/ProductGrid";
import Footer from "../Components/Footer";



const Home = () => {
  return (
    <div>
      <Navbar/>
      <Categories />  
      <ImageSlider/>
      <FeaturedProducts/>
      <TopDeals/>
      <div>
        <CategoryHighlight 
          image="/electronics-banner.jpg"
          title="Latest Electronics"
          description="Find the best gadgets, mobiles, and accessories with up to 50% OFF."
          link="/headphones"
        />

        <CategoryHighlight 
          image="/fashion-banner.jpg"
          title="Trendy Fashion"
          description="Upgrade your wardrobe with the latest fashion collections!"
          link="/womenswear"
        />

        <CategoryHighlight 
          image="/home-decor-banner.jpg"
          title="Home & Kitchen Essentials"
          description="Redecorate your home with stylish furniture and kitchen accessories."
          link="/chairs"
        />
      </div>
      <FurnitureDeals/>
      <ProductGrid/>
      <FashionTopDeals/>
      <Footer/>
      
      
      
    </div>
  );
};

export default Home;
