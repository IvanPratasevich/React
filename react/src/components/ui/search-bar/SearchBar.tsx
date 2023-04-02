import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.css';
import { saveToLocalStore } from '../../../utils/utils';
import { useBeforeUnload } from 'react-router-dom';

const SearchBar = () => {
  const storageInputValue: string = localStorage.getItem('inputValue') || '';

  const [inputValue, setInputValue] = useState(storageInputValue);

  const searchBarRef = useRef<string>(inputValue);

  useEffect(() => {
    searchBarRef.current = inputValue;
  }, [inputValue]);

  useEffect(() => {
    return () => {
      saveToLocalStore(searchBarRef.current);
    };
  });

  useBeforeUnload(
    useCallback(() => {
      saveToLocalStore(searchBarRef.current);
    }, [])
  );

  return (
    <input
      autoFocus
      placeholder="Search Bar"
      autoComplete="off"
      className={styles.searchbar}
      type="search"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      value={inputValue}
    ></input>
  );
};

export default SearchBar;
