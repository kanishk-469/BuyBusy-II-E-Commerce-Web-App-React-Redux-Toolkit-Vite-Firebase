import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <h2 className={styles.logo}>🛍️ BuyBusy</h2>
          <p>
            A modern e-commerce platform built with React, Redux Toolkit,
            Firebase, and React Router.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.linkSection}>
          <h3>Quick Links</h3>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/cart">Cart</Link>
            </li>

            <li>
              <Link to="/signin">Login</Link>
            </li>

            <li>
              <Link to="/signup">Register</Link>
            </li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className={styles.techSection}>
          <h3>Built With</h3>

          <ul>
            <li>React.js</li>
            <li>Redux Toolkit</li>
            <li>Firebase</li>
            <li>React Router</li>
            <li>CSS Modules</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        © {year} BuyBusy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
