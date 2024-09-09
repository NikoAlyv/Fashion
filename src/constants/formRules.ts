import {RegisterOptions} from 'react-hook-form';
import {Regex} from './regexs';

export class FormRules {
  public static fullName = {
    required: {
      message: 'FullName is required',
      value: true,
    },
    pattern: {
      value: Regex.fullName,
      message: 'FullName is not valid',
    },
  } as RegisterOptions;

  public static email = {
    required: {
      message: 'Email is required',
      value: true,
    },
    pattern: {
      value: Regex.email,
      message: 'Email is not valid',
    },
  } as RegisterOptions;

  public static password = {
    required: {
      message: 'Password is required',
      value: true,
    },
    pattern: {
      value: Regex.password,
      message: 'Password is not valid',
    },
  } as RegisterOptions;

  public static confirmPassword = (watch: (field: string) => string) =>
    ({
      required: {
        message: 'Confirm Password is required',
        value: true,
      },
      validate: (value: string) =>
        value === watch('password') || "Passwords don't match",
    } as RegisterOptions);
}
