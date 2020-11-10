export interface MongoError extends Error {
  code: number;
}

export function isMongoError(error: Error): error is MongoError {
  return error.name === 'MongoError';
}
