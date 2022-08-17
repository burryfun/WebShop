import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '..';
import ss_logo from '../assets/ss_logo.svg'
import LoginFormModal from '../modals/LoginFormModal';
import CartStore from '../store/CartStore';

const Header = () => {

  const { cartStore } = useContext(Context);

  return (
    <div className='border-x-4 border-b-4 rounded-b-3xl py-2 max-w-7xl bg-teal border-green mx-auto mb-4'>
      <nav className="px-4">
        <div className="container flex flex-wrap items-center justify-between mx-auto max-w-none">
          <Link to={'/'}>
            <img src={ss_logo} className="h-16 mx-auto" alt="ss_logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap">SmartShop</span>
          </Link>
          <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center justify-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li className='self-center text-base hover:text-green'>
                <Link to={'/'}>Home</Link>
              </li>
              <li className='self-center text-base hover:text-green'>
                <Link to={'/catalog'}>Catalog</Link>
              </li>
              <Link className='inline-flex relative items-center' to={'/cart'}>
                <li className='bg-green text-base hover:bg-dark rounded-lg px-4 py-3 self-center'>Cart</li>
                <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-semibold text-white bg-red rounded-full border-2 border-red">{cartStore.count}</div>
              </Link>
              <LoginFormModal />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default observer(Header);