import _get from 'lodash/get';

// This function will return className has-error if field error exists
export const fieldValidate = (field, form) => {
  if (!form || !field) {
    return '';
  }
  const { touched, errors } = form;
  if (touched && _get(touched, field.name)) {
    if (_get(errors, field.name)) {
      return 'has-error';
    }
    return '';
  }
  return '';
};

// This function will return boolean value if field error exists
export const fieldValidateBool = (field, form) => {
  if (!form || !field) {
    return false;
  }
  const { touched, errors } = form;
  if (touched && _get(touched, field.name)) {
    if (_get(errors, field.name)) {
      return true;
    }
    return false;
  }
  return false;
};
