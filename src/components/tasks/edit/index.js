import React from 'react';
import { FormHeader } from '../../common';
import { TaskForm } from '../components/task-form';
import SecureTemplate from '../../layouts/secure-template';
import { validateUpdateTaskForm } from '../validation';
import { UPDATE_TASK, GET_TASK_BY_ID } from '../queries';
import { Message } from '@/components/alert/message';
import { Formik } from 'formik';
import Router from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { ProcessingModal } from '@/components/modal';
import reactQueryConfig from '@/constants/react-query-config';
import _get from 'lodash.get';
import { statuses } from '@/src/constants/tasks';
import _omit from 'lodash.omit';

const EditTask = () => {
  const router = useRouter();
  const { projectId, taskId } = router.query;

  const { mutate: updateTask, isLoading: isLoadingSave } =
    useMutation(UPDATE_TASK);

  const isEnabled = taskId !== undefined;
  const { data: taskData, isLoading } = useQuery(
    ['TASK_BY_ID', { id: taskId }],
    GET_TASK_BY_ID,
    {
      ...reactQueryConfig,
      enabled: isEnabled,
      onError:async  (err) => {
        Message.error(err);
        router.back();
        return await err;
      },
    },
  );
  const findStatus = statuses.find(
    (status) => status.value === _get(taskData, 'data.status', ''),
  );
  return (
    <SecureTemplate title="Update Task">
      <FormHeader heading="Update Task" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: _get(taskData, 'data.title', ''),
          description: _get(taskData, 'data.description', ''),
          projectObj: _get(taskData, 'data.project_id', ''),
          project_id: _get(taskData, 'data.project_id._id', ''),
          status: _get(taskData, 'data.status', ''),
          statusObj: findStatus || {},
          due_date: _get(taskData, 'data.due_date', '')
            ? new Date(_get(taskData, 'data.due_date', ''))
                .toISOString()
                .split('T')[0]
            : '',
        }}
        validationSchema={validateUpdateTaskForm}
        onSubmit={async (values, actions) => {
          await updateTask(
            {
              id: taskId,
              data: _omit(values, ['projectObj', 'statusObj']),
            },
            {
              onSuccess: (res) => {
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
            <TaskForm
              projectId={projectId}
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

export default EditTask;
