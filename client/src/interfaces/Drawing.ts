export interface IPoint {
    x: number;
    y: number;
}

interface IContextRef {
    current: CanvasRenderingContext2D | null;
}

interface IStartPoint {
    current: IPoint | null;
}

export interface IDrawParams {
    x: number;
    y: number;
    contextRef: IContextRef;
    startPoint: IStartPoint;
    shouldClear?: boolean;
    text?: string;
    color?: string;
    staticContextRef?: IContextRef;
}

interface IDrawingElementProperties {
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
