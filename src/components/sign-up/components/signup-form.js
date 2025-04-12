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

const SignUpForm = (props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoadingSignUp,
  } = props;
  return (
    <Form role="form">
      <Field name="first_name">
        {({ field, form }) => {
          return (
            <FormGroup>
              <InputGroup className="input-group-alternative">
             
                <InputGroupText>
                  <i className="ni ni-single-02" />
                </InputGroupText>
                <Input
                  className="form-control-alternative"
                  id="input-username"
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  disabled={isLoadingSignUp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  invalid={fieldValidateBool(field, form)}
                />
              </InputGroup>
              {fieldValidateBool(field, form) && (
                <FormFeedback>{errors.first_name}</FormFeedback>
              )}
            </FormGroup>
          );
        }}
      </Field>
      <Field name="last_name">
        {({ field, form }) => {
          return (
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupText>
                  <i className="ni ni-single-02" />
                </InputGroupText>
                <Input
                  className="form-control-alternative"
                  id="input-username"
                  placeholder="Last Name"
                  type="text"
                  name="last_name"
                  disabled={isLoadingSignUp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  invalid={fieldValidateBool(field, form)}
                />
              </InputGroup>
              {fieldValidateBool(field, form) && (
                <FormFeedback>{errors.last_name}</FormFeedback>
              )}
            </FormGroup>
          );
        }}
      </Field>
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
                  placeholder="Email: John@gmail.com"
                  type="text"
                  name="email"
                  disabled={isLoadingSignUp}
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
                  placeholder="Password"
                  type="password"
                  name="password"
                  disabled={isLoadingSignUp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  invalid={fieldValidateBool(field, form)}
                />
              </InputGroup>
              {fieldValidateBool(field, form) && (
                <FormFeedback>{errors.password}</FormFeedback>
              )}
            </FormGroup>
          );
        }}
      </Field>
      <Field name="confirm_password">
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
                  placeholder="Confirm Password"
                  type="password"
                  name="confirm_password"
                  disabled={isLoadingSignUp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm_password}
                  invalid={fieldValidateBool(field, form)}
                />
              </InputGroup>
              {fieldValidateBool(field, form) && (
                <FormFeedback>{errors.confirm_password}</FormFeedback>
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
          disabled={!dirty || isSubmitting || isLoadingSignUp}
          onClick={handleSubmit}
        >
          <span className="btn-inner--text">Sign Up</span>
          <span className="btn-inner--icon">
            {(isSubmitting || isLoadingSignUp) && <Spinner size="sm"> </Spinner>}
          </span>
        </Button>
      </div>
    </Form>
  );
};

export { SignUpForm };
