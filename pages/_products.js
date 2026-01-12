import React, { useState, useEffect, useMemo } from 'react';
import {productService} from '../services/productService.js';
import Search from './_search.js';
import styles from '../styles/Home.module.css';

function normalizeText(str) {
  return (str || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function isDigits(str) {
  return /^\d+$/.test((str || '').trim());
}

// Fuzzy simple: subsequence + includes
function fuzzyMatch(haystack, needle) {
  if (!needle) return true;
  if (!haystack) return false;
  const h = normalizeText(haystack);
  const n = normalizeText(needle);
  if (h.includes(n)) return true; // match directo

  // subsequence
  let i = 0;
  for (const ch of h) {
    if (ch === n[i]) i++;
    if (i === n.length) return true;
  }
  return false;
}

function Products() {
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState([]);
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    async function fetchData () {
      if (!ready) {
        let res = await productService.filter();
        if (res.data["status"] ) {
          setItems(res.data["objects"]);
        }
        setReady(true);
      }
    }
    fetchData();
  }, [ready]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const an = normalizeText(a.name);
      const bn = normalizeText(b.name);
      if (an < bn) return -1;
      if (an > bn) return 1;
      return 0;
    });
  }, [items]);

  const filteredItems = useMemo(() => {
    const q = (keyWord || '').trim();
    if (!q) return sortedItems;

    if (isDigits(q)) {
      return sortedItems.filter(e => String(e.id || '').includes(q));
    }

    return sortedItems.filter(e => {
      return fuzzyMatch(e.name, q) || fuzzyMatch(e.color, q);
    });
  }, [sortedItems, keyWord]);

  let onSearch = (p1) => {
    setKeyWord(p1);
  }

  return <div>
    <div className="py-3">
      <Search onSearch={onSearch} />
    </div>
    <div className="overflow-x-auto relative rounded-lg">
        <table  className={["w-full", "text-sm", "text-left", "text-gray-500", "dark:text-gray-400", styles.fulltable].join(" ")}>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="py-3 px-6">Product</th>
                  <th scope="col" className="py-3 px-6">Color</th>
                  <th scope="col" className="py-3 px-6">Size</th>
                  <th scope="col" className="py-3 px-6">FOB</th>
              </tr>
          </thead>
          <tbody>
            {filteredItems.map((e, i) =>
              <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {e.name} / Art. {e.id}
                </th>
                <td className="py-4 px-6">{e.color}</td>
                <td className="py-4 px-6">{e.size}</td>
                <td className="py-4 px-6">{e.fob}</td>
              </tr>
            )}
          </tbody>
        </table>
        <table  className={["w-full", "text-sm", "text-left", "text-gray-500", "dark:text-gray-400", styles.minitable].join(" ")}>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="py-3 px-6">Product</th>
              </tr>
          </thead>
          <tbody>
            {filteredItems.map((e, i) =>
              <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap ">
                  <div className="dark:text-white">{e.name} / Art. {e.id}</div>
                  <div>Color: <strong className="dark:text-white">{e.color}</strong></div>
                  <div>Size: <strong className="dark:text-white">{e.size}</strong></div>
                  <div>FOB: <strong className="dark:text-white">{e.fob}</strong></div>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  </div>
}
export default Products;