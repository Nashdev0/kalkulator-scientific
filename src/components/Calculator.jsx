import React, { useState, Suspense, lazy } from 'react';
import { History, ArrowRightLeft, Settings2 } from 'lucide-react';
import { useCalculator } from '../hooks/useCalculator';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { HistoryPanel } from './HistoryPanel';
import { UnitConverter } from './UnitConverter';

// Lazily load GraphingModule to keep initial bundle size small
const GraphingModule = lazy(() => import('./GraphingModule'));

const MODES = ['Scientific', 'Programmer', 'Graphing'];

export function Calculator() {
  const [state, dispatch] = useCalculator();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const switchMode = (mode) => {
    dispatch({ type: 'SET_MODE', payload: mode });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto my-8 sm:my-16">
      
      {/* Cute Peeking Bunny SVG */}
      <div className="absolute -top-[65px] left-1/2 -translate-x-1/2 z-0 w-[120px] h-[80px]">
        <svg width="100%" height="100%" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <path d="M 30 70 C 10 -10, 40 -10, 45 40" fill="#ffb6c1" stroke="#ff69b4" strokeWidth="4"/>
          <path d="M 90 70 C 110 -10, 80 -10, 75 40" fill="#ffb6c1" stroke="#ff69b4" strokeWidth="4"/>
          {/* Head */}
          <path d="M 15 80 C 15 30, 105 30, 105 80" fill="#ffb6c1" stroke="#ff69b4" strokeWidth="4"/>
          
          {/* Blinking Eyes */}
          <g className="animate-blink" style={{ transformOrigin: '60px 55px' }}>
            <ellipse cx="40" cy="55" rx="4" ry="7" fill="#c71585" />
            <circle cx="39" cy="52" r="1.5" fill="white" />
            <ellipse cx="80" cy="55" rx="4" ry="7" fill="#c71585" />
            <circle cx="79" cy="52" r="1.5" fill="white" />
          </g>
          
          {/* Blush */}
          <ellipse cx="28" cy="62" rx="6" ry="3" fill="#ff1493" opacity="0.4"/>
          <ellipse cx="92" cy="62" rx="6" ry="3" fill="#ff1493" opacity="0.4"/>
          
          {/* Mouth */}
          <path d="M 55 60 Q 60 65, 65 60" fill="none" stroke="#c71585" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Main Calculator Body */}
      <div className="relative glass-panel overflow-hidden flex flex-col bg-[#dda0dd] min-h-[600px] border-[4px] border-[#ff69b4] shadow-[8px_8px_0px_#ff1493] rounded-3xl z-10">
        
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center p-3 sm:p-4 border-b-4 border-[#ff69b4] bg-[#ffb6c1] relative z-10 rounded-t-[1.5rem]">
          <button 
            onClick={() => setIsConverterOpen(!isConverterOpen)}
            className="p-2 rounded-full bg-[#ffb6c1] text-white border-[2px] border-[#ff69b4] hover:bg-[#ff69b4] active:translate-y-1 active:shadow-none shadow-[0_3px_0px_#ff1493] transition-all"
            title="Unit Converter"
          >
            <ArrowRightLeft size={16} />
          </button>
          
          <div className="relative flex items-center justify-center flex-1">
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-1 text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase transition-all px-3 py-1 sm:py-2 rounded-full bg-[#ff69b4] border-[2px] border-[#c71585] shadow-[0_3px_0px_#8b0a50] hover:bg-[#ff1493] active:translate-y-1 active:shadow-none font-sans"
            >
              <Settings2 size={12} />
              {state.mode}
            </button>

            {/* Mode Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full mt-2 w-40 bg-[#ffe4e1] rounded-2xl border-[3px] border-[#ff69b4] shadow-[0_6px_0px_#ff1493] overflow-hidden flex flex-col py-2 z-30 font-bold text-[#c71585]">
                {MODES.map((m) => (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={`px-4 py-2 text-sm text-left transition-colors ${state.mode === m ? 'text-[#ff1493] bg-[#ffb6c1] font-black' : 'hover:bg-[#ffb6c1]/50'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="p-2 rounded-full bg-[#ffb6c1] text-white border-[2px] border-[#ff69b4] hover:bg-[#ff69b4] active:translate-y-1 active:shadow-none shadow-[0_3px_0px_#ff1493] transition-all relative"
            title="History"
          >
            <History size={16} />
            {state.history.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff1493] rounded-full border-2 border-[#ffe4e1]"></span>
            )}
          </button>
        </div>

        {/* Dynamic Content based on Mode */}
        {state.mode === 'Graphing' ? (
          <Suspense fallback={<div className="flex-1 flex items-center justify-center text-[#c71585] font-bold">Memuat Grafik... 🎀</div>}>
            <GraphingModule />
          </Suspense>
        ) : (
          <>
            <div className="p-4 bg-[#dda0dd]">
              <Display expression={state.expression} result={state.result} mode={state.mode} memory={state.memory} angleMode={state.angleMode} dispatch={dispatch} />
            </div>
            <div className="flex-1 px-2 pb-2 bg-[#dda0dd]">
              <Keypad dispatch={dispatch} mode={state.mode} />
            </div>
          </>
        )}

        {/* Cute Footer Text */}
        <div className="text-center pb-3 text-[10px] sm:text-xs font-bold text-[#c71585] tracking-[0.2em] uppercase pixel-font opacity-80">
          🎀 FROM 2008 TO 3006 🎀
        </div>
      </div>

      {/* Slide-over Panels */}
      <HistoryPanel 
        history={state.history} 
        dispatch={dispatch} 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
      />
      
      <UnitConverter 
        isOpen={isConverterOpen} 
        onClose={() => setIsConverterOpen(false)} 
      />
    </div>
  );
}
