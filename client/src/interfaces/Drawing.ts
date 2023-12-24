export interface IPoint {
    x: number;
    y: number;
}

export interface IContextRef {
    current: CanvasRenderingContext2D | null;
}

export interface IStartPoint {
    current: IPoint | null;
}

export interface IDrawParams {
    x: number;
    y: number;
    contextRef: IContextRef;
    startPoint: IStartPoint;
    text?: string;
    color?: string;
}