import { z } from 'zod';

const coordinatesSchema = z.array(z.object({
    x: z.number({ required_error: "X coordinate is required" }).min(0, { message: 'X coordinate must be a positive number' }),
    y: z.number({ required_error: "Y coordinate is required" }).min(0, { message: 'Y coordinate must be a positive number' })
}));

const elementSchema = z.object({
    type: z.string({ required_error: "Type is required" }).min(1, { message: 'Type cannot be empty' }),
    properties: z.object({
        color: z.string({ required_error: "Color is required" }).min(1, { message: 'Color cannot be empty' }).optional(),
        thickness: z.number({ required_error: "Thickness is required" }).min(0, { message: 'Thickness must be a positive number' }).optional(),
        coordinates: z.array(coordinatesSchema).nonempty({ message: 'Coordinates array cannot be empty' }),
        content: z.string().optional(),
        font: z.string().optional(),
        size: z.number().min(0, { message: 'Size must be a positive number' }).optional()
    })
});

export const drawingValidationSchema = z.object({
    title: z.string({ required_error: "Title is required" }),
    description: z.string({ required_error: "Description is required" }),
    elements: z.array(elementSchema).nonempty({ message: 'Elements array cannot be empty' }),
});

export const drawingUpdateValidationSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    elements: z.array(elementSchema).nonempty({ message: 'Elements array cannot be empty' }).optional(),
});
