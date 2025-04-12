import React from 'react';
import { FormHeader } from '../../common';
import { ProjectForm } from '../components/project-form';
import SecureTemplate from '../../layouts/secure-template';
import { validateUpdateProjectForm } from '../validation';
import { UPDATE_PROJECT, GET_PROJECT_BY_ID } from '../queries';
import { Message } from '@/components/alert/message';
import { Formik } from 'formik';
import Router from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { ProcessingModal } from '@/components/modal';
import reactQueryConfig from '@/constants/react-query-config';
import _get from 'lodash.get';

const EditProject = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const { mutate: updateProject, isLoading: isLoadingSave } =
    useMutation(UPDATE_PROJECT);

  const isEnabled = projectId !== undefined;
  const { data: projectData, isLoading } = useQuery(
    ['PROJECT_BY_ID', { id: projectId }],
    GET_PROJECT_BY_ID,
    {
      ...reactQueryConfig,
      enabled: isEnabled,
      onError: async (err) => {
        Message.error(err);
        router.back();
        return await err;
      },
    },
  );
  return (
    <SecureTemplate title="Update Project">
      <FormHeader heading="Update Project" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: _get(projectData, 'data.title', ''),
          description: _get(projectData, 'data.description', ''),
        }}
        validationSchema={validateUpdateProjectForm}
        onSubmit={async (values, actions) => {
          await updateProject(
            {
              id: projectId,
              data: values,
            },
            {
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
            },
          );
        }}
      >
        {(formikProps) => {
          return (
            <ProjectForm
              isEdit={true}
              isLoadingSave={isLoadingSave}
              {...formikProps}
            />
          );
        }}
      </Formik>
      {(isLoading || isLoadingSave) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default EditProject;
