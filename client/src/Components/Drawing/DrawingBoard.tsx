/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';
import DrawingToolbar from './DrawingToolbar';
import { drawArrow, drawCircle, drawDiamond, drawLine, drawPencil, drawRectangle, renderDynamicText } from '../../utils/drawingUtils';
import { IDrawParams, IDrawing, IDrawingElements } from '../../interfaces/Drawing';
import { TDrawingMode } from '../../types/DrawingMode';

interface IDrawingBoardProps {
    drawing?: IDrawing;
}

let newPath: Array<{ x: number, y: number }> = [];

const DrawingBoard: React.FC<IDrawingBoardProps> = ({ drawing }) => {
    const [elements, setElements] = useState<IDrawingElements[]>(drawing?.elements || []);
    const [history, setHistory] = useState<IDrawingElements[][]>([elements]);
    const [historyIndex, setHistoryIndex] = useState<number>(0);
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
    }, [color]);

    useEffect(() => {
        if (elements.length) {
            elements.forEach(element => {
                const { type, properties } = element;
                const { coordinates, color, thickness } = properties || {};

                if (contextRef.current) {
                    contextRef.current.strokeStyle = color;
                    contextRef.current.lineWidth = thickness;
                }

                const params = { x: coordinates[1]?.x, y: coordinates[1]?.y, contextRef, startPoint: { current: coordinates[0] }, shouldClear: false }

                switch (type) {
                    case 'rectangle': drawRectangle(params); break;
                    case 'diamond': drawDiamond(params); break;
                    case 'circle': drawCircle(params); break;
                    case 'line': drawLine(params); break;
                    case 'arrow': drawArrow(params); break;
                    case 'pencil': drawPencil(params); break;
                    default: break;
                }
            });
        } else clearContexts();
    }, [elements]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (contextRef.current && drawingMode !== 'text') {
            contextRef?.current?.beginPath();
        }

        startPoint.current = { x: offsetX / 2, y: offsetY / 2 };
        isDrawing.current = true;
        setElements([...elements as any]);
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
            case 'rectangle': newPath = drawRectangle(params); break;
            case 'diamond': newPath = drawDiamond(params); break;
            case 'circle': newPath = drawCircle(params); break;
            case 'line': newPath = drawLine(params); break;
            case 'arrow': newPath = drawArrow(params); break;
            case 'pencil': newPath = drawPencil(params); break;
            case 'text': renderDynamicText(params); break;
            default: break;
        }
    };


    const endDrawing = () => {
        if (contextRef.current && staticContextRef.current && canvasRef.current && staticCanvasRef.current) {
            staticContextRef.current.drawImage(canvasRef.current, 0, 0);
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            if (newPath.length) {
                const newElements = [...elements, { type: drawingMode, properties: { coordinates: newPath, color, thickness: contextRef.current?.lineWidth } }];
                setElements(newElements);
                setHistory([...history.slice(0, historyIndex + 1), newElements]);
                setHistoryIndex(historyIndex + 1);
            }
        }
        isDrawing.current = false;
        startPoint.current = null;
        newPath = [];
    };

    const clearContexts = () => {
        if (contextRef.current && staticContextRef.current) {
            contextRef.current.clearRect(0, 0, (canvasRef as unknown as any)?.current?.width, (canvasRef as unknown as any)?.current?.height);
            staticContextRef.current.clearRect(0, 0, (staticCanvasRef as unknown as any)?.current?.width, (staticCanvasRef as unknown as any)?.current?.height);
        }
    }

    const undo = () => {
        if (historyIndex > 0) {
            clearContexts();
            setHistoryIndex(historyIndex - 1);
            setElements(history[historyIndex - 1]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            clearContexts();
            setHistoryIndex(historyIndex + 1);
            setElements(history[historyIndex + 1]);
        }
    };

    return (
        <div className="flex flex-col items-center relative">
            <div className='mt-4 sticky z-50'>
                <DrawingToolbar onModeChange={(mode: TDrawingMode) => setDrawingMode(mode)} onColorChange={(color: string) => setColor(color)} onReset={() => {
                    clearContexts()
                    setElements([]);
                }} onBack={undo} onForward={redo} />
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
                className="w-full absolute h-screen z-10 cursor-crosshair"
            />
        </div>
    );
};

export default DrawingBoard;