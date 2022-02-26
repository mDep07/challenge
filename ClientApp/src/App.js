import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Products from './components/Products';

import {FetchData} from './components/FetchData';

import './custom.css'

export default function App() {
  
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/products' component={Products} />
      <Route path='/fetch-data' component={FetchData} />
    </Layout>
  );
}
