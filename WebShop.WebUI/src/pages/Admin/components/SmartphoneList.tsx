import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import AddSmartphoneModal from './modals/AddSmartphoneModal';
import SmartphoneInfoModal from './modals/SmartphoneInfoModal';

interface Props {
  brandName: string;
}

const SmartphoneList = (props: Props) => {

  const [smartphones, setSmartphones] = useState<api.ISmartphone[] | null>(null);

  useEffect(() => {
    api.getSmartphones(props.brandName).then(response => setSmartphones(response.data));
  }, []);

  const handleDeleteSmartphone = (smartphoneId:string) => {
    api.deleteSmartphone(props.brandName, smartphoneId);
    setTimeout(() => {
      api.getSmartphones(props.brandName).then(response => setSmartphones(response.data));
    }, 100);
  }

  return (
    <>
      {smartphones?.map((smartphone, index) => (
        <div key={smartphone.id} className='grid grid-cols-12 gap-2 my-1 items-center '>
          <div className='grid grid-cols-3 col-start-2 col-span-3 px-4 py-2 rounded-lg bg-gray_100 shadow-md'>
            <div className='col-span-2'>
              <span>{index + 1}. </span>
              {/* <label className=''>{smartphone.name}</label> */}
              <SmartphoneInfoModal Smartphone={smartphone} BrandName={props.brandName} />
            </div>
            <button type='button' className=' border border-gray_500 bg-green_200'
              onClick={() => handleDeleteSmartphone(smartphone.id)}>Удалить</button>
          </div>
        </div>
      ))}
      <div className='grid grid-cols-12 gap-2 my-1 items-center'>
        <div className='grid grid-cols-2 col-start-2 col-span-3 border py-0 rounded-lg bg-teal items-center'>
          <div className='col-span-2 font-semibold pb-1 text-lg'>
            <AddSmartphoneModal label='+' brandName={props.brandName} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartphoneList;