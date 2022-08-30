import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api';
import SmartphoneCard from './SmartphoneCard';

interface Props {
  brandName?: string;
}

interface IPageParams {
  pageIndex: number;
  totalPages: number;
}

const SmartphoneList = ({ brandName }: Props) => {

  const [brand] = useState<string>(brandName || "");
  const [smartphones, setSmartphones] = useState<api.ISmartphone[] | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const PAGE_SIZE = 15;

  useEffect(() => {

    api.getSmartphones(brand, { pageNumber: 1, pageSize: PAGE_SIZE }).then(response => {
      setSmartphones(response.data);
      const params: IPageParams = JSON.parse(response.headers["x-pagination"]);
      setCurrentPage(params.pageIndex);
      setTotalPages(params.totalPages);
    })
  }, []);

  const handleCurrentPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    // prevent page refresh
    event.preventDefault();

    const clickedPage: number = Number.parseInt(event.currentTarget.textContent!);

    api.getSmartphones(brand, { pageNumber: clickedPage, pageSize: PAGE_SIZE }).then(response => {
      setSmartphones(response.data);
      const params: IPageParams = JSON.parse(response.headers["x-pagination"]);
      setCurrentPage(params.pageIndex);
      setTotalPages(params.totalPages);
    })
  }

  return (
    <>
      <div className='flex justify-center mx-auto w-full'>
        <div className='grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
          {smartphones?.map((smartphone) => (
            <SmartphoneCard key={smartphone.id}
              Id={smartphone.id}
              Name={smartphone.name}
              Brand={brandName}
              Description={smartphone.description}
              Price={smartphone.price}
              Discount={smartphone.discount}
              Amount={smartphone.amount}
            />
          ))}
        </div>

      </div>
      <div className='flex justify-center mt-10'>
        <nav aria-label="Page navigation example">
          <ul className="inline-flex space-x-1">
            {Array.from(Array(totalPages), (_, i) => i + 1).map(page => (
              <li key={page}>
                <button className={`py-2 px-3 ml-0 leading-tight w-9 h-10 rounded-lg font-semibold text-gray_500 border border-gray_500 hover:bg-gray_300 hover:text-blue
                ${(page === currentPage) ? "bg-green_200" : null}`}
                  onClick={handleCurrentPage}>{page}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SmartphoneList;