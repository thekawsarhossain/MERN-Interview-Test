/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';
import DrawingToolbar from './DrawingToolbar';
import { drawArrow, drawCircle, drawDiamond, drawLine, drawPencil, drawRectangle, renderDynamicText } from '../../utils/drawingUtils';
import { IDrawParams, IDrawing, IDrawingElements } from '../../interfaces/Drawing';
import { TDrawingMode } from '../../types/DrawingMode';
import Button from '../Common/Button';
import SaveDrawingModal from './DrawingModal';
import Modal from '../Common/Modal';
import { Dialog } from '@headlessui/react';

interface IDrawingBoardProps {
    drawing?: IDrawing;
}
let newPath: Array<{ x: number, y: number }> = [];

const DrawingBoard: React.FC<IDrawingBoardProps> = ({ drawing }) => {
    const [elements, setElements] = useState<IDrawingElements[]>(drawing?.elements || []);
    const isDrawing = useRef<boolean>(false);
    const [text, setText] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [color, setColor] = useState<string>('#000000');
    const staticCanvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const startPoint = useRef<{ x: number; y: number } | null>(null);
    const staticContextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [drawingMode, setDrawingMode] = useState<TDrawingMode>("rectangle");
    const [openModal, setOpen] = useState({ saveDrawing: false, text: false });

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
                const { coordinates, color, thickness, content } = properties || {};

                if (contextRef.current) {
                    contextRef.current.strokeStyle = color;
                    contextRef.current.lineWidth = thickness;
                }

                coordinates.forEach(coordPair => {
                    const params = { x: coordPair[1]?.x, y: coordPair[1]?.y, contextRef, startPoint: { current: coordPair[0] }, shouldClear: false }

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

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (contextRef.current && drawingMode !== 'text') contextRef?.current?.beginPath();

        startPoint.current = { x: offsetX / 2, y: offsetY / 2 };
        isDrawing.current = true;
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing.current || !contextRef.current) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const params: IDrawParams = { x: offsetX / 2, y: offsetY / 2, contextRef, startPoint, text, color };

        switch (drawingMode) {
            case 'rectangle': newPath = drawRectangle(params); break;
            case 'diamond': newPath = drawDiamond(params); break;
            case 'circle': newPath = drawCircle(params); break;
            case 'line': newPath = drawLine(params); break;
            case 'arrow': newPath = drawArrow(params); break;
            case 'pencil': newPath = drawPencil(params); break;
            case 'text': newPath = renderDynamicText(params); break;
            default: break;
        }
    };

    const endDrawing = () => {
        if (contextRef.current && staticContextRef.current && canvasRef.current && staticCanvasRef.current) {
            staticContextRef.current.drawImage(canvasRef.current, 0, 0);
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            if (newPath.length) {
                const existingElementIndex = elements.findIndex(element => element.type === drawingMode);
                if (existingElementIndex !== -1) {
                    const newElements = [...elements];
                    newElements[existingElementIndex].properties.coordinates.push(newPath);
                    setElements([...newElements]);
                } else {
                    const newElement = { type: drawingMode, properties: { coordinates: [newPath], color, thickness: contextRef.current?.lineWidth, content: text } };
                    setElements([...elements, newElement]);
                }
            }
        }
        isDrawing.current = false;
        startPoint.current = null;
        newPath = [];
        text && setText("");
    };

    const clearContexts = () => {
        if (contextRef.current && staticContextRef.current) {
            contextRef.current.clearRect(0, 0, (canvasRef as unknown as any)?.current?.width, (canvasRef as unknown as any)?.current?.height);
            staticContextRef.current.clearRect(0, 0, (staticCanvasRef as unknown as any)?.current?.width, (staticCanvasRef as unknown as any)?.current?.height);
        }
    }

    return (
        <div className="flex flex-col items-center relative">
            <div className='mt-4 sticky z-50 flex flex-col md:flex-row items-center md:items-start justify-between w-full'>
                <div className='flex items-center justify-center w-full'>
                    <DrawingToolbar onModeChange={(mode: TDrawingMode) => {
                        setDrawingMode(mode);
                        if (mode === "text") setOpen((prev) => ({ ...prev, text: true }))
                    }} onColorChange={(color: string) => setColor(color)} onReset={() => {
                        clearContexts()
                        setElements([]);
                    }} />
                </div>
                <Button disabled={!elements?.length} onClick={() => setOpen((prev) => ({ ...prev, saveDrawing: true }))} className='sticky z-50 min-w-max mr-4'>Save Changes</Button>
            </div>
            {drawingMode === 'text' && (
                <Modal isOpen={openModal.text} close={() => setOpen((prev) => ({ ...prev, text: false }))}>
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-8 text-gray-900"
                    >
                        Write you text in input box and click on canvas to add text
                    </Dialog.Title>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text"
                        className="shadow-sm block px-3 py-2 border rounded-md placeholder-gray-400 sm:text-sm focus:outline-none focus:border-indigo-600 w-full mt-4"
                    />
                </Modal>
            )}
            <canvas ref={staticCanvasRef} className="w-full absolute h-screen" />
            <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={endDrawing} onMouseOut={endDrawing} className={`w-full absolute h-screen z-10 ${text ? "cursor-text" : "cursor-crosshair"}`} />
            <SaveDrawingModal isOpen={openModal.saveDrawing} close={() => setOpen((prev) => ({ ...prev, saveDrawing: true }))} elements={elements} title={drawing?.title} description={drawing?.description} />
        </div>
    );
};

export default DrawingBoard;