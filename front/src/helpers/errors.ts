import { HttpError } from 'src/typings/errors';

export function isError(error: unknown): error is Error {
    return error instanceof Error;
}

export function isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError;
}
