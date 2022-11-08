import React, { useState, useEffect } from 'react';
import './App.scss';
import { Rate, Col, Row, Card, Typography, Form, Input, InputNumber, message, Select, Button, Modal } from 'antd';
import axios from 'axios';
import MyDocument from './Componentes/Documento.js';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';

const { Option } = Select;
const { Title } = Typography;

function App() {
  const [ciudades, setCiudades] = useState([]);
  const [turno, setTurno] = useState({});
  const [modalPDF, setModalPDF] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/ciudad/list`).then((res) => {
      console.log("ciudades", res.data.data)
      setCiudades(res.data.data);
    })
  }, []);

  const submitForm = (values) => {
    console.log("values", values)
    axios.post(`${process.env.REACT_APP_API_URL}/turno`, values).then((res) => {
      message.success("Turno creado correctamente");
      setTurno(res.data.data);
      setModalPDF(true);
      console.log("res", res)
    }).catch((err) => {
      console.log("err", err)
      message.error("Error al crear el turno, por favor intente nuevamente o verifique los datos ingresados");
    })
  }


  return (
    <div className="centered-div">

      <Card className='form-card'>
        <Row justify="center">
          <Title>Ticket de Turno</Title>
        </Row>
        <Row>
          <Form className='w-100' name='form-turno' layout="horizontal" onFinish={submitForm}>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item required label='Nombre de quien realizara el tramite' name='nombre_tramite'
                  rules={[{ required: true, message: 'Por favor, ingrese el nombre de quien realizara el tramite' },
                  () => ({
                    validator(_, value) {

                      if (RegExp(`^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`).test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Solo se permiten letras y espacios'))
                    }
                  })
                  ]}>
                  <Input placeholder="Nombre Completo" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item required label='CURP' name='curp'
                  rules={[{ required: true, message: 'Por favor, ingrese la CURP de quien realizara el tramite' },
                  () => ({
                    validator(_, value) {

                      if (RegExp("^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$").test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Ingrese una CURP valida'))
                    }
                  })
                  ]}>
                  <Input placeholder="CURP" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item required label='Nombre(s)' name='nombres'
                  rules={[{ required: true, message: 'Por favor, ingrese su nombre' },
                  () => ({
                    validator(_, value) {

                      if (RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$").test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Solo se permiten letras y espacios'))
                    }
                  })
                  ]}>
                  <Input placeholder="Nombre(s)" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item required label='Paterno' name='paterno'
                  rules={[{ required: true, message: 'Por favor, ingrese su apellido paterno' },
                  () => ({
                    validator(_, value) {

                      if (RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$").test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Solo se permiten letras y espacios'))
                    }
                  })
                  ]}>
                  <Input placeholder="Apellido Paterno" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item required label='Materno' name='materno'
                  rules={[{ required: true, message: 'Por favor, ingrese su apellido materno' },
                  () => ({
                    validator(_, value) {

                      if (RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$").test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Solo se permiten letras y espacios'))
                    }
                  })
                  ]}>
                  <Input placeholder="Apellido materno" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={6}>
                <Form.Item required label='Telefono' name='telefono'
                  rules={[{ required: true, message: 'Por favor, ingrese un teléfono' },
                  () => ({
                    validator(_, value) {

                      if (value.toString().length >= 9) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Ingrese un numero de telefono valido'))
                    }
                  })
                  ]}>
                  <InputNumber controls={false} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={6}>
                <Form.Item required label='Celular' name='celular'
                  rules={[{ required: true, message: 'Por favor, ingrese un teléfono celular' },
                  () => ({
                    validator(_, value) {

                      if (value.toString().length >= 9) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Ingrese un numero de telefono valido'))
                    }
                  })
                  ]}>
                  <InputNumber controls={false} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item required label='Correo' name='correo'
                  rules={[{ required: true, message: 'Por favor, ingrese un correo electronico' },
                  () => ({
                    validator(_, value) {

                      if (RegExp(`[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}`).test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Ingrese una correo electronico valido'))
                    }
                  })
                  ]}>
                  <Input placeholder="Correo Electronico" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="nivel"
                  label="Nivel al que desea ingresar o ya esta cursando"
                  required
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
                  name="ciudad"
                  label="Municipio donde desea estudiar el alumno"
                  required
                >
                  <Select placeholder="Porfavor, seleccione un municipio">
                    {ciudades.map((ciudad) => <Option key={ciudad._id} value={ciudad._id}>{ciudad.nombre}</Option>)}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="asuntos"
                  label="Seleccione el asunto que va a tratar"
                  required
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
      <Modal visible={modalPDF} onCancel={() => setModalPDF(false)} onOk={() => setModalPDF(false)}>
        <PDFDownloadLink document={<MyDocument data={turno} />} fileName={`${turno?.curp}.pdf`}>
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
      </Modal>

    </div>
  );
}

export default App;
