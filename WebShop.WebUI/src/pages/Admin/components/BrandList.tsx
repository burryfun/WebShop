import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import AddBrandModal from './modals/AddBrandModal';
import SmartphoneList from './SmartphoneList';

const BrandList = () => {

  const [brands, setBrands] = useState<api.IBrand[] | null>(null);
  const [isBrandShow, setIsBrandShow] = useState<boolean>(false);
  const [selectedBrandId, setSelectedBrandId] = useState<string | undefined>('');

  useEffect(() => {
    api.getBrands().then(data => setBrands(data));
  }, [])


  return (
    <div className='mx-4'>
      {brands?.map((brand, index) => (
        <div key={brand.id} >
          <div className='grid grid-cols-10 gap-2 items-center bg-gray_300 my-2 border px-4 py-2 rounded-lg'>
            <div>
              <span>{index + 1}. </span>
              <button className='underline'
                onClick={() => {
                  setIsBrandShow(!isBrandShow);
                  setSelectedBrandId(brand.id);
                }}>
                {brand.name}
              </button>
            </div>
            <div className='grid justify-items-stretch justify-center gap-1'>
              <img className="w-20 h-20" src={process.env.REACT_APP_API_URL + "/images/?imageName=" + brand.id} alt="product image" />
              <button type='button' className='border border-gray_500 bg-white'>Изменить</button>
            </div>
            <div className='grid col-span-2 justify-items-stretch gap-1'>
              <button type='button' className='border border-gray_500 bg-white'>Добавить Смартфон</button>
              <button type='button' className='border border-gray_500 bg-white'>Удалить Бренд</button>
            </div>
          </div>
          <div>
            {
              (selectedBrandId === brand.id && isBrandShow) ?
                <SmartphoneList key={brand.id} brandName={brand.name} /> : null
            }
          </div>
        </div>
      ))}
      <AddBrandModal/>
    </div>
  );
};

export default BrandList;