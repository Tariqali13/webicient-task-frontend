import React from 'react';
import Tasks from '@/components/tasks';
import SecureTemplate from '@/layouts/secure-template';

const TasksMain = () => {
  return (
    <SecureTemplate title="Tasks">
      <Tasks />
    </SecureTemplate>
  );
};

export default TasksMain;
