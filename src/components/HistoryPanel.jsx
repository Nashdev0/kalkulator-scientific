import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

export function HistoryPanel({ history, dispatch, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-y-0 right-0 w-64 sm:w-80 glass-panel border-l border-white/10 z-20 flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
      <div className="p-4 flex items-center justify-between border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-2 text-slate-200">
          <Clock size={18} />
          <h2 className="font-medium">History</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => dispatch({ type: 'CLEAR_HISTORY' })}
            className="p-2 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
            title="Clear History"
          >
            <Trash2 size={16} />
          </button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {history.length === 0 ? (
          <div className="text-center p-4 text-slate-500 text-sm">
            No history yet
          </div>
        ) : (
          history.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                dispatch({ type: 'RESTORE_HISTORY', payload: item.expression });
                if (window.innerWidth < 640) onClose(); // Close on mobile after selection
              }}
              className="w-full text-right p-3 hover:bg-white/5 rounded-xl transition-colors group"
            >
              <div className="text-sm text-slate-400 font-mono mb-1 truncate">{item.expression}</div>
              <div className="text-lg text-slate-200 font-mono group-hover:text-blue-400 transition-colors truncate">={item.result}</div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
