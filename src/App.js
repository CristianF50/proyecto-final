import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//componentes

import Landing from './Landing';
import Consulta from './Componentes/Consulta';
import AdminRouter from './Rutas/AdminRouter';
import Sidebar from './Componentes/Admin/Sidebar';
import Dashboard from './Componentes/Admin/Dashboard';
import Usuarios from './Componentes/Admin/Usuarios';
//css
import './App.scss';
// import './Styles/Theme/antd-manantial-theme.css'


/**
 *
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 0,
    }
  }



  render() {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="consulta" element={<Consulta />} />
          <Route path="admin/" element={<AdminRouter />}>
            <Route index={true} element={<div />} />
            <Route path="usuarios" element={<Usuarios />} />
          </Route>

          <Route path="admin/usuarios" element={<Usuarios />} />

        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;