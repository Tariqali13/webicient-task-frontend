import * as Yup from 'yup';
import {
  PASSWORD_REGEX,
  PASSWORD_VALIDATION_MESSAGE,
} from '@/src/constants/regex';

export const validateSignUpForm = Yup.object().shape({
  first_name: Yup.string()
    .max(255, 'First name cannot be more than 255 characters')
    .required('First name is required'),

  last_name: Yup.string()
    .max(255, 'Last name cannot be more than 255 characters')
    .required('Last name is required'),

  email: Yup.string()
    .email('Please enter valid email address')
    .required('Email is mandatory'),

  password: Yup.string()
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE)
    .required('Password is mandatory'),

  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});
