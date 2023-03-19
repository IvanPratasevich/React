import Navigation from '../navigation/Navigation';
import React from 'react';
import styles from './Header.module.css';
import SearchBar from '../ui/SearchBar/SearchBar';

const Header = () => {
  return (
    <header className={styles.header}>
      <Navigation />
      <SearchBar />
    </header>
  );
};

export default Header;
