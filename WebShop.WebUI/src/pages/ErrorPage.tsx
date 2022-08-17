import React, { useContext } from 'react';
import { Context } from '..';

const ErrorPage = () => {

  const { store } = useContext(Context);

  return (
      <div className='flex flex-col items-center justify-center h-screen -mt-20'>
        <h1 className='text-xl font-bold'>{store.errorStatus}</h1>
        <h2 className='text-lg font-semibold'>{store.errorMessage}</h2>
        <h3 className='text-base font-semibold'>{store.errorDescription}</h3>
      </div>
  );
};

export default ErrorPage;