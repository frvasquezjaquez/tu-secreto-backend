import Validator from 'validator';
import {isEmpty} from '../../utils/isEmpty';

/**
 * @desc   Validate signup data
 * @param  {Object} user 
 * @return {Object}
 */
export const validateSignup = (user) => {
  let errors = {};

  if(!Validator.isEmail(user.email)){
    errors.email = 'Invalid Email Format';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

/**
 * @desc   Validate login data
 * @param  {Object} user 
 * @return {Object}
 */
export const validateLogin = (user) => {
  let errors = {};

  user.username = !isEmpty(user.username) ? user.username: '';
  user.password = !isEmpty(user.password) ? user.password: '';

  if(Validator.isEmpty(user.username)){
    errors.username = 'Username field is required';
  }
  
  if(Validator.isEmpty(user.password)){
    errors.password = 'Password field is required';
  }
  

  return {
    errors,
    isValid: isEmpty(errors)
  }
}


/**
 * @desc   Validate reset password body
 * @param  {Object} user 
 * @return {Object}
 */
export const validateResetPassword = (user) => {
  let errors = {};

  user.token_reset = !isEmpty(user.token_reset) ? user.token_reset : '';
  user.password = !isEmpty(user.password) ? user.password : '';

  if (Validator.isEmpty(user.token_reset)) {
    errors.token_reset = 'Token must be provided';
  }

  if (Validator.isEmpty(user.password)) {
    errors.password = 'Password field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}
