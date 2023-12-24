import React, { useState } from 'react';
import { BsBrush } from 'react-icons/bs';
import { GrPowerReset } from 'react-icons/gr';
import { HiOutlineMinus } from 'react-icons/hi';
import { PiEraser, PiRectangle, PiTextT } from 'react-icons/pi';
import { GoCircle, GoDiamond, GoArrowRight, GoPencil } from 'react-icons/go';

interface IToolbarButtonProps {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    isSelected: boolean;
}

const ToolbarButton: React.FC<IToolbarButtonProps> = ({ title, icon, onClick, isSelected }) => {
    return (
        <button
            title={title}
            onClick={onClick}
            className={`focus:outline-none focus:border-none hover:bg-red-100 p-2 rounded-lg ${isSelected ? 'bg-red-200 hover:bg-red-200' : ''}`}
        >
            {icon}
        </button>
    );
};

interface IToolbarProps {
    onModeChange: (mode: string) => void;
    onColorChange: (color: string) => void;
    onReset: () => void;
}

const DrawingToolbar: React.FC<IToolbarProps> = ({ onModeChange, onColorChange, onReset }) => {
    const [selectedMode, setSelectedMode] = useState<string | null>(null);

    const buttons = [
        { title: 'Rectangle', icon: <PiRectangle />, onClick: () => handleModeChange('rectangle') },
        { title: 'Diamond', icon: <GoDiamond />, onClick: () => handleModeChange('diamond') },
        { title: 'Circle', icon: <GoCircle />, onClick: () => handleModeChange('circle') },
        { title: 'Line', icon: <HiOutlineMinus />, onClick: () => handleModeChange('line') },
        { title: 'Arrow', icon: <GoArrowRight />, onClick: () => handleModeChange('arrow') },
        { title: 'Pencil', icon: <GoPencil />, onClick: () => handleModeChange('pencil') },
        { title: 'Brush', icon: <BsBrush />, onClick: () => handleModeChange('brush') },
        { title: 'Text', icon: <PiTextT /> , onClick: () => handleModeChange('text') },
        { title: 'Eraser', icon: <PiEraser />, onClick: () => handleModeChange('eraser') },
    ];

    const handleModeChange = (mode: string) => {
        onModeChange(mode);
        setSelectedMode(mode);
    };

    return (
        <div className="flex items-center gap-1 border p-1 rounded-xl shadow-sm mb-4">
            {buttons.map((button, index) => (
                <ToolbarButton key={`toolbar_button_${button.title}__${index}`} {...button} isSelected={button.title.toLowerCase() === selectedMode} />
            ))}
            <input className='w-8 outline-none border-none bg-transparent cursor-pointer' type="color" onChange={(e) => onColorChange(e.target.value)} />
            <ToolbarButton title="Reset" icon={<GrPowerReset />} onClick={onReset} isSelected={false} />
        </div>
    );
};

export default DrawingToolbar;
