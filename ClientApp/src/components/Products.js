import React, { useState } from 'react';
import { Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import moment from 'moment';

import useForm from '../hooks/useForm';

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, precio: 60, fechaCarga: moment(), categoria: 'PRODUNO' },
    { id: 2, precio: 105, fechaCarga: moment(), categoria: 'PRODUNO' },
  ])

  const [form, handleChange, reset] = useForm({
    id: products.length + 1,
    precio: 0, 
    categoria: '',
    fechaCarga: moment().format()
  });

  const handleSumbit = (e) => {
    e.preventDefault();
    setProducts(state => ([...state, form]))
    console.log(form)
    reset();
  } 
  
  return (
    <div>
      <h4>Productos</h4>
      <div className="row">
        <Table className="col-8">
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
                    {product.precio}
                  </td>
                  <td>
                    {moment(product.fechaCarga).format('DD/MM/YYYY')}
                  </td>
                  <td>
                    {product.categoria}
                  </td>
                  <td>
                    <Button color="danger">
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Form onSubmit={handleSumbit} className="col-4">
          <input hidden type="number" value={form.id} />
          <input hidden type="datetime" value={form.fechaCarga} />
          <FormGroup>
            <Label for="precio">Precio</Label>
            <Input
              id="precio"
              name="precio"
              type="number"
              value={form.precio}
              onChange={handleChange}
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
                value="PRODUNO"
                onChange={handleChange}
                checked={form.categoria === "PRODUNO"}
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
                value="PRODDOS"
                onChange={handleChange}
                checked={form.categoria === "PRODDOS"}
              />
              {' '}
              <Label for="proddos" check>
                PRODDOS
              </Label>
            </FormGroup>
          </FormGroup>
          <Button>
            Cargar Producto
          </Button>
        </Form>
      </div>
    </div>
  );
}
