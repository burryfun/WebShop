import React from 'react';

interface Props {
    Id?: string;
    Name?: string;
}

const BrandCard = (props: Props) => {
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-md min-w-max">
            <a href="#">
                <img className="p-8 rounded-t-lg w-40 h-40 mx-auto" src={process.env.REACT_APP_API_URL + "/images/?imageName=" + props.Id} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold text-center">{props.Name}</h5>
                </a>
            </div>
        </div>
    );
};

export default BrandCard;