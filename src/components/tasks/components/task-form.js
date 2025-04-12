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
import ReactSelect from '@/components/react-select/react-select';
import { statuses } from '@/src/constants/tasks';
import { useQuery } from 'react-query';
import { GET_USER_PROJECTS } from '@/components/projects/queries';
import reactQueryConfig from '@/constants/react-query-config';
import Router from 'next/router';

const TaskForm = (props) => {
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
    projectId = '',
  } = props;
  const {
    data: userProjects,
    isLoading,
    isFetching,
  } = useQuery(['USER_PROJECTS', {}], GET_USER_PROJECTS, {
    ...reactQueryConfig,
    enabled: !projectId,
  });
  const handleCreate = () => {
    Router.push('/admin/projects/create', '/admin/projects/create', {
      shallow: true,
    });
  };
  return (
    <Container>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">Task</h6>
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
                              placeholder="Task Title"
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
                              placeholder="Task Description"
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

                <Row className="d-flex align-items-center">
                  <Col>
                    <Field name="status">
                      {({ field, form }) => {
                        return (
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Select Status
                            </label>
                            <ReactSelect
                              isMulti={false}
                              isCreateable={false}
                              defaultValue={values.statusObj}
                              isDisabled={isLoadingSave}
                              options={statuses}
                              getOptionLabel="label"
                              getOptionValue="value"
                              isSearchable={true}
                              placeholder="Select Status"
                              handleChange={(value) => {
                                form.setFieldValue(
                                  field.name,
                                  value.value,
                                  true,
                                );
                                form.setFieldValue('statusObj', value, true);
                              }}
                            />
                            {fieldValidateBool(field, form) && (
                              <FormFeedback>{errors.status}</FormFeedback>
                            )}
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                  <Col>
                    <Field name={`due_date`}>
                      {({ field, form }) => {
                        return (
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Due Date
                            </label>
                            <Input
                              className="form-control-alternative py-1"
                              id="input-username"
                              placeholder="Due Date"
                              type="date"
                              min={new Date().toISOString().split('T')[0]}
                              name={`due_date`}
                              disabled={isLoadingSave}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.due_date}
                              invalid={fieldValidateBool(field, form)}
                            />
                            {fieldValidateBool(field, form) && (
                              <FormFeedback>{errors.due_date}</FormFeedback>
                            )}
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                </Row>

                {!projectId && (
                  <Row className="d-flex align-items-center">
                    <Col>
                      <Field name="project_id">
                        {({ field, form }) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Select Project
                              </label>
                              <ReactSelect
                                isMulti={false}
                                isCreateable={false}
                                defaultValue={values.projectObj}
                                isDisabled={
                                  isLoadingSave || isLoading || isFetching
                                }
                                options={_get(userProjects, 'data', [])}
                                getOptionLabel="title"
                                getOptionValue="_id"
                                isSearchable={true}
                                placeholder="Select Project"
                                handleChange={(value) => {
                                  form.setFieldValue(
                                    field.name,
                                    value._id,
                                    true,
                                  );
                                  form.setFieldValue('projectObj', value, true);
                                }}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>{errors.project_id}</FormFeedback>
                              )}
                              {_get(userProjects, 'data', []).length === 0 && (
                                <FormFeedback>
                                  {' '}
                                  No projects found. Please create a project
                                  first.
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                    {_get(userProjects, 'data', []).length === 0 && (
                      <Col>
                        <Button
                          className="float-right"
                          color="primary"
                          onClick={handleCreate}
                        >
                          Create Project
                        </Button>
                      </Col>
                    )}
                  </Row>
                )}
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

TaskForm.propTypes = {
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

export { TaskForm };
