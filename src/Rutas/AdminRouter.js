import React, { Component, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import Dashboard from '../Componentes/Admin/Dashboard';
import Sidebar from '../Componentes/Admin/Sidebar';


export default class AdminRouter extends Component {
  render() {
    return (
      <Layout>
        <Sidebar />
        <Layout.Content>
          <Routes>
            <Route path='/admin' component={<Dashboard/>} />
          </Routes>
        </Layout.Content>
      </Layout>
    );
  }
}