import CurrentPage from '../current-page/CurrrentPage';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

class Navigation extends React.Component<{ [key: string]: string }, { location: string }> {
  constructor(props: { [key: string]: string } | Readonly<{ [key: string]: string }>) {
    super(props);
    const { pathname } = location;
    this.state = { location: pathname };
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleNavigation(): void {
    this.setState({ location: location.pathname });
  }

  render() {
    return (
      <>
        <nav className={styles.nav} onClick={this.handleNavigation}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.nav__el} ${styles.nav__el_active}` : `${styles.nav__el}`
            }
            data-testid="home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.nav__el} ${styles.nav__el_active}` : `${styles.nav__el}`
            }
            to="/about-us"
            data-testid="about-us"
          >
            About us
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.nav__el} ${styles.nav__el_active}`
                : `${styles.nav__el_invisible} ${styles.nav__el}`
            }
            to="/404"
            data-testid="404"
          >
            404
          </NavLink>
        </nav>

        <CurrentPage route={this.state.location} />
      </>
    );
  }
}

export default Navigation;
