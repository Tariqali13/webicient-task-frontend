import * as Yup from 'yup';

export const validateCreateProjectForm = Yup.object().shape({
  title: Yup.string().required('Title is mandatory'),
  description: Yup.string().required('Description is mandatory'),
});

export const validateUpdateProjectForm = Yup.object().shape({
  title: Yup.string().required('Title is mandatory'),
  description: Yup.string().required('Description is mandatory'),
});
