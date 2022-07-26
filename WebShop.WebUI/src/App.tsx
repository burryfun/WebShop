import './App.css';
import Counter from './components/Counter';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import BrandPage from './pages/BrandPage';
import Header from './components/Header';
import CatalogPage from './pages/CatalogPage';

function App() {
  return (
    <div className="App my-0 mx-auto max-w-7xl bg-light">
      <Header />
      <div className='pt-10'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="catalog" element={<CatalogPage/>} />
          <Route path="catalog/:brandName" element={<BrandPage/>} />
          {/* <Route path="catalog/:brandName/:smartphoneName" element={<SmartphonePage/>} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
