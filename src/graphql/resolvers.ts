import validator from 'validator';

import { minPasswordLength } from '../configs';
import { loginUser, saveUser } from '../database/user.data';
import { User } from '../interfaces/user';

export const createUser = async (
  {
    email, firstname, lastname, password,
  }: {
    email: string,
    firstname: string,
    lastname: string,
    password: string,
  },
  _context: any,
): Promise<User> => {
  if (!validator.isEmail(email)) {
    const error = { message: 'Email must be valid', status: 400 };
    throw error;
  } else if (validator.isEmpty(password)
    || !validator.isLength(password, { min: minPasswordLength })) {
    const error = { message: `Password must be at least ${minPasswordLength} characters long`, status: 400 };
    throw error;
  } else if (validator.isEmpty(firstname) || validator.isEmpty(lastname)) {
    const error = { message: 'First and last name must be provided', status: 400 };
    throw error;
  }
  return saveUser(email, password, firstname, lastname);
};

export const login = async (
  { email, password }: {
    email: string,
    password: string,
  },
  _context: any,
): Promise<string> => loginUser(email, password);
