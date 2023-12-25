import { z } from 'zod';

const coordinatesSchema = z.object({
    x: z.number().min(0, { message: 'X coordinate must be a positive number' }),
    y: z.number().min(0, { message: 'Y coordinate must be a positive number' })
});

const propertiesSchema = z.object({
    coordinates: z.array(coordinatesSchema).nonempty({ message: 'Coordinates array cannot be empty' }),
    color: z.string().min(1, { message: 'Color is required' }),
    thickness: z.number().min(0, { message: 'Thickness must be a positive number' }),
    content: z.string().optional(),
    font: z.string().optional(),
    size: z.number().min(0, { message: 'Size must be a positive number' }).optional()
});

const elementSchema = z.object({
    type: z.string().min(1, { message: 'Type is required' }),
    properties: propertiesSchema
});

export const drawingValidationSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    elements: z.array(elementSchema).nonempty({ message: 'Elements array cannot be empty' }),
    created_at: z.date(),
    updated_at: z.date()
});

