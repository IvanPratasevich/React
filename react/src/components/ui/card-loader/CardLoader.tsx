import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const CardLoader = (props: IContentLoaderProps) => (
  <ContentLoader height="500" width="460" {...props}>
    <rect height="500" width="460" />
  </ContentLoader>
);

export default CardLoader;
