import React from 'react';
import { Col, Card, CardHeader, CardBody } from 'reactstrap';
import AuthTemplate from '@/layouts/auth-template';
import { validateLoginForm } from './validation';
import { Formik } from 'formik';
import { LoginForm } from './components';
import { LOGIN } from './queries';
import { useMutation } from 'react-query';
import { Message } from '@/components/alert/message';
import { saveLocalStorageCred } from '@/utils/local-storage';
import Router from 'next/router';
import Link from 'next/link';
const Login = () => {
  const { mutate: login, isLoading: isLoadingLogin } = useMutation(LOGIN);
  return (
    <AuthTemplate title="Login">
      <Col lg="5" md="7">
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in </small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validateLoginForm}
              onSubmit={async (values, actions) => {
                login(values, {
                  onSuccess: async (res) => {
                    saveLocalStorageCred(res);
                    Message.success(res);
                    Router.push('/admin/projects', '/admin/projects', {
                      shallow: true,
                    });
                    return await res;
                  },
                  onError: async (err) => {
                    Message.error(err);
                    actions.resetForm();
                    return await err;
                  },
                });
              }}
            >
              {(formikProps) => {
                return (
                  <LoginForm {...formikProps} isLoadingLogin={isLoadingLogin} />
                );
              }}
            </Formik>
            <p className="w-full text-center">
              Don't have an account. <br />
              <Link
                href={'/sign-up'}
                className="text-blue text-underline cursor-pointer"
              >
                Create Account
              </Link>
            </p>
          </CardBody>
        </Card>
      </Col>
    </AuthTemplate>
  );
};

export default Login;
