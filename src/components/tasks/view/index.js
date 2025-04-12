import React from 'react';
import SecureTemplate from '@/layouts/secure-template';
import { FormHeader } from '@/components/common';
import { useQuery } from 'react-query';
import { GET_TASK_BY_ID } from '../queries';
import reactQueryConfig from '@/constants/react-query-config';
import { useRouter } from 'next/router';
import { Message } from '@/components/alert/message';
import _get from 'lodash.get';
import { ProcessingModal } from '@/components/modal';
import _omit from 'lodash.omit';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { statuses } from '@/src/constants/tasks';
import moment from 'moment';

const ViewTask = () => {
  const router = useRouter();
  const { taskId } = router.query;
  const isEnabled = taskId !== undefined;

  const { data: taskData, isLoading } = useQuery(
    ['TASK_BY_ID', { id: taskId }],
    GET_TASK_BY_ID,
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
  const findStatus = statuses.find(
    (status) => status.value === _get(taskData, 'data.status', ''),
  );
  return (
    <SecureTemplate title="View Task">
      <FormHeader heading="View Task" />
      <Card className="p-1 m-1">
        <CardHeader>
          <h2>Task Details</h2>
        </CardHeader>
        <CardBody>
          <div>
            <h3>Title:</h3>
            <p>{_get(taskData, 'data.title', '')}</p>
          </div>
          <div>
            <h3>Description:</h3>
            <p>{_get(taskData, 'data.description', '')}</p>
          </div>
          <div>
            <h3>Status:</h3>
            <p>{findStatus?.label || ''}</p>
          </div>
          <div>
            <h3>Due Date:</h3>
            <p>
              {moment(_get(taskData, 'data.due_date', '')).format('YYYY-MM-DD')}
            </p>
          </div>
          <div>
            <h3>Project:</h3>
            <p>{_get(taskData, 'data.project_id.title', '')}</p>
          </div>
        </CardBody>
      </Card>
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default ViewTask;
