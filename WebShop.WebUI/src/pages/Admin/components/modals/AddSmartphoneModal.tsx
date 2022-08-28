import { Guid } from 'guid-typescript';
import React, { useRef, useState } from 'react';
import { api } from '../../../../api/api';

interface Props {
  label: string;
  brandName: string;
}

const AddSmartphoneModal = (props: Props) => {

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<FileList | null>(null);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent page refresh
    event.preventDefault();

    const smartphoneId = Guid.create().toString();

    try {
      api.postSmartphone(props.brandName, { id: smartphoneId, name: name, price: price, description: description });
      if (image) {
        api.postSmartphoneImage(props.brandName, { name: smartphoneId, image: image[0] });
      }
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (e) {
      console.log(e);
    }

  }

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

      <button className='w-full'
        onClick={() => {
          setIsShowModal(true);
        }}>
        {props.label}
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
                  <h3 className="mb-4 text-xl font-medium text-black">Добавить Смартфон</h3>
                  <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">Название Смартфона</label>
                      <input
                        className='bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        type='text'
                        placeholder='Смартфон'
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">Цена</label>
                      <input
                        className='bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5'
                        onChange={e => setPrice(Number(e.target.value))}
                        value={price}
                        placeholder='1000'
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">Описание</label>
                      <textarea
                        className='bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">Изображение</label>
                      <input
                        className='bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5'
                        onChange={e => setImage(e.target.files)}
                        type='file'
                      />
                    </div>
                    <button type='submit' className='w-full bg-green hover:bg-blue focus:ring-2 focus:outline-none focus:ring-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                      Добавить
                    </button>
                  </form>
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

export default AddSmartphoneModal;