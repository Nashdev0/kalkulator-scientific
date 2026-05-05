import React, { useEffect } from 'react';
import { Delete } from 'lucide-react';

const SCIENTIFIC_BUTTONS = [
  { label: 'MC', value: 'MC', type: 'memory' },
  { label: 'MR', value: 'MR', type: 'memory' },
  { label: 'M+', value: 'M+', type: 'memory' },
  { label: 'M-', value: 'M-', type: 'memory' },
  { label: 'AC', value: 'AC', type: 'action' },
  
  { label: 'sinh', value: 'sinh(', type: 'func' },
  { label: 'cosh', value: 'cosh(', type: 'func' },
  { label: 'tanh', value: 'tanh(', type: 'func' },
  { label: 'nPr', value: 'nPr(', type: 'func' },
  { label: '⌫', value: 'DEL', type: 'action', icon: <Delete size={18} /> },

  { label: 'sin', value: 'sin(', type: 'func' },
  { label: 'cos', value: 'cos(', type: 'func' },
  { label: 'tan', value: 'tan(', type: 'func' },
  { label: 'nCr', value: 'nCr(', type: 'func' },
  { label: '÷', value: '÷', type: 'operator' },

  { label: 'ln', value: 'ln(', type: 'func' },
  { label: 'log', value: 'log(', type: 'func' },
  { label: '√', value: '√(', type: 'func' },
  { label: 'x√y', value: 'x√y(', type: 'func' },
  { label: '×', value: '×', type: 'operator' },

  { label: '!', value: '!', type: 'operator' },
  { label: '7', value: '7', type: 'number' },
  { label: '8', value: '8', type: 'number' },
  { label: '9', value: '9', type: 'number' },
  { label: '-', value: '-', type: 'operator' },

  { label: '|x|', value: '|', type: 'func' },
  { label: '4', value: '4', type: 'number' },
  { label: '5', value: '5', type: 'number' },
  { label: '6', value: '6', type: 'number' },
  { label: '+', value: '+', type: 'operator' },

  { label: 'mod', value: ' mod ', type: 'operator' },
  { label: '1', value: '1', type: 'number' },
  { label: '2', value: '2', type: 'number' },
  { label: '3', value: '3', type: 'number' },
  { label: '^', value: '^', type: 'operator' },

  { label: '∑', value: '∑(', type: 'func' },
  { label: 'π', value: 'π', type: 'constant' },
  { label: 'logₙ', value: 'logₙ(', type: 'func' },
  { label: ',', value: ', ', type: 'operator' },
  { label: '°', value: '°', type: 'operator' },

  { label: '(', value: '(', type: 'operator' },
  { label: '0', value: '0', type: 'number' },
  { label: '.', value: '.', type: 'number' },
  { label: ')', value: ')', type: 'operator' },
  { label: '=', value: '=', type: 'action_eval' },
];

const PROGRAMMER_BUTTONS = [
  { label: '<<', value: '<<', type: 'operator' },
  { label: '>>', value: '>>', type: 'operator' },
  { label: 'AND', value: '&', type: 'operator' },
  { label: 'OR', value: '|', type: 'operator' },
  { label: 'AC', value: 'AC', type: 'action' },

  { label: 'XOR', value: '^', type: 'operator' },
  { label: 'NOT', value: '~', type: 'operator' },
  { label: '(', value: '(', type: 'operator' },
  { label: ')', value: ')', type: 'operator' },
  { label: '⌫', value: 'DEL', type: 'action', icon: <Delete size={18} /> },

  { label: 'A', value: 'A', type: 'hex' },
  { label: 'B', value: 'B', type: 'hex' },
  { label: '7', value: '7', type: 'number' },
  { label: '8', value: '8', type: 'number' },
  { label: '9', value: '9', type: 'number' },

  { label: 'C', value: 'C', type: 'hex' },
  { label: 'D', value: 'D', type: 'hex' },
  { label: '4', value: '4', type: 'number' },
  { label: '5', value: '5', type: 'number' },
  { label: '6', value: '6', type: 'number' },

  { label: 'E', value: 'E', type: 'hex' },
  { label: 'F', value: 'F', type: 'hex' },
  { label: '1', value: '1', type: 'number' },
  { label: '2', value: '2', type: 'number' },
  { label: '3', value: '3', type: 'number' },

  { label: '0x', value: '0x', type: 'func' },
  { label: '0b', value: '0b', type: 'func' },
  { label: '0', value: '0', type: 'number' },
  { label: '0o', value: '0o', type: 'func' },
  { label: '=', value: '=', type: 'action_eval' },
];

export function Keypad({ dispatch, mode }) {
  const handlePress = (btn) => {
    switch (btn.value) {
      case 'AC':
        dispatch({ type: 'CLEAR' });
        break;
      case 'DEL':
        dispatch({ type: 'DELETE' });
        break;
      case '=':
        dispatch({ type: 'EVALUATE' });
        break;
      case 'MC':
        dispatch({ type: 'MEMORY_CLEAR' });
        break;
      case 'MR':
        dispatch({ type: 'MEMORY_RECALL' });
        break;
      case 'M+':
        dispatch({ type: 'MEMORY_ADD' });
        break;
      case 'M-':
        dispatch({ type: 'MEMORY_SUB' });
        break;
      default:
        dispatch({ type: 'APPEND', payload: btn.value });
        break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (/[0-9.A-Fa-f]/.test(key)) {
        if (mode === 'Programmer' || /[0-9.]/.test(key)) {
          dispatch({ type: 'APPEND', payload: key });
        }
      } else if (['+', '-', '*', '/', '(', ')', '^', '!', '&', '|', '~', '°', ','].includes(key)) {
        dispatch({ type: 'APPEND', payload: key });
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        dispatch({ type: 'EVALUATE' });
      } else if (key === 'Backspace') {
        dispatch({ type: 'DELETE' });
      } else if (key === 'Escape') {
        dispatch({ type: 'CLEAR' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, mode]);

  const buttons = mode === 'Programmer' ? PROGRAMMER_BUTTONS : SCIENTIFIC_BUTTONS;

  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 p-3 sm:p-4">
      {buttons.map((btn, index) => {
        let btnClass = 'glass-button rounded-full aspect-square text-lg sm:text-xl pixel-font flex items-center justify-center transition-all';
        
        if (btn.type === 'action_eval') {
          btnClass = 'glass-button-primary rounded-full aspect-square text-xl sm:text-2xl pixel-font flex items-center justify-center transition-all';
        } else if (btn.type === 'action') {
          btnClass = 'glass-button-accent rounded-full aspect-square text-lg sm:text-xl pixel-font flex items-center justify-center transition-all';
        } else if (btn.type === 'operator') {
          btnClass += ' bg-[#ffb6c1]/20 hover:bg-[#ffb6c1]/50';
        } else if (btn.type === 'func' || btn.type === 'memory' || btn.type === 'hex' || btn.type === 'constant') {
          btnClass += ' bg-[#dda0dd]/20 hover:bg-[#dda0dd]/50';
        } else {
          btnClass += ' bg-white/20';
        }

        return (
          <button
            key={index}
            className={btnClass}
            onClick={() => handlePress(btn)}
            aria-label={btn.label}
          >
            {btn.icon || btn.label}
          </button>
        );
      })}
    </div>
  );
}
