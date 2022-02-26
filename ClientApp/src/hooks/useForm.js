import { useState } from "react";

export default function useForm(initial) {
  const [form, setForm] = useState(initial);

  const handleChange = ({ target }) => setForm(state => ({...state, [target.name]: target.value}));
  const resetForm = () => setForm(initial);

  return [form, handleChange, resetForm];
}