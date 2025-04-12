import React from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Spinner,
} from 'reactstrap';
import { fieldValidateBool } from '@/src/utils/form';
import { Field } from 'formik';

// type Props = {
//   values: any,
//   errors: any,
//   dirty: boolean,
//   isSubmitting: boolean,
//   handleChange: Function,
//   handleBlur: Function,
//   handleSubmit: Function,
//   isLoadingLogin: boolean,
// };

const LoginForm = (props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoadingLogin,
  } = props;
  return (
    <Form role="form">
      <Field name="email">
        {({ field, form }) => {
          return (
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupText>
                  <i className="ni ni-email-83" />
                </InputGroupText>
                <Input
                  className="form-control-alternative"
                  id="input-username"
                  placeholder="John@gmail.com"
                  type="text"
                  name="email"
                  disabled={isLoadingLogin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  invalid={fieldValidateBool(field, form)}
                />
              </InputGroup>
              {fieldValidateBool(field, form) && (
                <FormFeedback>{errors.email}</FormFeedback>
              )}
            </FormGroup>
          );
        }}
      </Field>
      <Field name="password">
        {({ field, form }) => {
          return (
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupText>
                  <i className="ni ni-lock-circle-open" />
                </InputGroupText>
                <Input
                  className="form-control-alternative"
                  id="input-username"
                  placeholder="******"
                  type="password"
                  name="password"
                  disabled={isLoadingLogin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  // invalid={fieldValidateBool(field, form)}
                />
              </InputGroup>
              {fieldValidateBool(field, form) && (
                <FormFeedback>{errors.password}</FormFeedback>
              )}
            </FormGroup>
          );
        }}
      </Field>
      <div className="text-center">
        <Button
          className="btn-icon btn-3 my-4"
          color="primary"
          type="button"
          disabled={!dirty || isSubmitting || isLoadingLogin}
          onClick={handleSubmit}
        >
          <span className="btn-inner--text">Sign In</span>
          <span className="btn-inner--icon">
            {(isSubmitting || isLoadingLogin) && <Spinner size="sm"> </Spinner>}
          </span>
        </Button>
      </div>
    </Form>
  );
};

export { LoginForm };
