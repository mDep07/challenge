import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Table, Button } from 'reactstrap';
import moment from 'moment';
import ProductForm from './ProductForm';

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
      return true
    }

    return false
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

  const submit = async (form) => await CreateProduct(form);
  
  return (
    <div>
      <h4>Productos</h4>
      <div className="row">
        <div className="order-2 order-md-1 col-12 col-md-8">
          <Table>
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
        </div>
        <div className="order-1 order-md-2 col-12 col-md-4 p-4 border">
          <ProductForm submit={submit} loading={loading} />
        </div>
      </div>
    </div>
  );
}
