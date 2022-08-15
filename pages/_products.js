import React, { useState, useEffect } from 'react';
import {productService} from '../services/productService.js';
import Search from './_search.js';

function Products() {
  const [ready, setReady] = useState(false);
  

  const [items, setItems] = useState([]);
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    async function fetchData () {
      if ( !ready ) {
        let res = await productService.filter();
        if (res.data["status"] ) {
          setItems(res.data["objects"]);
        }

        setReady(true);
      }
    }
    fetchData();
  }, [ready]);

  let onSearch = (p1) => {
    setKeyWord(p1);
  }

  return <div>
    <div className="py-3">
      <Search onSearch={onSearch} />
    </div>
    <div className="overflow-x-auto relative sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="py-3 px-6">
                      Product
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Color
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Size
                  </th>
                  <th scope="col" className="py-3 px-6">
                      FOB
                  </th>
              </tr>
          </thead>
          <tbody>
            {items
              .filter((e) => {
                if ( keyWord === "" || !keyWord ) {
                  return e;
                }
                return e.name.toLowerCase().includes(keyWord.toLowerCase());
              })
              .sort(function(a, b) {
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            })
            .map((e, i) => 
            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {e.name} / Art. {e.id}
              </th>
              <td className="py-4 px-6">
                  {e.color}
              </td>
              <td className="py-4 px-6">
                  {e.size}
              </td>
              <td className="py-4 px-6">
                  {e.fob}
              </td>
            </tr> )}
          </tbody>    
        </table>
      </div>
  </div>
}
export default Products;