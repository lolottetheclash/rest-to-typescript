"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMongoError = void 0;
function isMongoError(error) {
    return error.name === 'MongoError';
}
exports.isMongoError = isMongoError;
