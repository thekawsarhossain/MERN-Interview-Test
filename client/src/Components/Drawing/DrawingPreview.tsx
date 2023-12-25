import React, { useRef, useEffect } from 'react';
import { IDrawing } from '../../interfaces/Drawing';
import { drawArrow, drawCircle, drawDiamond, drawLine, drawPencil, drawRectangle, renderDynamicText } from '../../utils/drawingUtils';

interface IDrawingPreviewProps {
    drawing?: IDrawing;
}

const DrawingPreview: React.FC<IDrawingPreviewProps> = ({ drawing }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const { elements } = drawing || { elements: [] };

    useEffect(() => {
        const canvas = canvasRef?.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext('2d');
        if (context) {
            context.scale(2, 2);
            context.lineCap = 'round';
            context.lineWidth = 1;
            contextRef.current = context;
        }
    }, []);

    useEffect(() => {
        if (elements.length) {
            elements.forEach(element => {
                const { type, properties } = element;
                const { coordinates, color, thickness, content } = properties || {};

                if (contextRef.current) {
                    contextRef.current.strokeStyle = color;
                    contextRef.current.lineWidth = thickness;
                }

                coordinates.forEach(coordPair => {
                    const params = { x: coordPair[1]?.x, y: coordPair[1]?.y, contextRef, startPoint: { current: coordPair[0] }, shouldClear: false };

                    switch (type) {
                        case 'rectangle': drawRectangle(params); break;
                        case 'diamond': drawDiamond(params); break;
                        case 'circle': drawCircle(params); break;
                        case 'line': drawLine(params); break;
                        case 'arrow': drawArrow(params); break;
                        case 'pencil': drawPencil(params); break;
                        case 'text': renderDynamicText({ ...params, text: content, color }); break;
                        default: break;
                    }
                });
            });
        }
    }, [elements]);

    return (
        <canvas ref={canvasRef} className="w-full" />
    );
};

export default DrawingPreview;
