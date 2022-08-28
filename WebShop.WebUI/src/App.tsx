import './App.css';
// import Counter from './components/Counter';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import BrandPage from './pages/BrandPage';
import Header from './components/Header';
import CatalogPage from './pages/CatalogPage';
import { useContext, useEffect } from 'react';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import SuccessfulRegistrationPage from './pages/SuccessfulRegistrationPage';
import AdminPage from './pages/Admin/AdminPage';
import CartPage from './pages/Cart/CartPage';
import MyOrdersPage from './pages/MyOrdersPage';
import SuccessfulCheckoutPage from './pages/SuccessfulCheckoutPage';

function App() {

  const {store} = useContext(Context);
  const {cartStore} = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [])

  return (
    <div className="App my-0 mx-auto max-w-full bg-gray_300 min-h-screen h-auto">
      <Header />
      <div className=''>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="catalog" element={<CatalogPage/>} />
          <Route path="catalog/:brandName" element={<BrandPage/>} />
          {/* <Route path="catalog/:brandName/:smartphoneName" element={<SmartphonePage/>} /> */}
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/error" element={<ErrorPage/>} />
          <Route path="/successfulRegistration" element={<SuccessfulRegistrationPage/>} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/myorders" element={<MyOrdersPage/>} />
          <Route path="/successfulCheckout" element={<SuccessfulCheckoutPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default observer(App);
