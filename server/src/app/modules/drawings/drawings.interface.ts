export interface IDrawingElementProperties {
    coordinates: Array<Array<{ x: number, y: number }>>;
    color: string;
    thickness: number;
    content?: string;
    font?: string;
    size?: number;
}

export interface IDrawingElements {
    type: string;
    properties: IDrawingElementProperties;
}

export interface IDrawing {
    title: string;
    description: string;
    elements: IDrawingElements[];
    created_at: Date;
    updated_at: Date;
}
