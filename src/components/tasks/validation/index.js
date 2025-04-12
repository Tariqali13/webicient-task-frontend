import * as Yup from 'yup';

export const validateCreateTaskForm = Yup.object().shape({
  title: Yup.string().required('Title is mandatory'),
  description: Yup.string().required('Description is mandatory'),
  status: Yup.string().required('Status is mandatory'),
  project_id: Yup.string().required('Project is mandatory'),
  due_date: Yup.date().required('Due Date is mandatory'),
});

export const validateUpdateTaskForm = Yup.object().shape({
  title: Yup.string().required('Title is mandatory'),
  description: Yup.string().required('Description is mandatory'),
  status: Yup.string().required('Status is mandatory'),
  project_id: Yup.string().required('Project is mandatory'),
  due_date: Yup.date().required('Due Date is mandatory'),
});
