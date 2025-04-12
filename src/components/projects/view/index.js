import React from 'react';
import SecureTemplate from '@/layouts/secure-template';
import { FormHeader } from '@/components/common';
import { useQuery } from 'react-query';
import { GET_PROJECT_BY_ID } from '../queries';
import reactQueryConfig from '@/constants/react-query-config';
import { useRouter } from 'next/router';
import { Message } from '@/components/alert/message';
import _get from 'lodash.get';
import { ProcessingModal } from '@/components/modal';
import _omit from 'lodash.omit';
import { Card, CardTitle, CardHeader, CardBody } from 'reactstrap';
import Tasks from '@/components/tasks';

const ViewProject = () => {
  const router = useRouter();
  const { projectId } = router.query;
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
    <SecureTemplate title="View Project">
      <FormHeader heading="View Project" />
      <Card className="p-1 m-1">
        <CardHeader>
          <h2>Project Details</h2>
        </CardHeader>
        <CardBody>
          <div>
            <h3>Title:</h3>
            <p>{_get(projectData, 'data.title', '')}</p>
          </div>
          <div>
            <h3>Description:</h3>
            <p>{_get(projectData, 'data.description', '')}</p>
          </div>
          <Tasks projectId={projectId} projectData={_get(projectData, 'data', {})} />
        </CardBody>
      </Card>
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default ViewProject;
