import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Row, Col, Button } from 'antd';

import AuthService from '../Hooks/Auth';

const Login = () => {
    let navigate = useNavigate();

    const formRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = (e) => {
        console.log(e)
       

        setMessage("");
        setLoading(true);


        AuthService.login(email, password).then(
            () => {
                console.log("Login successful");
                navigate("/admin");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );

    };

    return (
        <div className='w-100'>

            <Form ref={formRef} onFinish={handleLogin} className='w-100'>
                <Row>
                    <Col span={24}>
                        <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label='Contraseña' name='password' rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="mt-2" block >Iniciar sesión </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </div>
    )


}

export default Login;