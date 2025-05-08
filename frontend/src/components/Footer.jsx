import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Kesavan Exports. All rights reserved.</p>
        <p>Made with ❤️ for textiles.</p>
      </div>
    </footer>
  );
};

export default Footer;
