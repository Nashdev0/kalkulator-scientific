import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import * as math from 'mathjs';

export default function GraphingModule() {
  const [funcStr, setFuncStr] = useState('sin(x)');
  const [error, setError] = useState('');

  const data = useMemo(() => {
    try {
      const compiled = math.compile(funcStr);
      const points = [];
      for (let x = -10; x <= 10; x += 0.5) {
        let y = compiled.evaluate({ x });
        if (typeof y === 'object' && y.isComplex) {
          y = y.re; // Just plot the real part if it's complex for simplicity
        }
        points.push({ x, y });
      }
      setError('');
      return points;
    } catch (err) {
      setError('Invalid function');
      return [];
    }
  }, [funcStr]);

  return (
    <div className="p-4 flex flex-col h-full bg-black/40">
      <div className="mb-4">
        <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">Function f(x)</label>
        <div className="flex relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono">f(x) =</span>
          <input
            type="text"
            value={funcStr}
            onChange={(e) => setFuncStr(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-lg py-2 pl-14 pr-4 text-slate-200 font-mono outline-none focus:border-blue-500/50 transition-colors"
            placeholder="e.g. sin(x) or 2*x^2 + 5"
          />
        </div>
        {error && <div className="text-rose-400 text-xs mt-1">{error}</div>}
      </div>

      <div className="flex-1 min-h-[250px] w-full border border-white/5 rounded-xl bg-black/20 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
            <XAxis dataKey="x" stroke="#94a3b8" tick={{fontSize: 10}} />
            <YAxis stroke="#94a3b8" tick={{fontSize: 10}} domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#60a5fa' }}
            />
            <ReferenceLine y={0} stroke="#ffffff33" />
            <ReferenceLine x={0} stroke="#ffffff33" />
            <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
