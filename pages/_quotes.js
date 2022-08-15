import React, { useState, useEffect } from 'react';

function Quotes() {
  const [ready, setReady] = useEffect(false);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if ( !ready ) {

      

      setReady(true);
    }
  }, [ready]);

  return <div>
    Quotes
  </div>
}
export default Quotes;