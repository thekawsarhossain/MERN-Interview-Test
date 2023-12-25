import mongoose from 'mongoose';
import { IDrawing, IDrawingElementProperties, IDrawingElements } from './drawings.interface';

const coordinatesSchema = new mongoose.Schema<{ x: number, y: number }>({
    x: { type: Number, required: true },
    y: { type: Number, required: true }
}, { _id: false });


const propertiesSchema = new mongoose.Schema<IDrawingElementProperties>({
    coordinates: { type: [[coordinatesSchema]], required: true },
    color: { type: String, required: true, default: "#000000" },
    thickness: { type: Number, required: true, default: 1 },
    content: { type: String, required: false },
    font: { type: String, required: false },
    size: { type: Number, required: false }
}, { _id: false });

const elementSchema = new mongoose.Schema<IDrawingElements>({
    type: { type: String, required: true },
    properties: { type: propertiesSchema, required: true }
}, { _id: false });

const drawingSchema = new mongoose.Schema<IDrawing>({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    elements: { type: [elementSchema], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const DrawingModel = mongoose.model<IDrawing>('Drawing', drawingSchema);

export default DrawingModel;
