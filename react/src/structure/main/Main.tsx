import { IComponents } from '../../models/interfaces';
import React from 'react';
import styles from './Main.module.css';
import { v4 as uuidv4 } from 'uuid';

const Main = ({ components }: IComponents) => {
  return (
    <main className={styles.main}>
      {components.map((Component: React.ComponentType) => (
        <Component key={uuidv4()} />
      ))}
    </main>
  );
};

export default Main;
