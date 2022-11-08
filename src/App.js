import React, { useState, useEffect } from 'react';
import './App.scss';
import { Rate, Col, Row, Card, Typography, Form, Input, InputNumber, Select, Button } from 'antd';
import axios from 'axios';


const { Option } = Select;
const { Title } = Typography;

function App() {
  const [ciudades, setCiudades] = useState([]);
  

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/ciudad/list`).then((res) => {
      console.log("ciudades",res.data.data)
      setCiudades(res.data.data);
    })
  }, []);


  return (
    <div className="centered-div">

      <Card className='form-card'>
        <Row justify="center">
          <Title>Ticket de Turno</Title>
        </Row>
        <Row>
          <Form className='w-100' name='form-turno' layout="horizontal">
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item label='Nombre de quien realizara el tramite' name='nombre-tramite'>
                  <Input placeholder="Nombre Completo" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item label='CURP' name='curp'>
                  <Input placeholder="CURP" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item label='Nombre(s)' name='nombres'>
                  <Input placeholder="Nombre(s)" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item label='Paterno' name='paterno'>
                  <Input placeholder="Apellido Paterno" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item label='Materno' name='materno'>
                  <Input placeholder="Apellido materno" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={6}>
                <Form.Item label='Telefono' name='telefono'>
                  <InputNumber controls={false} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={6}>
                <Form.Item label='Celular' name='celular'>
                  <InputNumber controls={false} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item label='Correo' name='correo'>
                  <Input placeholder="Correo Electronico" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="nivel"
                  label="Nivel al que desea ingresar o ya esta cursando"
                >
                  <Select placeholder="Please select favourite colors">
                    <Option value="red">Red</Option>
                    <Option value="green">Green</Option>
                    <Option value="blue">Blue</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="nivel"
                  label="Municipio donde desea estudiar el alumno"
                >
                  <Select placeholder="Porfavor, seleccione un municipio">
                    {ciudades.map((ciudad) => <Option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</Option>)}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="nivel"
                  label="Seleccione el asunto que va a tratar"
                >
                  <Select placeholder="Please select favourite colors">
                    <Option value="red">Red</Option>
                    <Option value="green">Green</Option>
                    <Option value="blue">Blue</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Row justify="center" className='w-100'>
                <Col>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Generar Turno
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

            </Row>
          </Form>
        </Row>
      </Card>

    </div>
  );
}

export default App;
