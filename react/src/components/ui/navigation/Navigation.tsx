import CurrentPage from '../current-page/CurrrentPage';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  const location = useLocation();
  const { pathname } = location;
  const [path, setState] = useState(pathname);

  useEffect(() => {
    setState(pathname);
  }, [pathname]);

  return (
    <>
      <nav className={styles.nav}>
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

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.nav__el} ${styles.nav__el_active}` : `${styles.nav__el}`
          }
          to="/form"
          data-testid="form"
        >
          Form
        </NavLink>
      </nav>

      <CurrentPage path={path} />
    </>
  );
};

export default Navigation;
