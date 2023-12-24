/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';
import DrawingToolbar from './DrawingToolbar';
import { drawArrow, drawBrush, drawCircle, drawDiamond, drawLine, drawPencil, drawRectangle, erase, renderDynamicText } from '../../utils/drawingUtils';
import { IDrawParams } from '../../interfaces/Drawing';

const DrawingBoard: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawing = useRef<boolean>(false);
    const startPoint = useRef<{ x: number; y: number } | null>(null);
    const [drawingMode, setDrawingMode] = useState<string | null>(null);
    const [color, setColor] = useState<string>('#000000');
    const [text, setText] = useState<string>('');

    useEffect(() => {
        const canvas = canvasRef?.current;
        if (!canvas) return;

        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.7;
        const context = canvas.getContext('2d');
        if (context) {
            context.scale(2, 2);
            context.lineCap = 'round';
            context.strokeStyle = color;
            context.lineWidth = 1;
            contextRef.current = context;
        }
    }, [color]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (contextRef.current && drawingMode !== 'text') {
            contextRef?.current?.beginPath();
        }
        startPoint.current = { x: offsetX / 2, y: offsetY / 2 };
        isDrawing.current = true;
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing.current || !contextRef.current) return;
        const { offsetX, offsetY } = e.nativeEvent;

        const params: IDrawParams = {
            x: offsetX / 2,
            y: offsetY / 2,
            contextRef,
            startPoint,
            text,
            color,
        };

        switch (drawingMode) {
            case 'rectangle': drawRectangle(params); break;
            case 'diamond': drawDiamond(params); break;
            case 'circle': drawCircle(params); break;
            case 'line': drawLine(params); break;
            case 'arrow': drawArrow(params); break;
            case 'pencil': drawPencil(params); break;
            case 'brush': drawBrush(params); break;
            case 'text': renderDynamicText(params); break;
            case 'eraser': erase(params); break;
            default: break;
        }
    };


    const endDrawing = () => {
        if (contextRef.current) contextRef.current.closePath();
        isDrawing.current = false;
        startPoint.current = null;
    };

    const clearCanvas = () => {
        if (contextRef.current) {
            contextRef.current.clearRect(0, 0, (canvasRef as unknown as any)?.current?.width, (canvasRef as unknown as any)?.current?.height);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <DrawingToolbar onModeChange={(mode: string) => setDrawingMode(mode)} onColorChange={(color: string) => setColor(color)} onReset={() => {
                setDrawingMode(null);
                clearCanvas()
            }} />
            {drawingMode === 'text' && (
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text"
                    className="mb-2 p-2 border"
                />
            )}
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseOut={endDrawing}
                className="border"
            />
        </div>
    );
};

export default DrawingBoard;