import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";


// import BrandNavList from "../components/BrandNavList";
// import SmartphoneList from "../components/SmartphoneList";

const Home: FC = () => {

  const [brands, setBrands] = useState<api.IBrand[] | null>(null);

  useEffect(() => {
    api.getBrands().then(data => setBrands(data));
  }, [])

  return (
    <div>
      <h2 className="text-3xl font-bold">Home</h2>
      <nav>
        {/* <SmartphoneList brandName="apple"/> */}
      </nav>
      <ul>
        {brands?.map(brand => (
          <li key={brand.id}>{brand.name}</li>
        ))}
      </ul>
    </div>

  )
}

export default Home;