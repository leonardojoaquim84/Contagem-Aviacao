
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Tem certeza?</h3>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Esta ação irá zerar todas as contagens atuais. Não é possível desfazer.
          </p>
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={onConfirm}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-red-200"
            >
              Sim, reiniciar tudo
            </button>
            <button 
              onClick={onCancel}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all active:scale-95"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
