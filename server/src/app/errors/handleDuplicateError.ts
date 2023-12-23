import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

const handleDuplicateError = (err: { message: string }): TGenericErrorResponse => {
    const match = err?.message?.match(/"([^"]*)"/); // Extract value within double quotes using regex
    const extractedMessage = match && match[1]; // The extracted value will be in the first capturing group

    const errorSources: TErrorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];

    return {
        statusCode: 400,
        message: 'Invalid ID',
        errorSources,
    };
};

export default handleDuplicateError;