import { IDrawParams, IPoint } from "../interfaces/Drawing";

export const drawRectangle = ({ x, y, contextRef, startPoint, shouldClear = true }: IDrawParams): IPoint[] => {
    if (!startPoint.current || !contextRef.current) return [];
    const { x: startX, y: startY } = startPoint.current;
    shouldClear && contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
    contextRef.current.strokeRect(startX, startY, x - startX, y - startY);
    return [{ x: startX, y: startY }, { x, y }];
};

export const drawDiamond = ({ x, y, contextRef, startPoint, shouldClear = true }: IDrawParams): IPoint[] => {
    if (!startPoint.current || !contextRef.current) return [];
    const { x: startX, y: startY } = startPoint.current;
    const width = x - startX;
    const height = y - startY;

    shouldClear && contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);

    contextRef.current.beginPath();
    contextRef.current.moveTo(startX + width / 2, startY);
    contextRef.current.lineTo(x, startY + height / 2);
    contextRef.current.lineTo(startX + width / 2, y);
    contextRef.current.lineTo(startX, startY + height / 2);
    contextRef.current.closePath();
    contextRef.current.stroke();
    return [{ x: startX, y: startY }, { x, y }];
};

export const drawCircle = ({ x, y, contextRef, startPoint, shouldClear = true }: IDrawParams): IPoint[] => {
    if (!startPoint.current || !contextRef.current) return [];
    const { x: startX, y: startY } = startPoint.current;
    const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));

    shouldClear && contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);

    contextRef.current.beginPath();
    contextRef.current.arc(startX, startY, radius, 0, 2 * Math.PI);
    contextRef.current.stroke();
    return [{ x: startX, y: startY }, { x, y }];
};

export const drawLine = ({ x, y, contextRef, startPoint, shouldClear = true }: IDrawParams): IPoint[] => {
    if (!startPoint.current || !contextRef.current) return [];
    const { x: startX, y: startY } = startPoint.current;
    shouldClear && contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
    contextRef.current.beginPath();
    contextRef.current.moveTo(startX, startY);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    contextRef.current.closePath();
    return [{ x: startX, y: startY }, { x, y }];
};

export const drawArrow = ({ x, y, contextRef, startPoint, shouldClear = true }: IDrawParams): IPoint[] => {
    if (!startPoint.current || !contextRef.current) return [];
    const { x: startX, y: startY } = startPoint.current;

    shouldClear && contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);

    const headlen = 10; // length of head in pixels
    const angle = Math.atan2(y - startY, x - startX);

    contextRef.current.beginPath();
    contextRef.current.moveTo(startX, startY);
    contextRef.current.lineTo(x, y);
    contextRef.current.lineTo(
        x - headlen * Math.cos(angle - Math.PI / 6),
        y - headlen * Math.sin(angle - Math.PI / 6)
    );
    contextRef.current.moveTo(x, y);
    contextRef.current.lineTo(
        x - headlen * Math.cos(angle + Math.PI / 6),
        y - headlen * Math.sin(angle + Math.PI / 6)
    );
    contextRef.current.stroke();
    return [{ x: startX, y: startY }, { x, y }];
};

export const drawPencil = ({ x, y, contextRef }: IDrawParams): IPoint[] => {
    if (!contextRef.current) return [];
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();

    return [{ x: 0, y: 0 }, { x, y }];
};


export const renderDynamicText = ({ x, y, text, color, contextRef }: IDrawParams) => {
    if (!contextRef.current) return;
    contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
    contextRef.current.fillStyle = color as string || "";
    contextRef.current.font = '10px Arial';
    contextRef.current.fillText(text as string, x, y);
};