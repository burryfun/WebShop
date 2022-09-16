import React from 'react';
import { useParams } from 'react-router-dom';
import SmartphoneList from '../components/SmartphoneList';

const BrandPage = () => {
  const params = useParams();
  const brandName = params.brandName;
  return (
    <div className='min-h-screen'>
      <SmartphoneList brandName={brandName} />
    </div>
  );
};

export default BrandPage;