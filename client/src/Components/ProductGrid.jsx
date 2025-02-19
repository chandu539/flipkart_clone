import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/ProductGrid.css";

const productCategories = [
  {
    title: "Trending Gadgets",
    products: [
      { id: 1, name: "Smartphone", discount: "Min 50% OFF", image: "/smartphone.jpg", type: "high", page: "/mobiles" },
      { id: 2, name: "Headphones", discount: "Min 40% OFF", image: "/headphones.jpg", type: "low", page: "/headphones" },
      { id: 3, name: "Smartwatch", discount: "Min 50% OFF", image: "/smartwatch.jpg", type: "high", page: "/watches" },
      { id: 4, name: "Tablet", discount: "Min 40% OFF", image: "/tablet.jpg", type: "low", page: "/mobiles" },
    ],
  },
  {
    title: "Home Essentials",
    products: [
      { id: 5, name: "Sofa Set", discount: "Min 50% OFF", image: "/sofa.jpg", type: "high", page: "/sofas" },
      { id: 6, name: "Dining Table", discount: "Min 40% OFF", image: "/table.jpg", type: "low", page: "/chairs" },
      { id: 7, name: "Bedsheet", discount: "Min 50% OFF", image: "/bedsheet.jpg", type: "high", page: "/beds" },
      { id: 8, name: "Curtains", discount: "Min 40% OFF", image: "/curtains.jpg", type: "low", page: "/beds" },
    ],
  },
  {
    title: "Fashion Picks",
    products: [
      { id: 9, name: "Men’s Jacket", discount: "Min 50% OFF", image: "/jacket.jpg", type: "high", page: "/menswear" },
      { id: 10, name: "Women’s Dress", discount: "Min 40% OFF", image: "/dress.jpg", type: "low", page: "/womenswear" },
      { id: 11, name: "Sports Shoes", discount: "Min 50% OFF", image: "/shoes.jpg", type: "high", page: "/sports" },
      { id: 12, name: "Handbag", discount: "Min 40% OFF", image: "/handbag.jpg", type: "low", page: "/womenswear" },
    ],
  },
];

const ProductGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="product-grid-container">
      {productCategories.map((category, index) => (
        <div key={index} className="product-grid-box">
          <h3 className="box-title">{category.title}</h3>
          <div className="grid-container">
            {category.products.map((product) => (
              <div
                key={product.id}
                className="product-grid-card"
                onClick={() => navigate(product.page)}
                style={{ cursor: "pointer" }}
              >
                <img src={product.image} alt={product.name} />
                <p className="product-grid-name">{product.name}</p>
                <span className={`discount-label ${product.type === "high" ? "high-discount" : "low-discount"}`}>
                  {product.discount}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;