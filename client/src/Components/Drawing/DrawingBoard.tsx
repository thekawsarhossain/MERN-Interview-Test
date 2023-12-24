/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';
import DrawingToolbar from './DrawingToolbar';
import { drawArrow, drawCircle, drawDiamond, drawLine, drawPencil, drawRectangle, erase, renderDynamicText } from '../../utils/drawingUtils';
import { IDrawParams } from '../../interfaces/Drawing';
import { TDrawingMode } from '../../types/DrawingMode';

const DrawingBoard: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const staticCanvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const staticContextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawing = useRef<boolean>(false);
    const startPoint = useRef<{ x: number; y: number } | null>(null);
    const [drawingMode, setDrawingMode] = useState<TDrawingMode>("rectangle");
    const [color, setColor] = useState<string>('#000000');
    const [text, setText] = useState<string>('');

    useEffect(() => {
        const canvas = canvasRef?.current;
        const staticCanvas = staticCanvasRef?.current;
        if (!canvas || !staticCanvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        staticCanvas.width = window.innerWidth;
        staticCanvas.height = window.innerHeight;
        const context = canvas.getContext('2d');
        const staticContext = staticCanvas.getContext('2d');
        if (context && staticContext) {
            context.scale(2, 2);
            staticContext.scale(1, 1);
            context.lineCap = 'round';
            staticContext.lineCap = 'round';
            context.lineWidth = 1;
            staticContext.lineWidth = 1;
            contextRef.current = context;
            staticContextRef.current = staticContext;
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef?.current;
        const staticCanvas = staticCanvasRef?.current;
        if (!canvas || !staticCanvas) return;

        const context = canvas.getContext('2d');
        const staticContext = staticCanvas.getContext('2d');
        if (context && staticContext) {
            context.strokeStyle = color;
            staticContext.strokeStyle = color;
        }
    }, [color])

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
            case 'text': renderDynamicText(params); break;
            case 'eraser': erase({ ...params, contextRef: staticContextRef }); break;
            default: break;
        }
    };

    const endDrawing = () => {
        if (contextRef.current && staticContextRef.current && canvasRef.current && staticCanvasRef.current) {
            staticContextRef.current.drawImage(canvasRef.current, 0, 0);
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        isDrawing.current = false;
        startPoint.current = null;
    };

    const clearCanvas = () => {
        if (contextRef.current && staticContextRef.current) {
            contextRef.current.clearRect(0, 0, (canvasRef as unknown as any)?.current?.width, (canvasRef as unknown as any)?.current?.height);
            staticContextRef.current.clearRect(0, 0, (staticCanvasRef as unknown as any)?.current?.width, (staticCanvasRef as unknown as any)?.current?.height);
        }
    };

    return (
        <div className="flex flex-col items-center relative">
            <div className='mt-4 sticky z-50'>
                <DrawingToolbar onModeChange={(mode: TDrawingMode) => setDrawingMode(mode)} onColorChange={(color: string) => setColor(color)} onReset={() => clearCanvas()} />
            </div>
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
                ref={staticCanvasRef}
                className="w-full absolute h-screen"
            />
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseOut={endDrawing}
                className={`w-full absolute h-screen z-10 ${drawingMode === "eraser" ? "cursor-eraser" : "cursor-crosshair"}`}
            />
        </div>
    );
};

export default DrawingBoard;