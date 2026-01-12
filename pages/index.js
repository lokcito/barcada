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
        <title>NextComplete</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className={styles.main}>
        <div  className={styles.wrapper}>
          <div className="mb-4 dark:border-gray-700 text-center">
              <h2 className="text-xl font-bold">NextComplete - Autocomplete products</h2>
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
        <a href="https://nextcomplete.equisd.com" target="_blank" rel="noopener noreferrer">
          <strong>NextComplete</strong>
        </a>
      </footer>
    </div>
  );
}
