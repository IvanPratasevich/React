import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import { saveToLocalStore } from '../../../utils/utils';

const SearchBar = () => {
  const storageInputValue: string = localStorage.getItem('inputValue')
    ? JSON.parse(localStorage.getItem('inputValue')!)
    : '';

  const [inputValue, setState] = useState(storageInputValue);

  useEffect(() => {
    saveToLocalStore(inputValue);
    window.addEventListener('beforeunload', saveToLocalStore.bind(null, inputValue));
  }, [inputValue]);

  useEffect(() => {
    return () => {
      saveToLocalStore(inputValue);
      window.removeEventListener('beforeunload', saveToLocalStore.bind(null, inputValue));
    };
  }, []);

  return (
    <input
      autoFocus
      placeholder="Search Bar"
      autoComplete="off"
      className={styles.searchbar}
      type="search"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(e.target.value)}
      value={inputValue}
    ></input>
  );
};

export default SearchBar;
