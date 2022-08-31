import { useEffect, useState } from 'react';
import { api } from '../api/api';

const MyOrdersPage = () => {

  const [orders, setOrders] = useState<api.IOrder[]>([]);

  useEffect(() => {
    api.getMyOrders().then(data => setOrders(data));
  }, [])

  return (
    <div className='grid grid-cols-6'>
      <div className="overflow-x-auto relative lg:col-start-2 lg:col-span-4 xs:col-span-6 rounded-2xl">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-teal">
            <tr>
              <th scope="col" className="py-3 px-6">
                № / Date
              </th>
              <th scope="col" className="py-3 px-6">
                Address
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                Amount
              </th>
            </tr>
          </thead>
          {orders.map((order, index) => (
            <tbody>
              <tr className="bg-white border-b border-gray_300">
                <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                  {index + 1}. {order.created}
                </th>
                <td className="py-4 px-6">
                  {order.address}
                </td>
                <td className="py-4 px-6">
                  +7{order.phone}
                </td>
                <td className="py-4 px-6 font-medium">
                  ${order.total}
                </td>
              </tr>
              {order.smartphones.map(smartphone => (
                <tr className="bg-gray_500 bg-opacity-20 border-b border-gray_300">
                  <td className="py-2 px-14 font-medium whitespace-nowrap">
                    {smartphone.name}
                  </td>
                  <td>
                  </td>
                  <td>
                  </td>
                  <td className="py-2 px-10">
                    ${smartphone.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;