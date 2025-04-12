export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
export const PASSWORD_VALIDATION_MESSAGE =
  'Password should have at least 8 characters, including one uppercase letter, one digit, and one special character.';