import React from 'react';
import styles from './Popup.module.css';

const Popup = (prop: { hidden: boolean }) => {
  const { hidden } = prop;
  return (
    <>
      <h2
        data-testid="popup"
        className={!hidden ? `${styles.popup} ${styles.popup_hidden}` : `${styles.popup}`}
      >
        Card successfully generated!
      </h2>
    </>
  );
};

export default Popup;
