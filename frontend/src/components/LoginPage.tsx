import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Username is too short').required('Username is required'),
  password: Yup.string().min(3, 'Password is too short').required('Password is required'),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post('http://localhost:8080/login', values);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      setLoginError('Failed to login. Please check your username and password.');
      console.error(error);
    }
  };

  return (
    <div>
      <Title>Login</Title>
      {loginError && <Alert message={loginError} type='error' showIcon />}
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onFinish={handleSubmit}>
            <Form.Item
              help={touched.username && errors.username ? errors.username : ''}
              validateStatus={touched.username && errors.username ? 'error' : undefined}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Username'
                name='username'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
            </Form.Item>
            <Form.Item
              help={touched.password && errors.password ? errors.password : ''}
              validateStatus={touched.password && errors.password ? 'error' : undefined}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' loading={isSubmitting}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
