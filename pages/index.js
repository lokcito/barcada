import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Search from './_search.js';
import Quotes from './_quotes.js';
import Products from './_products.js';
import React, { useState } from 'react';


export default function Home() {
  
  const [tab, setTab] = useState('products');


  return (
    <div className={styles.container}>
      <Head>
        <title>Classic Alpaca Quotes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className={styles.main}>
        <div  className={styles.wrapper}>
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                  <li className="mr-2" role="presentation">
                      <button className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" 
                        onClick={() => setTab("quotes")} 
                        type="button" role="tab" aria-controls="dashboard" aria-selected="false">Quotes</button>
                  </li>
                  <li className="mr-2" role="presentation">
                      <button className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"  
                      
                      type="button" role="tab" aria-controls="settings" aria-selected="false">Customers</button>
                  </li>
                  <li role="presentation">
                      <button className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" 
                      onClick={() => setTab("products")} 
                      type="button" role="tab" aria-controls="contacts" aria-selected="false">Products</button>
                  </li>
              </ul>
          </div>
          <div id="myTabContent">
              <div className=" p-4 bg-gray-50 rounded-lg " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                {tab === "search"?<Search />:
                  tab === "quotes"?<Quotes />:
                  tab === "products"?<Products />:null}
              </div>
          </div>          
        </div>
        <div >
          
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://classicalpaca.com" target="_blank" rel="noopener noreferrer">
          <strong>Classic Alpaca</strong>
        </a>
      </footer>
    </div>
  );
}
