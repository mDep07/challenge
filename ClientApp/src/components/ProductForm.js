import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import useForm from '../hooks/useForm';

export default function ProductForm({ submit, loading }) {
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log('asdasd');

    const FetchCategorias = async () => {
      //api/Productos/Categorias
      const response = await fetch('api/Productos/Categorias');
      const data = await response.json();
      setCategories(data);
    }

    FetchCategorias();

  },[])

  const [form, handleChange, reset] = useForm({
    precio: '', 
    categoria: 0,
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    if(form.precio <= 0) {
      setError('El precio debe ser mayor a 0.')
    } else if (form.categoria === 0) {
      setError('Debe seleccionar una categoría.')
    }

    if(error) {
      return
    }

    const response = await submit(form);
    if(response)
      reset();
  }

  return (
    <Form onSubmit={handleSumbit}>
      <h4 className="text-center">Agregar Producto</h4>
      <hr />
      { error && <small className="text-danger">{error}</small> }
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
        <Label>Categoría</Label>
        {
          categories.map(category => (
            <FormGroup check key={category.id}>
              <Input
                // required
                id={category.nombre}
                name="categoria"
                type="radio"
                value={category.id}
                onChange={handleChange}
                checked={parseInt(form.categoria) === category.id}
                disabled={loading}
              />
              {' '}
              <Label for={category.nombre}>
                {category.nombre}
              </Label>
            </FormGroup>
          ))
        }
      </FormGroup>
      <Button disabled={loading} block>
        Cargar Producto
      </Button>
    </Form>
  )
}