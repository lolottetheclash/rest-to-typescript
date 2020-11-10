"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputError = exports.isInputError = void 0;
function isInputError(error) {
    return error.name === 'InputError';
}
exports.isInputError = isInputError;
class InputError extends Error {
    constructor(validationErrors) {
        super('Validation errors happenned from user input');
        this.validationErrors = validationErrors;
        this.name = 'InputError';
    }
}
exports.InputError = InputError;
