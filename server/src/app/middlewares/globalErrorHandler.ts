/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';


const handleSpecificErrors = (err: any): TGenericErrorResponse | null => {
    if (err instanceof ZodError) return handleZodError(err);
    if (err?.name === 'ValidationError') return handleValidationError(err);
    if (err?.name === 'CastError') return handleCastError(err);
    if (err?.code === 11000) return handleDuplicateError(err);
    if (err instanceof AppError) return { statusCode: err?.statusCode, message: err.message, errorSources: [{ path: '', message: err?.message }] };
    if (err instanceof Error) return { statusCode: 500, message: err.message, errorSources: [{ path: '', message: err?.message }] };
    return null;
};

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources: TErrorSources = [{ path: '', message: 'Something went wrong' }];

    const simplifiedError = handleSpecificErrors(err);

    if (simplifiedError) {
        statusCode = simplifiedError.statusCode || statusCode;
        message = simplifiedError.message || message;
        errorSources = simplifiedError.errorSources || errorSources;
    }

    return res.status(statusCode).json({
        message,
        errorSources,
        err,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
    });
};

export default globalErrorHandler;
