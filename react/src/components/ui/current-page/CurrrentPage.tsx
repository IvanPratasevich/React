import { Pathes } from '../../../constants/constants';
import React from 'react';
import styles from './CurrentPage.module.css';
import { IRoute } from '../../../models/interfaces';

const CurrentPage = ({ route }: IRoute) => {
  return (
    <div className={`${styles.currentPage}`}>
      Current page: {Pathes[`${route}`] || Pathes['/404']}
    </div>
  );
};

export default CurrentPage;
