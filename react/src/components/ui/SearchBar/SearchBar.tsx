import React from 'react';
import styles from './SearchBar.module.css';

class SearchBar extends React.Component<null, { inputValue: string }> {
  constructor(props: null) {
    super(props);
    let storageInputValue = localStorage.getItem('inputValue') || '';
    if (storageInputValue) {
      storageInputValue = JSON.parse(storageInputValue);
    }
    this.state = { inputValue: storageInputValue || '' };
  }

  handleInput = (e: { target: HTMLInputElement }): void => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    localStorage.setItem('inputValue', JSON.stringify(target.value));
    this.setState({ inputValue: target.value });
  };

  render() {
    return (
      <input
        placeholder="Search Bar"
        autoComplete="off"
        className={styles.searchbar}
        type="search"
        onChange={this.handleInput}
        value={this.state.inputValue}
      ></input>
    );
  }
}

export default SearchBar;
