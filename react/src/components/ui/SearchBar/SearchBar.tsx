import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <input
      placeholder="Search Bar"
      autoComplete="off"
      className={styles.searchbar}
      type="search"
      id="site-search"
      name="q"
    ></input>
  );
};

export default SearchBar;
