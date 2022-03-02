import React, { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    const FetchVentas = async () => {
      const response = await fetch('api/Ventas?presupuesto=130');
      console.log({response})
      if(response.ok) {
        const data = await response.json();
        console.log({data})

      }
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
