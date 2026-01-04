
import React from 'react';

interface ResetButtonProps {
  onClick: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-[#fee2e2] text-[#ef4444] hover:bg-[#fecaca] px-10 py-4 rounded-full text-[11px] font-black tracking-[0.15em] transition-all duration-300 active:scale-95 shadow-md shadow-red-50/50 uppercase"
    >
      Reiniciar Contagem
    </button>
  );
};
