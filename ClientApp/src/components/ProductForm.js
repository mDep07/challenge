import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import useForm from '../hooks/useForm';

export default function ProductForm({ submit, loading }) {
  const [categories, setCategories] = useState([]);

  const [form, handleChange, reset] = useForm({
    precio: '', 
    categoria: 0,
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    const response = await submit(form);
    if(response)
      reset();
  } 

  return (
    <Form onSubmit={handleSumbit} className="order-1 order-md-2 col-12 col-md-4 p-4 border">
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
          <Label for="produno">
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
          <Label for="proddos">
            PRODDOS
          </Label>
        </FormGroup>
      </FormGroup>
      <Button disabled={loading}>
        Cargar Producto
      </Button>
    </Form>
  )
}