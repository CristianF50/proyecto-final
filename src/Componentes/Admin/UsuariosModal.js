import React, { Component } from "react";
import { Row, Col, Button, Modal, Typography, Form, Input, message, Spin, Select, Checkbox } from 'antd';
import authHeader from "../../Hooks/auth-header";
import axios from "axios";
const { Title } = Typography;

const { Option } = Select;



/**
 * @class ModalUsuarios
 * @description Modal para el CRUD de Usuarios
 */
class ModalUsuarios extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            
            usuario: {},
            
        }
    }
    formRef = React.createRef();
    componentDidMount() {
        
        
        if (this.props.usuario != undefined) {
            this.getUser();
        }
    }

    /**
    * @method onFinish
    * @param {object} values - Objecto que contiene los valores del formulario
    * @description Se ejecuta al hacer submit al formulario
    */
    onFinish = (values) => {
        if (this.props.usuario) {
            this.updateUser(values)
        } else {
            this.addUser(values)
        }
    }

    /**
    * @method addUser
    * @param {object} values - Objecto que contiene los valores modificados del formulario
    * @description Añade un nuevo registro de usuario
    */
    addUser = (values) => {
        if (this.state.loading) return

        this.setState({ loading: true }, () => {
            axios.post(`${process.env.REACT_APP_API_URL}/usuarios/add`, {
                ...values
            }, { headers: authHeader() })
            }).then(response => {
                message.success('¡Usuario Creado!')
                this.props.onCancel()
            }).catch(error => {
                
                message.error('Error al crear el Usuario')
            }).finally(() => this.setState({ loading: false }))
        
    }

    /**
    * @method updateUser
    * @param {object} values - Objecto que contiene los valores modificados del formulario
    * @description Actualiza un usuario
    */
    updateUser = (values) => {
        this.setState({ loading: true })
        axios.put(`${process.env.REACT_APP_API_URL}/usuarios/update`, {
            ...values,
            id: this.props.usuario,
        }, { headers: authHeader() }).then(response => {
            message.success('¡Usuario Actualizado!')
            this.props.onClose()
        }).catch(error => {
            console.log(error)
            message.error('Error al actualizar el Usuario')
        }).finally(() => this.setState({ loading: false }))
    }

    /**
        * @method getUser
        * @description Trae la informacion del usuario
        */
    getUser = () => {
        this.setState({ loading: true })
        axios.get(`${process.env.REACT_APP_API_URL}/usuarios/get`, {
            headers: authHeader(),
            params: {
                id: this.props.usuario
            }
        }).then(response => {
          
            console.log(response.data)
            
         
            
            this.setState({
                usuario: response.data.data,
                
            })
            this.formRef.current?.setFieldsValue({
                ...response.data.data
            })
        }).catch(error => {
            
            message.error('Error al obtener la información del usuario')
        }).finally(() => this.setState({ loading: false }))
    }

    render() {




        return (
            <Spin spinning={this.state.loading}>
                <Form
                    layout={"vertical"}
                    style={{ minHeight: '480px' }}
                    onFinish={this.onFinish}
                    ref={this.formRef}
                >
                    <Row justify="center" className="center">
                        <Col span={18}>
                            <Form.Item
                                name="nombre"
                                label="Nombre"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Ingrese el nombre',
                                    },
                                ]}
                            >
                                <Input maxLength={50} />
                            </Form.Item>
                           
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Email no valido',
                                    },
                                    {
                                        required: true,
                                        message: 'Ingrese el Email',
                                    },
                                ]}
                            >
                                <Input maxLength={60} />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                
                                label="Contraseña"
                                rules={[
                                    {
                                        required: this.props.usuario ? false : true,
                                        message: 'Ingrese una contraseña',
                                    },
                                ]}
                            >
                                <Input type="password" maxLength={60} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={24} className="text-center mt-1">
                            <Form.Item>
                                <Button htmlType="submit" type="primary" loading={this.state.loading}>
                                    Guardar
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        )
    }


}



export default function (props) {

    const { visible = false, onClose = () => { } } = props

    return <Modal
        visible={visible}
        onCancel={onClose}
        title={null}
        footer={null}
        closable={true}
        destroyOnClose={true}
        zIndex={1000}
        className="modal-zeus"
    >
        <Row className="mb-1">
            <Col span={24} className="center">
                <Title level={2}>Usuario</Title>
            </Col>
        </Row>
        <ModalUsuarios  {...props} />
    </Modal>

}