
import React from 'react';
import { CabinState } from '../App';

interface CabinItemProps {
  label: string;
  cabin: CabinState;
  onSave: () => void;
  onRestore: (cabin: CabinState) => void;
}

const CabinItem: React.FC<CabinItemProps> = ({ label, cabin, onSave, onRestore }) => {
  const mainCount = cabin.adult + cabin.child;
  const lapCount = cabin.lap;

  return (
    <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-50 p-3 flex flex-col items-center">
      <span className="text-[8px] font-black text-slate-400 tracking-widest uppercase mb-1">
        {label}
      </span>
      <button 
        onClick={() => onRestore(cabin)}
        className="group relative text-lg font-bold text-slate-700 mb-2 tabular-nums hover:text-blue-600 transition-colors cursor-pointer flex items-baseline"
        title="Clique para restaurar esta contagem nos displays"
      >
        {mainCount}
        <span className="mx-1 text-slate-200 font-normal">/</span>
        <span className="text-sm text-slate-400">{lapCount}</span>
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Restaurar
        </span>
      </button>
      <button 
        onClick={onSave}
        className="w-full bg-slate-800 hover:bg-slate-900 text-white text-[9px] font-bold py-1.5 rounded-lg transition-all active:scale-95 shadow-sm uppercase tracking-tighter"
      >
        Salvar
      </button>
    </div>
  );
};

interface CabinDisplayProps {
  cabinA: CabinState;
  cabinC: CabinState;
  onSaveA: () => void;
  onSaveC: () => void;
  onRestoreCabin: (cabin: CabinState) => void;
}

export const CabinDisplay: React.FC<CabinDisplayProps> = ({ 
  cabinA, 
  cabinC, 
  onSaveA, 
  onSaveC,
  onRestoreCabin 
}) => {
  return (
    <div className="w-full max-w-md flex gap-3 px-2">
      <CabinItem label="Cabine A" cabin={cabinA} onSave={onSaveA} onRestore={onRestoreCabin} />
      <CabinItem label="Cabine C" cabin={cabinC} onSave={onSaveC} onRestore={onRestoreCabin} />
    </div>
  );
};
