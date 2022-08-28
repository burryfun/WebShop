import React, { useContext } from 'react';
import { Context } from '..';
import { CartService } from '../services/CartService';

interface Props {
  Id: string;
  Name?: string;
  Brand?: string;
  Description?: string;
  Price?: number;

}

const SmartphoneCard = (props: Props) => {

  const { cartStore } = useContext(Context);

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md min-w-max">
      <a href="#">
        <img className="p-1 rounded-t-lg w-52 h-52 mx-auto" src={`${process.env.REACT_APP_API_URL}/images/${props.Brand}?imageName=${props.Id}`} alt="product image" />
      </a>
      <div className="px-5 pb-5 w-60">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">{props.Name}</h5>
          <h6 className='text-base font-normal tracking-tight text-gray-900'>{props.Description}</h6>
        </a>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">${props.Price}</span>
          <button className="bg-green hover:bg-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => cartStore.add(props.Id)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default SmartphoneCard;