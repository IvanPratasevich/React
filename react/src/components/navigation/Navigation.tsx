import React from 'react';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <ul className={styles.nav}>
      <a href="/" data-testid="home">
        <li className={`${styles.nav__el} ${styles.nav__el_active}`}>Home</li>
      </a>
      <a href="/about-us" data-testid="about-us">
        <li className={styles.nav__el}>About us</li>
      </a>
    </ul>
  );
};

export default Navigation;
