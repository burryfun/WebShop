import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import BrandPage from '../pages/BrandPage';
import { ApiClient, Brand } from '../api/api'
import BrandCard from './BrandCard';

const apiClient = new ApiClient(process.env.REACT_APP_API_URL)

const BrandNavList:FC = () => {
  const [brands, setBrands] = useState<Brand[] | null>(null);

  useEffect(() => {
    apiClient.catalogAll2().then(data => setBrands(data))
  }, []);

  return (
    <div className='flex flex-wrap items-center mx-auto md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
        {brands?.map(brand => 
          (
            // <div className='my-5 mx-auto'>
              <Link to={""+brand.name?.toLowerCase()} key={brand.name}>
                {/* {brand.name} */}
                <BrandCard Id={brand.id} Name={brand.name}/>
              </Link>
            // </div>
          ))}
    </div>
  )
}

export default BrandNavList;