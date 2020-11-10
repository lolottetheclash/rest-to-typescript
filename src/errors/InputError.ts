import { ValidationError } from 'class-validator';

export function isInputError(error: Error): error is InputError {
  return error.name === 'InputError';
}

export class InputError extends Error {
  validationErrors: ValidationError[];

  constructor(validationErrors: ValidationError[]) {
    super('Validation errors happenned from user input');
    this.validationErrors = validationErrors;
    this.name = 'InputError';
  }
}
