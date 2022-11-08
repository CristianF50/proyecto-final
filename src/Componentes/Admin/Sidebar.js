import React, { useContext, useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;

/**
 * @const Sidebar
 * @description Header del sistema
 */
const Sidebar = (props) => {

    
    const [redirect, setRedirect] = useState(false)
    const [key, setKey] = useState('')
    const [modal_visible, setModalVisible] = useState(false)

    /**
     * @const cerrarSesion
     * @description Cierra la sesion
     */
    const cerrarSesion = () => {
        
        sessionStorage.clear();
        setRedirect(true);

    };

    useEffect(() => {
        
        

    }, [])

        return (
            <Sider 
                theme="light" 
                className="hm-sider" 
                width={250}
                breakpoint="lg"
                collapsedWidth="0"
            >
                {redirect ? ()=>{redirect('/')} : null}

                <Menu 
                    className="hm-menu" 
                    defaultSelectedKeys={['0']} 
                    mode="inline"  
                    onClick={({key}) => setKey(key)}
                    selectedKeys={[key]}
                >

                    <Menu.ItemGroup
                        title="NAVEGACIÓN"
                    >                
                        <Menu.Item  key="customer-resume">
                            <Link to={"/customer/resume"}>
                                Resumen
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="customer-invertir">
                            <Link to={"/customer/invertir"}>
                                Invertir
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="customer-mi-cuenta">
                            <Link to="/customer/mi-cuenta">
                                Mi Cuenta
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="customer-cuentas">
                            <Link to="/customer/cuentas">
                                Cuentas
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="customer-reventa">
                            <Link to={"/customer/reventa"}>
                                Reventa
                            </Link>
                        </Menu.Item> 
                        
                    </Menu.ItemGroup> 
                    <Menu.ItemGroup title="SOPORTE">
                        <Menu.Item key="cerrar-sesion">
                            <Link onClick={cerrarSesion}>
                                Cerrar sesión
                            </Link>
                        </Menu.Item>

                    </Menu.ItemGroup>

                    
                </Menu>

            </Sider>
        )
}

export default function sider (props){
    
    return <Sidebar {...props} />

};