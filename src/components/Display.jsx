import React from 'react';

function getProgrammerValues(resultStr) {
  const val = parseInt(resultStr, 10);
  if (isNaN(val)) return { HEX: '0', DEC: '0', OCT: '0', BIN: '0' };
  
  // Handling negative numbers for binary (using 32-bit two's complement for display)
  const hex = (val >>> 0).toString(16).toUpperCase();
  const oct = (val >>> 0).toString(8);
  const bin = (val >>> 0).toString(2);
  
  return {
    HEX: hex,
    DEC: val.toString(10),
    OCT: oct,
    BIN: bin
  };
}

export function Display({ expression, result, mode, memory, angleMode, dispatch }) {
  const progValues = mode === 'Programmer' ? getProgrammerValues(result || expression || '0') : null;

  return (
    <div className="p-4 sm:p-6 text-right space-y-2 border-b-4 border-[#ff69b4] bg-[#ffe4e1] rounded-t-[1.5rem] relative">
      {/* Memory Indicator */}
      {memory !== 0 && (
        <div className="absolute top-4 left-4 text-xs font-bold text-white bg-[#c71585] px-3 py-1 rounded-full shadow-[0_3px_0px_#8b008b] border-[2px] border-[#ff1493] flex items-center justify-center pixel-font">
          Mem: {memory}
        </div>
      )}

      {/* Angle Mode Toggle */}
      {mode === 'Scientific' && (
        <button 
          onClick={() => dispatch({ type: 'TOGGLE_ANGLE_MODE' })}
          className="absolute top-4 right-4 text-xs font-bold text-white bg-[#ff69b4] px-3 py-1 rounded-full shadow-[0_4px_0px_#c71585] hover:bg-[#ff1493] active:translate-y-1 active:shadow-none transition-all flex items-center gap-1 pixel-font border-[2px] border-[#c71585]"
          title="Klik untuk mengubah mode sudut"
        >
          <span>Sudut:</span> {angleMode}
        </button>
      )}

      {/* Programmer mode side-panel / rows */}
      {mode === 'Programmer' && (
        <div className="text-left text-xs sm:text-sm pixel-font text-[#c71585] space-y-1 mb-4 bg-white/50 p-3 rounded-2xl border-[3px] border-[#ffb6c1] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
          <div className="flex border-b border-[#ffb6c1]/50 pb-1">
            <span className="w-10 font-bold text-[#ff1493]">HEX</span>
            <span className="truncate">{progValues.HEX}</span>
          </div>
          <div className="flex border-b border-[#ffb6c1]/50 pb-1 pt-1">
            <span className="w-10 font-bold text-[#ff69b4]">DEC</span>
            <span className="truncate">{progValues.DEC}</span>
          </div>
          <div className="flex border-b border-[#ffb6c1]/50 pb-1 pt-1">
            <span className="w-10 font-bold text-[#da70d6]">OCT</span>
            <span className="truncate">{progValues.OCT}</span>
          </div>
          <div className="flex pt-1">
            <span className="w-10 font-bold text-[#ba55d3]">BIN</span>
            <span className="truncate break-all">{progValues.BIN}</span>
          </div>
        </div>
      )}

      {mode !== 'Programmer' && (
        <div 
          className="text-[#c71585] text-xl min-h-[28px] overflow-x-auto whitespace-nowrap scrollbar-hide pixel-font tracking-wider mt-6"
        >
          {expression || '0'}
        </div>
      )}
      
      {mode === 'Programmer' && (
         <div 
         className="text-[#c71585] text-xl min-h-[28px] overflow-x-auto whitespace-nowrap scrollbar-hide pixel-font tracking-wider mt-6"
       >
         {expression || '0'}
       </div>
      )}

      <div 
        className="text-5xl sm:text-7xl font-bold text-[#ff1493] overflow-x-auto whitespace-nowrap scrollbar-hide pixel-font tracking-tight mt-2"
      >
        {result || '='}
      </div>
    </div>
  );
}
