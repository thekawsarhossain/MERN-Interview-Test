import AppError from '../../errors/AppError';
import { IDrawing } from './drawings.interface';
import DrawingModel from './drawings.model';

export const findAll = async (): Promise<IDrawing[]> => {
    try {
        return await DrawingModel.find();
    } catch (err) {
        throw new AppError(500, 'An error occurred while retrieving drawings');
    }
};

export const findById = async (id: string): Promise<IDrawing | null> => {
    try {
        const drawing = await DrawingModel.findById(id);
        if (!drawing) throw new AppError(404, 'Drawing not found');
        return drawing;
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        throw new AppError(500, 'An error occurred while retrieving the drawing');
    }
};

export const create = async (newDrawing: IDrawing): Promise<IDrawing> => {
    try {
        return await DrawingModel.create(newDrawing);
    } catch (err) {
        throw new AppError(500, 'An error occurred while creating the drawing');
    }
};

export const update = async (id: string, updatedDrawing: Partial<IDrawing>): Promise<IDrawing | null> => {
    try {
        const drawing = await DrawingModel.findByIdAndUpdate(id, updatedDrawing, { new: true });
        if (!drawing) {
            throw new AppError(404, 'Drawing not found');
        }
        return drawing;
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        throw new AppError(500, 'An error occurred while updating the drawing');
    }
};

export const remove = async (id: string): Promise<void> => {
    try {
        const drawing = await DrawingModel.findByIdAndDelete(id);
        if (!drawing) {
            throw new AppError(404, 'Drawing not found');
        }
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        throw new AppError(500, 'An error occurred while deleting the drawing');
    }
};
