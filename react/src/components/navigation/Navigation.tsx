import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={styles.nav}>
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
    </div>
  );
};

export default Navigation;
