import React, { useContext, useState } from 'react';
import { Context } from '../..';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {

  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const { cartStore } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent page refresh
    event.preventDefault();

    const result = await api.checkout({
      phone: phone,
      address: address,
      total: cartStore.getTotalPrice(),
      smartphonesId: cartStore.smartphonesId
    })

    if (result.status == 200) {
      navigate("/successfulCheckout");
      cartStore.clear();
    }

  }

  return (
    <div className='flex w-full justify-center z-50'>
      <div className='bg-white rounded-lg w-full max-w-lg h-auto'>
        <div className='p-8 shadow-lg'>
          <h3 className='font-medium text-xl mb-4'>Checkout Order</h3>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label className='block mb-2 text-sm font-medium'>Your Phone</label>
              <div className='relative'>
                <span className='absolute left-2 top-[11px] text-sm'>+7</span>
                <input className='bg-gray_100 pl-7 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5'
                  onChange={e => setPhone(e.target.value)}
                  value={phone}
                  type='tel'
                  placeholder='7779991122'
                  title="(xxx)-xxx-xx-xx"
                  pattern='[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}'
                  required
                />
              </div>
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium'>Your Address</label>
              <input className='bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5'
                onChange={e => setAddress(e.target.value)}
                value={address}
                type='text'
                placeholder='Country, City, Street, House, Apartment'
                title='Country, City, Street, House, Apartment'
                required
              />
            </div>
            <div className='flex justify-between text-md font-medium'>
              <h3>Total</h3>
              <h3>${cartStore.getTotalPrice()}</h3>
            </div>
            <button type='submit' className=' bg-green text-base hover:bg-dark rounded-lg px-4 py-3 self-center font-semibold'
              onClick={() => {
              }}>
              Check Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;