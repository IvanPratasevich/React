import Navigation from '../navigation/Navigation';
import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
};

export default Header;
