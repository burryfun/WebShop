import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiClient, Smartphone } from '../api/api';
import SmartphoneCard from './SmartphoneCard';

const apiClient = new ApiClient(process.env.REACT_APP_API_URL)

interface Props {
  brandName?: string;
}

const SmartphoneList = ({ brandName }: Props) => {

  const [smartphones, setSmartphones] = useState<Smartphone[] | null>(null)

  useEffect(() => {
    if (brandName) {
      apiClient.catalogAll(brandName).then(data => setSmartphones(data))
    }
  }, []);

  return (
    <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
      {smartphones?.map(smartphone => (
        <Link to={'' + smartphone.id} key={smartphone.id} >
          {/* {smartphone.name} */}
          <SmartphoneCard Id={smartphone.id} Name={smartphone.name} Brand={brandName} Description={smartphone.description} Price={smartphone.price} />
        </Link>
      ))}
    </div>
  );
};

export default SmartphoneList;