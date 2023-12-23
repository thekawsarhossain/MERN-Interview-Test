import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const errorSources: TErrorSources = Object.values(err.errors || {}).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: val?.path,
                message: val?.message,
            };
        },
    );

    return {
        statusCode: 400,
        message: 'Validation Error',
        errorSources,
    };
};

export default handleValidationError;