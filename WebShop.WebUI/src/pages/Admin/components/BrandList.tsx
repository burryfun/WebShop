import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import AddBrandModal from './modals/AddBrandModal';
import AddSmartphoneModal from './modals/AddSmartphoneModal';
import SmartphoneInfoModal from './modals/SmartphoneInfoModal';
import SmartphoneList from './SmartphoneList';

const BrandList = () => {

  const [brands, setBrands] = useState<api.IBrand[] | null>(null);
  const [isBrandShow, setIsBrandShow] = useState<boolean>(false);
  const [selectedBrandId, setSelectedBrandId] = useState<string | undefined>('');

  useEffect(() => {
    api.getBrands().then(data => setBrands(data));
  }, [])

  const handleDeleteBrand = (brandId:string) => {
    api.deleteBrand(brandId);
    setTimeout(() => {
      api.getBrands().then(data => setBrands(data));
    }, 100);
  }

  return (
    <div className='mx-4'>
      {brands?.map((brand, index) => (
        <div key={brand.id} >
          <div className='grid grid-cols-12 gap-2 items-center my-2'>
            <div className='grid grid-cols-4 col-span-4 bg-light items-center px-4 py-2 rounded-lg shadow-md'>
            <div className='flex justify-evenly'>
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
            </div>
            <div className='grid col-span-2 justify-items-stretch gap-1'>
              {/* <button type='button' className='border border-gray_500 bg-white'>Добавить Смартфон</button> */}
              <div className='border border-gray_500 bg-green_200'>
                <AddSmartphoneModal label='Добавить Смартфон' brandName={brand.name}/>
              </div>
              <button type='button' className='border border-gray_500 bg-green_200'
                onClick={() => handleDeleteBrand(brand.id)}>Удалить Бренд</button>
            </div>
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