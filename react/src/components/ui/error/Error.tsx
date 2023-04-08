import React, { useEffect, useState } from 'react';
import { Api } from '../../../utils/utils';
import { GIFObject } from 'giphy-api';
import { IGiphyResponse } from 'models/interfaces';

const Error = (props: { errorMessage: string }) => {
  const { errorMessage } = props;

  const [randomGifUrl, setRandomGifUrl] = useState('');

  useEffect(() => {
    const api: Api = new Api();
    api
      .getGifs('cyberpunk2077')
      .then((data) => {
        const gifs: GIFObject[] = (data as IGiphyResponse).data;
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
        setRandomGifUrl(randomGif.images.original.url);
      })
      .catch(() => {
        setRandomGifUrl('https://media3.giphy.com/media/IKMBVMPsOuLFCrFeE5/giphy.gif');
      });
  }, []);

  return (
    <>
      <h1 style={{ margin: '0px' }}>{errorMessage}</h1>
      {randomGifUrl && <img height={'400px'} src={randomGifUrl}></img>}
    </>
  );
};

export default Error;
