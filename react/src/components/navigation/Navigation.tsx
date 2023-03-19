import React from 'react';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <ul className={styles.nav}>
      <li className={`${styles.nav__el} ${styles.nav__el_active}`}>
        <a>Home</a>
      </li>
      <li className={styles.nav__el}>
        <a>About us</a>
      </li>
    </ul>
  );
};

export default Navigation;
