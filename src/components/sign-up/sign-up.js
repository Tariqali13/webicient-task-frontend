import React from 'react';
import { Col, Card, CardHeader, CardBody } from 'reactstrap';
import AuthTemplate from '@/layouts/auth-template';
import { validateSignUpForm } from './validation';
import { Formik } from 'formik';
import { SignUpForm } from './components';
import { SIGNUP } from './queries';
import { useMutation } from 'react-query';
import { Message } from '@/components/alert/message';
import Router from 'next/router';
import Link from 'next/link';

const SignUp = () => {
  const { mutate: register, isLoading: isLoadingSignUp } = useMutation(SIGNUP);
  return (
    <AuthTemplate title="Sign Up">
      <Col lg="5" md="7">
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign Up </small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Formik
              initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirm_password: '',
              }}
              validationSchema={validateSignUpForm}
              onSubmit={async (values, actions) => {
                delete values.confirm_password;
                register(values, {
                  onSuccess: async (res) => {
                    Message.success(res);
                    Router.push('/', '/', {
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
                  <SignUpForm
                    {...formikProps}
                    isLoadingSignUp={isLoadingSignUp}
                  />
                );
              }}
            </Formik>
            <p className="w-full text-center">
              Already have an account. <br />
              <Link
                href={'/'}
                className="text-blue text-underline cursor-pointer"
              >
                Login Here
              </Link>
            </p>
          </CardBody>
        </Card>
      </Col>
    </AuthTemplate>
  );
};

export default SignUp;
