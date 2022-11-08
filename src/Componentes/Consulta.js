import React, { useState, useEffect } from 'react';
import '../App.scss';
import { Rate, Col, Row, Card, Typography, Form, Input, InputNumber, message, Select, Button, Modal } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MyDocument from '../Componentes/Documento.js';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ModalConsulta from './ModalConsulta';


const { Option } = Select;
const { Title } = Typography;

function App() {
    const [curp, setCurp] = useState([]);
    const [turno, setTurno] = useState({});
    const [modalConsulta, setmodalConsulta] = useState(false);

    useEffect(() => {
        
    }, []);

    const submitForm = (values) => {
        console.log("values", values)
        axios.get(`${process.env.REACT_APP_API_URL}/turno/consulta`, {
            params: {
                ...values
            }
        }).then((res) => {
            message.success("Turno encontrado");
            setTurno(values.turno);
            setCurp(values.curp);
            setmodalConsulta(true);
        }).catch((err) => {
            console.log("err", err)
            message.error("Error al buscar su turno, por favor intente nuevamente o verifique los datos ingresados");
        })
    }


    return (
        <div className="centered-div">
            <Card className='form-card'>
                <Row justify="center">
                    <Title>Visualizar / Modificar Turno</Title>
                </Row>
                <Row>
                    <Form className='w-100' name='form-turno' layout="horizontal" onFinish={submitForm}>
                        <Row gutter={24}>
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


                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <Form.Item required label='No. Turno' name='turno'
                                    rules={[{ required: true, message: 'Por favor, ingrese su numero de turno asignado' }]}>
                                    <InputNumber controls={false} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>

                            <Row justify="center" className='w-100'>
                                <Col>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Consulta
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Row>
                    </Form>
                </Row>
                <Row justify="center">
          <Link to="/">No tengo un turno</Link>
        </Row>
            </Card>
            <ModalConsulta curp={curp} turno={turno} visible={modalConsulta} onCancel={() => setmodalConsulta(false)}/>

        </div>
    );
}

export default App;
