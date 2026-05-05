import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const CONVERSIONS = {
  Length: {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    mi: 0.000621371,
    yd: 1.09361,
    ft: 3.28084,
    in: 39.3701,
  },
  Weight: {
    kg: 1,
    g: 1000,
    mg: 1000000,
    lb: 2.20462,
    oz: 35.274,
  },
  Temperature: {
    C: 'C',
    F: 'F',
    K: 'K',
  }
};

export function UnitConverter({ isOpen, onClose }) {
  const [category, setCategory] = useState('Length');
  const [fromUnit, setFromUnit] = useState(Object.keys(CONVERSIONS.Length)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(CONVERSIONS.Length)[1]);
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setCategory(newCat);
    const units = Object.keys(CONVERSIONS[newCat]);
    setFromUnit(units[0]);
    setToUnit(units[1]);
  };

  const calculateConversion = () => {
    if (!inputValue || isNaN(inputValue)) return '';
    const val = parseFloat(inputValue);

    if (category === 'Temperature') {
      let c;
      if (fromUnit === 'C') c = val;
      else if (fromUnit === 'F') c = (val - 32) * 5/9;
      else if (fromUnit === 'K') c = val - 273.15;

      if (toUnit === 'C') return c.toFixed(4);
      else if (toUnit === 'F') return ((c * 9/5) + 32).toFixed(4);
      else if (toUnit === 'K') return (c + 273.15).toFixed(4);
    } else {
      const baseVal = val / CONVERSIONS[category][fromUnit];
      const result = baseVal * CONVERSIONS[category][toUnit];
      return result.toPrecision(7).replace(/\.?0+$/, '');
    }
  };

  return (
    <div className="absolute inset-y-0 left-0 w-64 sm:w-80 glass-panel border-r border-white/10 z-20 flex flex-col transform transition-transform duration-300 ease-in-out">
      <div className="p-4 flex items-center justify-between border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-2 text-slate-200">
          <ArrowRightLeft size={18} />
          <h2 className="font-medium">Unit Converter</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className="space-y-1">
          <label className="text-xs text-slate-400 uppercase font-medium tracking-wider">Category</label>
          <select 
            value={category} 
            onChange={handleCategoryChange}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none focus:border-blue-500/50 transition-colors appearance-none"
          >
            {Object.keys(CONVERSIONS).map(cat => (
              <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-2 p-3 bg-black/20 rounded-xl border border-white/5">
            <select 
              value={fromUnit} 
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-transparent text-slate-300 outline-none text-sm appearance-none"
            >
              {Object.keys(CONVERSIONS[category]).map(unit => (
                <option key={unit} value={unit} className="bg-slate-900">{unit}</option>
              ))}
            </select>
            <input 
              type="number" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="0"
              className="w-full bg-transparent text-2xl text-slate-100 font-mono outline-none"
            />
          </div>

          <div className="flex justify-center -my-2 relative z-10">
            <div className="bg-blue-500/20 p-2 rounded-full border border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <ArrowRightLeft size={16} className="rotate-90" />
            </div>
          </div>

          <div className="space-y-2 p-3 bg-white/5 rounded-xl border border-white/10">
            <select 
              value={toUnit} 
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-transparent text-slate-300 outline-none text-sm appearance-none"
            >
              {Object.keys(CONVERSIONS[category]).map(unit => (
                <option key={unit} value={unit} className="bg-slate-900">{unit}</option>
              ))}
            </select>
            <div className="w-full bg-transparent text-2xl text-slate-100 font-mono overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
              {calculateConversion() || '0'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
