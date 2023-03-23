import { IComponents } from '../../models/interfaces';
import React from 'react';
import { idGenerator } from '../../utils/utils';
import styles from './Main.module.css';

const Main = ({ components }: IComponents) => {
  return (
    <main className={styles.main}>
      {components.map((Component: React.ComponentType) => (
        <Component key={idGenerator()} />
      ))}
    </main>
  );
};

export default Main;
