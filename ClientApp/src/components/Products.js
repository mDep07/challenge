import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import moment from 'moment';

import useForm from '../hooks/useForm';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const numberFormat = useMemo(() => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }));

  useEffect(() => {
    setLoading(true)
    const FetchProducts = async () => {
      const response = await fetch('api/Productos');
      const data = await response.json();
      
      setProducts([...data])
      setLoading(false)
    }

    FetchProducts();
  }, []);

  const CreateProduct = useCallback(async (product) => {
    const options = { 
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product) 
    };
    const createdProduct = await fetch('api/Productos', options);
    console.log({createdProduct})
    if(createdProduct.ok) {
      const newProduct = await createdProduct.json();
      console.log({newProduct})
      setProducts(state => ([...state, newProduct]))
      reset();
      return
    }

    reset();
  }, [])

  const DeleteProduct = useCallback(async (id) => {
    const options = { 
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    };
    const deletedProduct = await fetch('api/Productos/' + id, options);
    if(deletedProduct.ok) {
      setProducts(state => ([...state.filter(prod => prod.id !== id)]))
      return
    }
  }, [])

  const [form, handleChange, reset] = useForm({
    precio: '', 
    categoria: 0,
  });

  const handleSumbit = (e) => {
    e.preventDefault();
    CreateProduct(form);
  } 
  
  return (
    <div>
      <h4>Productos</h4>
      <div className="row">
        <Table className="order-2 order-md-1 col-12 col-md-8">
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                Precio
              </th>
              <th>
                Fecha de Carga
              </th>
              <th>
                Categoría
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product => (
                <tr key={product.id}>
                  <th scope="row">
                    {product.id}
                  </th>
                  <td>
                    {numberFormat.format(product.precio )}
                  </td>
                  <td>
                    {moment(product.fechaCarga).format('DD/MM/YYYY')}
                  </td>
                  <td>
                    {product.categoriaNavigation.nombre}
                  </td>
                  <td>
                    <Button color="danger" onClick={() => DeleteProduct(product.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Form onSubmit={handleSumbit} className="order-1 order-md-2 col-12 col-md-4 p-4 border" style={{ }}>
          <FormGroup>
            <Label for="precio">Precio</Label>
            <Input
              required
              id="precio"
              name="precio"
              type="number"
              value={form.precio}
              onChange={handleChange}
              disabled={loading}
            />
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>
              Categoría
            </legend>
            <FormGroup check>
              <Input
                required
                id="produno"
                name="categoria"
                type="radio"
                value="1"
                onChange={handleChange}
                checked={form.categoria === "1"}
                disabled={loading}
              />
              {' '}
              <Label for="produno" check>
                PRODUNO
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                required
                id="proddos"
                name="categoria"
                type="radio"
                value="2"
                onChange={handleChange}
                checked={form.categoria === "2"}
                disabled={loading}
              />
              {' '}
              <Label for="proddos" check>
                PRODDOS
              </Label>
            </FormGroup>
          </FormGroup>
          <Button disabled={loading}>
            Cargar Producto
          </Button>
        </Form>
      </div>
    </div>
  );
}
