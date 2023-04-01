import { Pathes } from '../../../constants/constants';
import React from 'react';
import styles from './CurrentPage.module.css';
import { IPath } from '../../../models/interfaces';

const CurrentPage = ({ path }: IPath) => {
  return (
    <div className={`${styles.currentPage}`}>
      Current page: {Pathes[`${path}`] || Pathes['/404']}
    </div>
  );
};

export default CurrentPage;
