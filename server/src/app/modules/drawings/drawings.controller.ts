import { Request, Response } from 'express';
import * as DrawingService from './drawings.service';
import { IDrawing } from './drawings.interface';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

export const getDrawings = catchAsync(async (_req: Request, res: Response) => {
    const drawings: IDrawing[] = await DrawingService.findAll();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Drawings retrieved succesfully',
        data: drawings,
    });
});

export const getDrawing = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const drawing: IDrawing | null = await DrawingService.findById(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Drawing retrieved succesfully',
        data: drawing,
    });
});

export const createDrawing = catchAsync(async (req: Request, res: Response) => {
    const newDrawing: IDrawing = req.body;
    const drawing: IDrawing = await DrawingService.create(newDrawing);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Drawing created succesfully',
        data: drawing,
    });
});

export const updateDrawing = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedDrawing: IDrawing = req.body;
    const drawing: IDrawing | null = await DrawingService.update(id, updatedDrawing);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Drawing updated succesfully',
        data: drawing,
    });
});

export const deleteDrawing = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await DrawingService.remove(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Drawing deleted succesfully',
        data: null,
    });
});
