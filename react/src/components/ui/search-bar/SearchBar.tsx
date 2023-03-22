import React from 'react';
import styles from './SearchBar.module.css';

class SearchBar extends React.Component<{ [key: string]: string }, { inputValue: string }> {
  constructor(props: { [key: string]: string } | Readonly<{ [key: string]: string }>) {
    super(props);
    const storageInputValue: string = localStorage.getItem('inputValue')
      ? JSON.parse(localStorage.getItem('inputValue')!)
      : '';
    this.state = { inputValue: storageInputValue };
  }

  handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    this.setState({ inputValue: target.value });
  };

  componentDidMount(): void {
    window.addEventListener('beforeunload', this.saveToLocalStore);
  }

  saveToLocalStore = (): void => {
    const { inputValue } = this.state;
    localStorage.setItem('inputValue', JSON.stringify(inputValue));
  };

  componentWillUnmount(): void {
    this.saveToLocalStore();
    window.removeEventListener('beforeunload', this.saveToLocalStore);
  }

  render() {
    const { inputValue } = this.state;
    return (
      <input
        autoFocus
        placeholder="Search Bar"
        autoComplete="off"
        className={styles.searchbar}
        type="search"
        onChange={this.handleInput}
        value={inputValue}
      ></input>
    );
  }
}

export default SearchBar;
