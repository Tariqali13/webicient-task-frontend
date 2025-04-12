import React from 'react';
import { FormHeader } from '../../common';
import { TaskForm } from '../components';
import SecureTemplate from '../../layouts/secure-template';
import { validateCreateTaskForm } from '../validation';
import { CREATE_TASK } from '../queries';
import { Message } from '@/components/alert/message';
import { Formik } from 'formik';
import Router from 'next/router';
import { useMutation } from 'react-query';
import { ProcessingModal } from '@/components/modal';
import _omit from 'lodash.omit';
import { useRouter } from 'next/router';

const CreateTask = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const { mutate: createTask, isLoading: isLoadingSave } =
    useMutation(CREATE_TASK);
  return (
    <SecureTemplate title="Create Task">
      <FormHeader heading="Create Task" />
      <Formik
        enableReinitialize={projectId ? true : false}
        initialValues={{
          title: '',
          description: '',
          statusObj: {},
          status: '',
          projectObj: {},
          project_id: projectId,
          due_date: '',
        }}
        validationSchema={validateCreateTaskForm}
        onSubmit={async (values, actions) => {
          await createTask(_omit(values, ['projectObj', 'statusObj']), {
            onSuccess: async (res) => {
              Message.success(res);
              if (projectId) {
                Router.push(
                  `/admin/projects/${projectId}/view`,
                  `/admin/projects/${projectId}/view`,
                  {
                    shallow: true,
                  },
                );
              } else {
                Router.push('/admin/tasks', '/admin/tasks', {
                  shallow: true,
                });
              }
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
            <TaskForm
              projectId={projectId}
              isLoadingSave={isLoadingSave}
              {...formikProps}
            />
          );
        }}
      </Formik>
      {isLoadingSave && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default CreateTask;
