import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Card } from 'reactstrap';

import useForm from '../hooks/useForm';
import { numberFormat } from '../App';

export default function Home() {
  const [venta, setVenta] = useState({ suma: 0, productos: [] });

  const [form, handleChange, reset] = useForm({ presupuesto: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('api/Ventas?presupuesto=' + form.presupuesto);
      if(response.ok) {
        const data = await response.json();
        setVenta(data);
      }
    } catch {
      setVenta({ suma: 0, productos: [] });
    }
  }
  
  return (
    <div>
      <h4>Ventas</h4>
      <div className="row">
        <Form onSubmit={handleSubmit} className="col-12 col-sm-4"> 
          <FormGroup>
              <Label for="presupuesto">Presupuesto</Label>
              <Input
                required
                id="presupuesto"
                name="presupuesto"
                type="number"
                value={form.presupuesto}
                onChange={handleChange}
                max={1000000}
                min={0}
              />
            </FormGroup>
            <Button type="submit" block>
              Buscar
            </Button>
         </Form>
      </div>
      <div className="row">
        {
          venta.suma > 0 &&
          venta.productos.map(prod => (
            <div key={prod.id} className="col-12 col-md-6 p-2">
              <Card className="p-2">
                <h5>#{prod.id}</h5>
                <h2 className="mb-1">{numberFormat.format(prod.precio)}</h2>
                <p className="m-0">Categoría: <strong>{prod.categoriaNavigation.nombre}</strong></p>
              </Card>
            </div>  
          ))
        }
      </div>
    </div>
  );
}
