
import React from 'react';

interface TotalDisplayProps {
  adult: number;
  child: number;
  lap: number;
}

export const TotalDisplay: React.FC<TotalDisplayProps> = ({ adult, child, lap }) => {
  const mainCount = adult + child;
  const pobCount = adult + child + lap;

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-slate-100 border border-slate-50 px-8 py-4 flex flex-col items-center min-w-[200px] transition-all duration-300 relative overflow-hidden">
      {/* Discreet POB Display */}
      <div className="absolute top-2 right-4 flex flex-col items-end opacity-70">
        <span className="text-[8px] font-black text-slate-400 tracking-[0.2em]">POB</span>
        <span className="text-[18px] font-bold text-slate-500 tabular-nums leading-none">
          {pobCount}
        </span>
      </div>

      <span className="text-[8px] font-bold text-slate-400 tracking-[0.2em] mb-1">
        TOTAL GERAL
      </span>
      <span className="text-4xl font-extrabold text-[#1e3a8a] tabular-nums flex items-baseline">
        {mainCount}
        <span className="mx-1.5 text-slate-200 font-light">/</span>
        <span className="text-2xl text-blue-400">{lap}</span>
      </span>
    </div>
  );
};