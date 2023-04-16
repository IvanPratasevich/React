import React from 'react';
import styles from './SearchBar.module.css';
import { setLoading, setSearch } from '../../../store/homeSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const SearchBar = () => {
  const searchValue = useAppSelector((state) => state.home.search.searchValue);
  const dispatch = useAppDispatch();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(setSearch({ searchValue: event.currentTarget.value, loaded: true }));
      dispatch(setLoading({ loading: true }));
    }
  };

  return (
    <input
      autoFocus
      placeholder="Search Bar"
      autoComplete="off"
      className={styles.searchbar}
      type="search"
      defaultValue={searchValue}
      onKeyDown={handleKeyDown}
    ></input>
  );
};

export default SearchBar;
