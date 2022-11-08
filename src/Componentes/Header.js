import React from "react";
import { Layout, Row, Col, Button, Typography, Menu, Drawer, Space, Modal } from 'antd';

import { Link } from "react-router-dom"
import { MenuOutlined } from '@ant-design/icons';
import Login from "./Login";
import { SetUser } from "../Hooks/Logged";

const { Header } = Layout;
const { Text } = Typography;

class HeaderPublic extends React.Component {

    static contextType = SetUser

    redirectLink = "/";
    constructor(props) {
        super(props)
        this.state = {
            modalLogin: false,
        }
    }
    render() {
       
        return (
            <div className={this.props.className}>
                <Header className="header-public">
                    <Row>
                        <Col span={3}>
                            <Link to="/">Sistema de Turnos</Link>
                        </Col>
                        <Col span={14} align="right">
                            <Menu className="header-menu width-100" mode="horizontal" theme="dark" defaultSelectedKeys={['1']}>

                                <Menu.Item className="item" key="1">
                                    <Link to="/" >
                                        Registrar Turno
                                    </Link>
                                </Menu.Item>

                                <Menu.Item className="item" key="2">
                                    <Link smooth to="/consulta" >
                                        Editar / Visualizar Turno
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link onClick={() => this.setState({modalLogin: true})} >
                                        Log In Administrador
                                    </Link>
                                </Menu.Item>


                            </Menu>
                           
                        </Col>
                        
                    </Row>

                    <Modal style={{ zIndex: 100 }} visible={this.state.modalLogin} onCancel={() => this.setState({modalLogin: false})} onOk={() => this.setState({modalLogin: false})}>
                        <Login />
                    </Modal>
                </Header>



            </div>
        )
    }
}


export default (props) => {

    return <HeaderPublic {...props} />
}