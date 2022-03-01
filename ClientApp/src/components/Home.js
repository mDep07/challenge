import React, { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    const FetchVentas = async () => {
      const options = {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presupuesto: 1000.5 })
      }
      const response = await fetch('api/Ventas?presupuesto=1000.5');
      const data = await response.json();
      console.log({data})
    }

    FetchVentas();
  },[])
  
  return (
    <div>
      <h4>Ventas</h4>
      <p>Welcome to your new single-page application, built with:</p>
    </div>
  );
}
