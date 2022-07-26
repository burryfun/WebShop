import { FC } from "react";
import { Link } from "react-router-dom";
import BrandNavList from "../components/BrandNavList";
import SmartphoneList from "../components/SmartphoneList";

const Home: FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold">Home</h2>
            <nav>
                <SmartphoneList brandName="apple"/>
            </nav>
        </div>

    )
}

export default Home;