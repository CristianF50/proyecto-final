import React, { Component } from 'react';
import { Row, Col, Typography, Button, Popconfirm, Spin, PageHeader, Layout, Space, message, List, Modal, Card, Switch } from 'antd'
import { Link } from "react-router-dom";
import authHeader from "../../Hooks/auth-header";
import axios from 'axios';
import sider from './Sidebar';
import UsuariosModal from './UsuariosModal';
import ModalConsulta from '../ModalConsulta';
const { Content } = Layout;
const { Text } = Typography

/**
 *
 *
 * @export
 * @class Usuarios
 * @extends {Component}
 * @description Vista donde se listan todos los usuarios
 */
export default class Usuarios extends Component {

    back = () => {
        this.props.history.goBack();
    }


   
    constructor(props) {
        super(props)
        let { page, limit } = Object.fromEntries(new URLSearchParams(this.props.history?.location?.search?.replace("?","")))
        this.state = {
            usuarios: [],
            page: page ?? 1,
            limit: limit ?? 10,
            total: 0,
            usuario: undefined,
            search: this.props.search,
            clientes: false,
            curp: null,
            turno: null,
        }
    }


    componentDidMount() {
        console.log("Auth",authHeader())
        this.getTurnos();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.search !== this.props.search) {
            this.setState({ search: this.props.search }, () => this.getUsuarios())
        }
    }

    
    getTurnos = (page = this.state.page, limit = this.state.limit, search = this.state.search) => {
        
        let urlParams = { page, limit }
        if (search)
        urlParams["search"] = search        
        
        this.setState({ loading: true, page, limit })
        axios.get(`${process.env.REACT_APP_API_URL}/turnos`, {
            headers: authHeader(),
            params: {
                page,
                limit,
                search,
                paginate: true,
            }
        }).then(response => {
            console.log('res turnos',response)
            this.setState({
                usuarios: response.data.data.itemsList,
                page: response.data.data.currentPage,
                total: response.data.data.itemCount,
            })
        }).catch(error => {
            
            message.error('Error al obtener la Información')
        }).finally(() => this.setState({ loading: false }))
    }

    

   


    render() {


        return (
            <>
                <slider/>
                <Spin spinning={false}>
                    <PageHeader
                        className="admin-page-header"
                        title="Turnos"
                        extra={[<Button onClick={() => this.setState({modalUsuarios: true})}> + </Button>]}
                    />
                    <Content className="admin-content content-bg pd-1">
                        <List
                            loading={this.state.loading}
                            className="component-list"
                            itemLayout="horizontal"
                            locale={{ emptyText: "Sin Turnos" }}
                            dataSource={this.state.usuarios}
                            pagination={{
                                onChange:this.getUsuarios,
                                current: this.state.page,
                                pageSize: this.state.limit,
                                total: this.state.total,
                                showSizeChanger: true,
                                hideOnSinglePage: false,
                                position: 'bottom',
                                className: "flex-left"

                            }}
                            header={<Row className="width-100 " >
                                <Col span={7} className="center">
                                    <Text strong>Nombre</Text>
                                </Col>
                                <Col span={6} className="center">
                                    <Text strong>Ciudad</Text>
                                </Col>
                                <Col span={6} className="center">
                                    <Text strong>CURP</Text>
                                </Col>
                                <Col span={2} className="center">
                                    <Text strong>Estatus</Text>
                                </Col>
                            </Row>
                            }

                            renderItem={item => (
                                <List.Item className="component-list-item">
                                    <Card className="card-list">
                                        <Row className="w-100 ">
                                            <Col span={7} className="center">
                                                <Text strong>{item.nombre_tramite}</Text>
                                            </Col>
                                            <Col span={6} className="center">
                                                <Text >{item.ciudad.nombre}</Text>
                                            </Col>
                                            <Col span={6} className="center">
                                                <Text >{item.curp}</Text>
                                            </Col>
                                            <Col span={2} className="center">
                                                <Text >{item.estatus === 1 ? "Resuelto" : "Pendiente"}</Text>
                                            </Col>
                                           
                                            <Col span={3} className="center">
                                                <Space wrap>

                                                    <Button type="primary" onClick={() => {this.setState({usuario: item._id, modalUsuarios:true, curp: item.curp, turno:item.turno})}} className='btn-delete' danger  title="Editar"  > Editar </Button>
                                                    <Popconfirm
                                                        placement="topRight"
                                                        title="¿Deseas eliminar este turno?"
                                                        onConfirm={() => axios.delete(`${process.env.REACT_APP_API_URL}/turno/delete`, { headers: authHeader(),params: { id: item._id } }).then((response) => {
                                                            message.success(response?.data?.message)
                                                            this.getTurnos()
                                                        })
                                                            .catch((error) => {
                                                                message.error(error?.response?.data?.message);
                                                                this.getTurnos();
                                                            })
                                                        }
                                                        okText="Si"
                                                        cancelText="No"
                                                    >
                                                        <Button type="primary" className='btn-delete' danger  title="Eliminar"  > Eliminar </Button>
                                                    </Popconfirm>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Card>
                                </List.Item>
                            )}
                        />

                    </Content>
                </Spin>
                

                <ModalConsulta
                    visible={this.state.modalUsuarios}
                    curp = {this.state.curp}
                    turno = {this.state.turno}
                    admin = {true}
                    onCancel={() => {
                        this.setState({ modalUsuarios: false, usuario: undefined })
                        this.getTurnos(this.state.page)
                    }}
                />

            </>
        )
    }
}
