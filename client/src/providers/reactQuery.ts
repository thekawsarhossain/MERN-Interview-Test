import axios from "axios";
import { IDrawing } from "../interfaces/Drawing";

export const getDrawings = async () => {
    const response = await axios.get('/drawings');
    return response.data;
}

export const getDrawing = async (drawingId: string) => {
    const response = await axios.get(`/drawings/${drawingId}`);
    return response.data;
}

export const saveDrawing = async (drawing: IDrawing) => {
    const response = await axios.post("/drawings", { ...drawing });
    return response.data;
}

export const editDrawing = async (drawing: Partial<IDrawing>) => {
    const response = await axios.put(`/drawings/${(drawing as { id: string }).id}`, { ...drawing });
    return response.data;
}

export const deleteDrawing = async (drawingId: string) => {
    const response = await axios.delete(`/drawings/${drawingId}`);
    return response.data;
}