import React from 'react';
import { FormHeader } from '../../common';
import { ProjectForm } from '../components/project-form';
import SecureTemplate from '../../layouts/secure-template';
import { validateCreateProjectForm } from '../validation';
import { CREATE_PROJECT } from '../queries';
import { Message } from '@/components/alert/message';
import { Formik } from 'formik';
import Router from 'next/router';
import { useMutation } from 'react-query';
import { ProcessingModal } from '@/components/modal';

const CreateProject = () => {
  const { mutate: createProject, isLoading: isLoadingSave } =
    useMutation(CREATE_PROJECT);
  return (
    <SecureTemplate title="Create Project">
      <FormHeader heading="Create Project" />
      <Formik
        initialValues={{
          title: '',
          description: '',
        }}
        validationSchema={validateCreateProjectForm}
        onSubmit={async (values, actions) => {
          await createProject(values, {
            onSuccess: async (res) => {
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
          return <ProjectForm isLoadingSave={isLoadingSave} {...formikProps} />;
        }}
      </Formik>
      {isLoadingSave && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default CreateProject;
