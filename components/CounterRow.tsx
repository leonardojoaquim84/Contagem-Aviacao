
import React from 'react';

interface CounterRowProps {
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  colorClass: string;
  hoverClass: string;
  labelColorClass?: string;
}

export const CounterRow: React.FC<CounterRowProps> = ({ 
  label, 
  count, 
  onIncrement, 
  onDecrement,
  colorClass, 
  hoverClass,
  labelColorClass = "text-white"
}) => {
  return (
    <div className="flex items-center justify-between gap-4 w-full h-24">
      {/* Left Button - Increment */}
      <button 
        onClick={onIncrement}
        className={`${colorClass} ${hoverClass} flex-1 h-full rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center`}
      >
        <span className={`text-[12px] font-extrabold tracking-widest ${labelColorClass}`}>
          {label}
        </span>
      </button>

      {/* Middle Display - Decrement */}
      <button 
        onClick={onDecrement}
        className="bg-white flex-1 h-full rounded-2xl shadow-sm border border-slate-50 flex items-center justify-center transition-all active:scale-95 hover:bg-slate-50 group cursor-pointer relative overflow-hidden"
        title="Clique para diminuir"
      >
        <span className="text-5xl font-bold text-slate-800 tabular-nums relative z-10 group-hover:text-red-500 transition-colors">
          {count}
        </span>
        <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </button>

      {/* Right Button - Increment */}
      <button 
        onClick={onIncrement}
        className={`${colorClass} ${hoverClass} flex-1 h-full rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center`}
      >
        <span className={`text-[12px] font-extrabold tracking-widest ${labelColorClass}`}>
          {label}
        </span>
      </button>
    </div>
  );
};
