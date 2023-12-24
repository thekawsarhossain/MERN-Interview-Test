import { IDrawParams } from "../interfaces/Drawing";

export const drawRectangle = ({ x, y, contextRef, startPoint }: IDrawParams) => {
    if (!startPoint.current || !contextRef.current) return;
    const { x: startX, y: startY } = startPoint.current;
    contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
    contextRef.current.strokeRect(startX, startY, x - startX, y - startY);
};

export const drawDiamond = ({ x, y, contextRef, startPoint }: IDrawParams) => {
    if (!startPoint.current || !contextRef.current) return;
    const { x: startX, y: startY } = startPoint.current;
    const width = x - startX;
    const height = y - startY;

    contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);

    contextRef.current.beginPath();
    contextRef.current.moveTo(startX + width / 2, startY);
    contextRef.current.lineTo(x, startY + height / 2);
    contextRef.current.lineTo(startX + width / 2, y);
    contextRef.current.lineTo(startX, startY + height / 2);
    contextRef.current.closePath();
    contextRef.current.stroke();
};

export const drawCircle = ({ x, y, contextRef, startPoint }: IDrawParams) => {
    if (!startPoint.current || !contextRef.current) return;
    const { x: startX, y: startY } = startPoint.current;
    const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));

    contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);

    contextRef.current.beginPath();
    contextRef.current.arc(startX, startY, radius, 0, 2 * Math.PI);
    contextRef.current.stroke();
};

export const drawLine = ({ x, y, contextRef, startPoint }: IDrawParams) => {
    if (!startPoint.current || !contextRef.current) return;
    const { x: startX, y: startY } = startPoint.current;
    contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
    contextRef.current.beginPath();
    contextRef.current.moveTo(startX, startY);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    contextRef.current.closePath();
};

export const drawArrow = ({ x, y, contextRef, startPoint }: IDrawParams) => {
    if (!startPoint.current || !contextRef.current) return;
    const { x: startX, y: startY } = startPoint.current;

    contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);

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
};

export const drawPencil = ({ x, y, contextRef, startPoint }: IDrawParams) => {
    if (!startPoint.current || !contextRef.current) return;
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
};

export const renderDynamicText = ({ x, y, text, color, contextRef }: IDrawParams) => {
    if (!contextRef.current) return;
    contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
    contextRef.current.fillStyle = color as string || "";
    contextRef.current.font = '20px Arial';
    contextRef.current.fillText(text as string, x, y);
};

export const erase = ({ x, y, contextRef }: IDrawParams) => {
    if (!contextRef.current) return;
    const scale = 2;
    contextRef.current.clearRect((x - 5) * scale, (y - 5) * scale, 10 * scale, 10 * scale);
};