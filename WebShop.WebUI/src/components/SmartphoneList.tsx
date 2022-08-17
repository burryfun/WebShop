import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api';
import SmartphoneCard from './SmartphoneCard';

interface Props {
  brandName?: string;
}

const SmartphoneList = ({ brandName }: Props) => {

  const [smartphones, setSmartphones] = useState<api.ISmartphone[] | null>(null)

  useEffect(() => {
    if (brandName) {
      const response = api.getSmartphones(brandName).then(data => setSmartphones(data));
    }
  }, []);

  return (
    <div className='flex justify-center mx-auto w-full'>
      <div className='grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
        {smartphones?.map(smartphone => (
          <SmartphoneCard Id={smartphone.id} Name={smartphone.name} Brand={brandName} Description={smartphone.description} Price={smartphone.price} />
        ))}
      </div>
    </div>
  );
};

export default SmartphoneList;