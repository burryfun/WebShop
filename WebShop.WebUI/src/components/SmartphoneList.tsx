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
      console.log(brandName);
      const response = api.getSmartphones(brandName).then(data => setSmartphones(data));
      console.log(response);
    }
  }, []);

  return (
    <div className='flex justify-center mx-auto w-full'>
      <div className='grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
        {smartphones?.map(smartphone => (
          <Link to={'' + smartphone.id} key={smartphone.id} >
            {/* {smartphone.name} */}
            <SmartphoneCard Id={smartphone.id} Name={smartphone.name} Brand={brandName} Description={smartphone.description} Price={smartphone.price} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SmartphoneList;