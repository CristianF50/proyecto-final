import React, { Component } from 'react';
import { Row, Col, Typography, Button, Popconfirm, Spin, PageHeader, Layout, Space, message, List, Modal, Card, Switch } from 'antd'
import { Link } from "react-router-dom";
import authHeader from "../../Hooks/auth-header";
import axios from 'axios';
import sider from './Sidebar';
import UsuariosModal from './UsuariosModal';
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
            clientes: false
        }
    }


    componentDidMount() {
        console.log("Auth",authHeader())
        this.getUsuarios();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.search !== this.props.search) {
            this.setState({ search: this.props.search }, () => this.getUsuarios())
        }
    }

    
    getUsuarios = (page = this.state.page, limit = this.state.limit, search = this.state.search) => {
        
        let urlParams = { page, limit }
        if (search)
        urlParams["search"] = search        
        
        this.setState({ loading: true, page, limit })
        axios.get(`${process.env.REACT_APP_API_URL}/usuarios`, {
            headers: authHeader(),
            params: {
                page,
                limit,
                search,
            }
        }).then(response => {
            console.log(response.data.data.itemsList)
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
                        title="Usuarios"
                        extra={[<Button onClick={() => this.setState({modalUsuarios: true})}> + </Button>]}
                    />
                    <Content className="admin-content content-bg pd-1">
                        <List
                            loading={this.state.loading}
                            className="component-list"
                            itemLayout="horizontal"
                            locale={{ emptyText: "Sin Usuarios" }}
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
                                <Col xs={24} md={10} className="center">
                                    <Text strong>Nombres</Text>
                                </Col>
                                
                                <Col xs={24} md={10} className="center">
                                    <Text strong>Email</Text>
                                </Col>
                            </Row>
                            }

                            renderItem={item => (
                                <List.Item className="component-list-item">
                                    <Card className="card-list">
                                        <Row className="w-100 ">
                                            <Col xs={24} md={10} className="center">
                                                <Text strong>{item.nombre}</Text>
                                            </Col>
                                            <Col xs={24} md={10} className="center">
                                                <Text >{item.email}</Text>
                                            </Col>

                                           
                                            <Col xs={24} md={4} className="center">
                                                <Space wrap>

                                                    <Button type="primary" onClick={() => {this.setState({usuario: item._id, modalUsuarios:true})}} className='btn-delete' danger  title="Editar"  > Editar </Button>
                                                    <Popconfirm
                                                        placement="topRight"
                                                        title="¿Deseas eliminar este usuario?"
                                                        onConfirm={() => axios.delete(`${process.env.REACT_APP_API_URL}/usuarios/delete`, { headers: authHeader(),params: { id: item._id } }).then((response) => {
                                                            message.success(response?.data?.message)
                                                            this.getUsuarios()
                                                        })
                                                            .catch((error) => {
                                                                message.error(error?.response?.data?.message);
                                                                this.getUsuarios();
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
                

                <UsuariosModal
                    visible={this.state.modalUsuarios}
                    usuario={this.state.usuario}
                    onClose={() => {
                        this.setState({ modalUsuarios: false, usuario: undefined })
                        this.getUsuarios(this.state.page)
                    }}
                />

            </>
        )
    }
}
