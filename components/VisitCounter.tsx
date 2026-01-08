
import React from 'react';

interface VisitCounterProps {
  count: number;
}

export const VisitCounter: React.FC<VisitCounterProps> = ({ count }) => {
  return (
    <div className="flex items-center gap-4 text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-4">
      <span className="cursor-default">Visitas ao Site: {count}</span>
    </div>
  );
};