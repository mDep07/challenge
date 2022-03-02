import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Products from './components/Products';

import './custom.css';

export const numberFormat = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

export default function App() {
  
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/products' component={Products} />
    </Layout>
  );
}
