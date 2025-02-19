import React from "react";
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>ABOUT</h4>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Flipkart Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>GROUP COMPANIES</h4>
          <ul>
            <li>Myntra</li>
            <li>Cleartrip</li>
            <li>Shopsy</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>HELP</h4>
          <ul>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>CONSUMER POLICY</h4>
          <ul>
            <li>Mail Us</li>
            <li>Cancellation & Returns</li>
            <li>Terms of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
            <li>Grievance Redressal</li>
            <li>EPR Compliance</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>CONTACT</h4>
          <p>📍 Flipkart Internet Private Limited,</p>
          <p>Buildings Alyssa, Begonia & Clove Embassy Tech Village,</p>
          <p>Outer Ring Road, Devarabeesanahalli Village,</p>
          <p>Bengaluru, 560103, Karnataka, India</p>
          <p>☎ Telephone: 044-45614700 / 044-67415800</p>
        </div>

        <div className="footer-section">
          <h4>SOCIAL</h4>
          <p>Follow us on: Facebook | Twitter | Instagram</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2007-2025 ShopifyWebsite.com</p>
        <p>Become a Seller | Advertise | Gift Cards | Help Center</p>
      </div>
    </footer>
  );
};

export default Footer;
