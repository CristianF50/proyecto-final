import React, { Component } from "react";
import { Row, Col, Button, Modal, Typography, Form, Input, message, Spin, Drawer, Space, InputNumber, DatePicker, Upload, Select, Tag, Switch } from 'antd';
import axios from 'axios';

import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import authHeader from "../Hooks/auth-header";
import { FormWrapper } from "@ant-design/charts";
const { Title, Text } = Typography;
const { Option } = Select;
const moment = require('moment');







/**
 *
 *
 * @class ModalTransaccion
 * @extends {Component}
 */
class ModalTransaccion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turno_id: null,
      ciudades: []
    }
  }

  modalConsulta = React.createRef();

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/ciudad/list`).then((res) => {
      console.log("ciudades", res.data.data)
      this.setState({ ciudades: res.data.data });
    })

    if (this.props.curp) {
      this.getTransaccion()
    }

  }


  getTransaccion = () => {
    this.setState({ loading: true })
    axios.get(`${process.env.REACT_APP_API_URL}/turno/consulta`, {
      params: {
        curp: this.props.curp,
        turno: this.props.turno
      }
    }).then(response => {
      let consulta = response.data.data
      console.log(consulta)
      this.setState({ turno_id: consulta._id })

      this.modalConsulta?.current?.setFieldsValue({
        ...consulta,
        asuntos: consulta.asunto,
      })




    }).catch(error => {
      console.log("error", error);
      message.error('Error al obtener la Información')
    }).finally(() => this.setState({ loading: false }))
  }



  updateTransaccion = (values) => {

    if (this.props.admin) {
      axios.put(`${process.env.REACT_APP_API_URL}/turnos/update`, {
        _id: this.state.turno_id,
        ...values,
      }, { headers: authHeader() }).then(response => {
        message.success('Turno actualizada')

        this.props.onCancel()
      }).catch(error => {
        console.log("error", error);
        let msg = 'Error al actualizar la transacción'
        message.error(msg)
      })
    } else {

      this.setState({ loading: true })
      axios.put(`${process.env.REACT_APP_API_URL}/turno/consulta/update`, {
        _id: this.state.turno_id,
        ...values,
      }).then(response => {
        message.success('Turno actualizado')

        this.props.onCancel()
      }).catch(error => {
        console.log("error", error);
        let msg = 'Error al actualizar la transacción'
        message.error(msg)
      })
    }
  }

  /**
  * @method onFinish
  * @description Cierra la transaccion
  */
  onFinish = (values) => {

    this.updateTransaccion(values)

  }










  render() {

    return (
      <div className="centered-div">
        <Row>
          <Form className='w-100' name='form-turno' layout="horizontal" ref={this.modalConsulta} onFinish={this.onFinish}>
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
                  <Input disabled placeholder="Nombre Completo" />
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
                  <Input disabled placeholder="CURP" />
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
                  <Select placeholder="Seleccione elm Nivel que esta cursonl">
                    <Option value="bachillerato">Bachillerato</Option>
                    <Option value="licenciatura">Licenciatura</Option>
                    <Option value="primaria">Primaria</Option>
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
                    {this.state.ciudades.map((ciudad) => <Option key={ciudad._id} value={ciudad._id}>{ciudad.nombre}</Option>)}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="asuntos"
                  label="Seleccione el asunto que va a tratar"
                  required
                >
                  <Select placeholder="Selecciona un asunto">
                    <Option value="revalidacion">Revalidacion</Option>
                    <Option value="escolares">Escolares</Option>
                    <Option value="cambio_escuela">Cambio de escuela</Option>
                  </Select>
                </Form.Item>
              </Col>

              {this.props.admin ? <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item name='estatus' label="Resuelto">
                  <Switch/>
                </Form.Item>
              </Col> : null}


              <Row justify="center" className='w-100'>
                <Col>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Modificar Turno
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

            </Row>
          </Form>
        </Row>

      </div>
    );
  }
}


export default function (props) {
  const { visible = false, onCancel = () => { } } = props

  return <Modal
    title={null}
    footer={null}
    visible={visible}
    onCancel={onCancel}
    closable={true}
    width="700"
    destroyOnClose={true}
    zIndex={1000}
    placement="bottom"
  >
    <div className="center w-100">
      <Title level={3}>Turno</Title>
    </div>
    <ModalTransaccion {...props} />
  </Modal>

}