import { useEffect, useState } from "react";
import { api } from "../api/api";
import SmartphoneCard from "../components/SmartphoneCard";

interface IPageParams {
  pageIndex: number;
  totalPages: number;
}

interface IDropdownOptions {
  label: string;
  value: string;
}

const Home = () => {

  const [brands, setBrands] = useState<api.IBrand[] | null>(null);
  const [smartphones, setSmartphones] = useState<api.ISmartphone[] | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<IDropdownOptions>({ label: "Name", value: "Name" });

  const PAGE_SIZE = 15;

  useEffect(() => {
    api.getBrands().then(data => setBrands(data));
    api.getAllSmartphones({ pageNumber: 1, pageSize: PAGE_SIZE, sortBy: sortBy.value }).then(response => {
      setSmartphones(response.data);
      const params: IPageParams = JSON.parse(response.headers["x-pagination"]);
      setCurrentPage(params.pageIndex);
      setTotalPages(params.totalPages);
    });
  }, []);

  const handleCurrentPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    // prevent page refresh
    event.preventDefault();

    const clickedPage: number = Number.parseInt(event.currentTarget.textContent!);

    api.getAllSmartphones({ pageNumber: clickedPage, pageSize: PAGE_SIZE, sortBy: sortBy.value}).then(response => {
      setSmartphones(response.data);
      const params: IPageParams = JSON.parse(response.headers["x-pagination"]);
      setCurrentPage(params.pageIndex);
      setTotalPages(params.totalPages);
    })
  }

  const dropdownOptions: IDropdownOptions[] = [
    { label: "Highest price", value: "HighestPrice" },
    { label: "Lowest price", value: "LowestPrice" },
  ]

  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);

  const handleDropdown = () => {
    setIsShowDropdown(!isShowDropdown);
  }

  const handleDropdownOption = (option: IDropdownOptions) => {
    api.getAllSmartphones({ pageNumber: 1, pageSize: PAGE_SIZE, sortBy: option.value }).then(response => {
      setSmartphones(response.data);
      const params: IPageParams = JSON.parse(response.headers["x-pagination"]);
      setCurrentPage(params.pageIndex);
      setTotalPages(params.totalPages);
    });

    setSortBy(option)
    setIsShowDropdown(false);
  }

  return (
    <>
      <div className='flex justify-center mx-auto w-full mb-4'>
        <div className='grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
          <div className='lg:col-start-5 md:col-start-3 sm:col-start-2 relative text-end'>
            <button className="bg-green hover:bg-blue font-medium rounded-lg text-sm px-4 py-2.5 w-60 text-center inline-flex items-center justify-between"
              onClick={handleDropdown}>
              Sort by: {sortBy.label}
              <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {
              isShowDropdown ?
                <div className="absolute right-0 z-10 w-60 bg-white rounded divide-y divide-gray-100 shadow-xl">
                  <ul className="py-1 text-sm dark:text-gray-200" aria-labelledby="dropdownDefault">
                    {
                      dropdownOptions.map((option) => (
                        <li>
                          <button className="py-2 px-4 w-full hover:bg-gray_300 text-start"
                            onClick={() => handleDropdownOption(option)}>
                            {option.label}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
                : null
            }
          </div>
        </div>
      </div>
      <div className='flex justify-center mx-auto w-full'>
        <div className='grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
            {smartphones?.map((smartphone) => (
              <SmartphoneCard key={smartphone.id}
                Id={smartphone.id}
                Name={smartphone.name}
                Brand={smartphone.brandName}
                Description={smartphone.description}
                Price={smartphone.price}
                Discount={smartphone.discount}
                Amount={smartphone.amount}
              />
            ))
          }
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
  )
}

export default Home;