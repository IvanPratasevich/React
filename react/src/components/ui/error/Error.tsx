import React from 'react';

const Error = (props: { errorMessage: string }) => {
  const { errorMessage } = props;

  return (
    <>
      <h1 style={{ margin: '0px' }}>{errorMessage}</h1>

      <img height={'400px'} src={'https://i.giphy.com/media/IKMBVMPsOuLFCrFeE5/giphy.webp'}></img>
    </>
  );
};

export default Error;
