import React from 'react';
import styles from './SearchBar.module.css';

class SearchBar extends React.Component<unknown, { inputValue: string }> {
  constructor(props: unknown) {
    super(props);
    const storageInputValue = localStorage.getItem('inputValue')
      ? JSON.parse(localStorage.getItem('inputValue')!)
      : '';
    this.state = { inputValue: storageInputValue };
  }

  handleInput = (e: { target: HTMLInputElement }): void => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    this.saveToLocalStore(target.value);
    this.setState({ inputValue: target.value });
  };

  componentDidMount(): void {
    window.addEventListener('beforeunload', this.hadleUnload);
  }

  saveToLocalStore = (value?: string): void => {
    const { inputValue } = this.state;
    localStorage.setItem('inputValue', JSON.stringify(value ? value : inputValue));
  };

  componentWillUnmount(): void {
    this.saveToLocalStore();
    window.removeEventListener('beforeunload', this.hadleUnload);
  }

  hadleUnload = (): void => {
    this.saveToLocalStore();
  };

  render() {
    return (
      <input
        autoFocus
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
