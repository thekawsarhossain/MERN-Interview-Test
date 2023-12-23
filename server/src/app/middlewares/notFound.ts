/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (_req: Request, res: Response, _next: NextFunction) => {
    return res.status(httpStatus.NOT_FOUND).json({
        message: 'API Endpoint Not Found!',
        error: '',
    });
};

export default notFound;