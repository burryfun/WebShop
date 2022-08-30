import React, { useContext } from 'react';
import { Context } from '..';
import { CartService } from '../services/CartService';

interface Props {
  Id: string;
  Name?: string;
  Brand?: string;
  Description?: string;
  Price?: number;
  Discount?: number;
  Amount?: number;

}

const SmartphoneCard = (props: Props) => {

  const { cartStore } = useContext(Context);

  return (
    <div className="grid max-w-sm bg-white rounded-lg shadow-md min-w-max">
      <a href="#">
        <img className="p-1 rounded-t-lg w-52 h-52 mx-auto" src={`${process.env.REACT_APP_API_URL}/images/${props.Brand}?imageName=${props.Id}`} alt="product image" />
      </a>
      <div className="px-5 mt-4 mb-4 w-60">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight">{props.Name}</h5>
          <h6 className='text-base font-semibold tracking-tight'>{props.Description}</h6>
        </a>
      </div>
      <div className="px-5 pb-5 w-60 self-end">
        <span className="text-2xl font-bold">${props.Amount}</span>
        <div className="grid grid-cols-3 items-center">
          {props.Discount ? <span className="text-base line-through font-semibold text-gray_500">${props.Price}</span> : null}
          <button className="col-span-2 col-start-2 bg-green hover:bg-dark focus:outline-none font-medium rounded-lg text-sm px-5 mx-2 py-2.5 text-center"
            onClick={() => cartStore.add(props.Id)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default SmartphoneCard;