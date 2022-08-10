import React, { useRef, useState } from 'react';
import { api } from '../../../../api/api';

interface Props {
  Smartphone: api.ISmartphone;
  BrandName: string;
}

const SmartphoneInfoModal = (props: Props) => {

  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  // Disable opacity background and scaling modal form if click to outisde from form
  const isOnClickOutsideTargetContainer = true;
  const targetContainer = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!targetContainer.current?.contains(e.target as Node)) {
      setIsShowModal(false);
    }
  };

  return (
    <>
      {/* Modal toggle */}

      <button className='underline text-emerald self-center'
        onClick={() => {
          setIsShowModal(true);
        }}>
        {props.Smartphone.name}
      </button>

      {isShowModal ? (
        <>
          {/* Main modal */}
          <div className={`flex fixed z-50 w-full md:inset-0 justify-center items-center`}
            onClick={isOnClickOutsideTargetContainer ? onOverlayClick : undefined}>
            <div className="relative p-4 w-full max-w-md h-auto">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow" ref={targetContainer}>
                <button className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-light hover:text-dark rounded-lg text-sm p-1.5 inline-flex items-center"
                  onClick={() => {
                    setIsShowModal(false);
                  }} >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path>
                  </svg>
                </button>
                <div className="py-6 px-6 lg:px-8">
                  <h3 className="mb-4 text-2xl font-medium text-black">{props.Smartphone.name}</h3>
                  <div className='flex mb-4'>
                    <img src={`${process.env.REACT_APP_API_URL}/images/${props.BrandName}?imageName=${props.Smartphone.id}`} className="w-4/6" />
                    <h4 className='text-xl font-semibold'>
                      Price: ${props.Smartphone.price}
                    </h4>
                  </div>
                  <h4 className='text-xl font-semibold'>
                    Description
                  </h4>
                  <h5>
                    {props.Smartphone.description}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          {/* Outside */}
          <div id='bg_openedModal' className={`!ml-0 inset-0 fixed w-full z-40 bg-black opacity-25`}></div>
        </>
      ) : null}

    </>
  );
};

export default SmartphoneInfoModal;