import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { api } from '../api/api';
import BrandCard from './BrandCard';

const BrandNavList: FC = () => {
  const [brands, setBrands] = useState<api.IBrand[] | null>(null);

  useEffect(() => {
    api.getBrands().then(data => setBrands(data));
  }, []);

  return (
    <div className='flex justify-center mx-auto w-full'>
      <div className='grid gap-10 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4'>
        {brands?.map(brand =>
        (
          <Link to={"" + brand.name?.toLowerCase()} key={brand.name}>
            <BrandCard Id={brand.id} Name={brand.name} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BrandNavList;