import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import { Field } from 'formik';
import { fieldValidateBool } from '@/src/utils/form';
import _get from 'lodash.get';
import PropTypes from 'prop-types';

const ProjectForm = (props) => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoadingSave,
    dirty,
    isSubmitting,
    isEdit = false,
  } = props;

  return (
    <Container>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">Project</h6>
                <Row className="d-flex align-items-center">
                  <Col>
                    <Field name={`title`}>
                      {({ field, form }) => {
                        return (
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Title
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="Project Title"
                              type="text"
                              name={`title`}
                              disabled={isLoadingSave}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.title}
                              invalid={fieldValidateBool(field, form)}
                            />
                            {fieldValidateBool(field, form) && (
                              <FormFeedback>{errors.title}</FormFeedback>
                            )}
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                  <Col>
                    <Field name={`description`}>
                      {({ field, form }) => {
                        return (
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Description
                            </label>
                            <Input
                              className="form-control-alternative py-1"
                              id="input-username"
                              placeholder="Project Description"
                              type="textarea"
                              name={`description`}
                              disabled={isLoadingSave}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                              invalid={fieldValidateBool(field, form)}
                            />
                            {fieldValidateBool(field, form) && (
                              <FormFeedback>{errors.description}</FormFeedback>
                            )}
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                </Row>
                <Button
                  className="btn-icon btn-3 my-4"
                  color="primary float-right"
                  type="button"
                  disabled={!dirty || isSubmitting || isLoadingSave}
                  onClick={handleSubmit}
                >
                  <span className="btn-inner--text">
                    {isEdit ? 'Update' : 'Create'}
                  </span>
                  <span className="btn-inner--icon">
                    {(isSubmitting || isLoadingSave) && (
                      <Spinner size="sm"> </Spinner>
                    )}
                  </span>
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

ProjectForm.propTypes = {
  values: PropTypes.any,
  errors: PropTypes.any,
  dirty: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isLoadingSave: PropTypes.bool,
  isEdit: PropTypes.bool,
};

export { ProjectForm };
