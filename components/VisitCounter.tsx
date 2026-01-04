
import React from 'react';

interface VisitCounterProps {
  count: number;
}

export const VisitCounter: React.FC<VisitCounterProps> = ({ count }) => {
  return (
    <div className="flex items-center gap-4 text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-4">
      <span className="cursor-default">Visitas ao Site: {count}</span>
      <span className="text-slate-200 cursor-default">|</span>
      <a 
        href="https://wa.me/5521997391448" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-slate-600 transition-colors decoration-slate-200 hover:underline underline-offset-2"
      >
        Fale com o desenvolvedor
      </a>
    </div>
  );
};
