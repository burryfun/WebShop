import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import { api } from '../../api/api';
import { CartService } from '../../services/CartService';
import CheckoutForm from './CheckoutForm';

const SmartphoneList = () => {

  const [response, setResponse] = useState<api.ICartResponse[] | null>(null);
  const [deletedSmartphoneId, setDeletedSmartphoneId] = useState<string | undefined>('');

  const { cartStore } = useContext(Context);

  useEffect(() => {
    cartStore.getCart();
  }, []);



  const handleDeleteSmartphone = (id: string) => {
    setDeletedSmartphoneId(id);
    cartStore.remove(id);
  }

  return (
    <>
      {cartStore.count ?
        <div className='flex justify-center mx-auto w-full'>
          <div className='grid grid-cols-7 gap-4 my-1 items-start text-center'>
            <div className='grid gap-4 lg:col-span-3 sm:col-span-5 xs:col-span-5'>
              {cartStore.smartphones?.map((smartphone) => (
                <>
                  {(deletedSmartphoneId === smartphone.smartphoneId) ? null :
                    <div key={smartphone.smartphoneId} className='grid grid-cols-3 col-start-1 border px-4 py-0 rounded-lg bg-teal'>
                      <div>
                        <img className="p-1 rounded-t-lg lg:w-40 lg:h-40 md:w-32 md:h-32 xs:w-20 xs:h-20 mx-auto"
                          src={`${process.env.REACT_APP_API_URL}/images/${smartphone.brandName}?imageName=${smartphone.smartphoneId}`} />
                      </div>
                      <div className='flex justify-around self-center text-lg font-semibold'>
                        <span>{smartphone.smartphoneName}</span>
                        <span>${smartphone.smartphonePrice}</span>
                      </div>
                      <div className='self-center'>
                        <button type='button' className=' bg-green text-base hover:bg-dark rounded-lg px-4 py-3 self-center font-semibold'
                          onClick={() => {
                            handleDeleteSmartphone(smartphone.smartphoneId)
                          }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  }
                </>
              ))}
            </div>
            <div className='lg:col-span-4 sm:col-span-5 xs:col-span-5'>
              <CheckoutForm />
            </div>
          </div>
        </div>
        : null}

    </>
  );
};

export default observer(SmartphoneList);