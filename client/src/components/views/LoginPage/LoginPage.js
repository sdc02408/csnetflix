import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Form, Input, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './Sections/LoginPage.css'
import '../../../index.css'

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
        .email('Email is invalid')
        .required('이메일을 입력하세요'),
        password: Yup.string()
        .min(6, '비밀번호는 최소 6글자입니다.')
        .required('비밀번호를 입력하세요'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
          .then(response => {
            if (response.payload.loginSuccess) {
              window.localStorage.setItem('userId', response.payload.userId);
              if (rememberMe === true) {
                window.localStorage.setItem('rememberMe', values.id);
              } else {
                localStorage.removeItem('rememberMe');
              }
              props.history.push("/");
            } else {
              setFormErrorMessage('아이디나 비밀번호를 확인하세요')
            }
          })
          .catch(err => {
            setFormErrorMessage('아이디나 비밀번호를 확인하세요')
            setTimeout(() => {
              setFormErrorMessage("")
            }, 3000);
          });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">

            <Title level={2} style={{color:'white'}}>로그인</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>

              <Form.Item required>
                <Input
                  id="email"
                  prefix={<UserOutlined type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="이메일을 입력하세요"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<LockOutlined type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
                {/*<Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>*/}
                {/*<a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>*/}
                {/*  forgot password*/}
                {/*</a>*/}
                <div>
                  <Button type="default" htmlType="submit" className="login-form-button common_btn" style={{minWidth: '100%',border:'none' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                   로그인
                  </Button>
                </div>
               
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


