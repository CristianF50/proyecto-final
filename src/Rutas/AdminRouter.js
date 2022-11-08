import React, { Component, useEffect } from 'react';
import { BrowserRouter, Route, RouterProvider,createBrowserRouter, Routes, Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import Dashboard from '../Componentes/Admin/Dashboard';
import Sidebar from '../Componentes/Admin/Sidebar';
import Usuarios from '../Componentes/Admin/Usuarios';


export default class AdminRouter extends Component {

  


  render() {

    return (
      <Layout>
        <Sidebar />
        <Layout.Content className='h-100' style={{margin: 15}}>
          <Outlet/>
        </Layout.Content>
      </Layout>
    );
  }
}