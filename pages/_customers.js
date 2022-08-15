import React, { useState, useEffect } from 'react';

function Customers() {
  const [ready, setReady] = useState(false);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if ( !ready ) {



      setReady(true);
    }
  }, [ready]);

  return <div>
    Customers
  </div>
}
export default Customers;