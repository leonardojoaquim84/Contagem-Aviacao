
import React, { useState, useEffect, useCallback } from 'react';
import { TotalDisplay } from './components/TotalDisplay';
import { CounterRow } from './components/CounterRow';
import { ResetButton } from './components/ResetButton';
import { ConfirmationModal } from './components/ConfirmationModal';
import { CabinDisplay } from './components/CabinDisplay';

export interface CabinState {
  adult: number;
  child: number;
  lap: number;
}

const App: React.FC = () => {
  // Current session counters (middle displays)
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childCount, setChildCount] = useState<number>(0);
  const [lapCount, setLapCount] = useState<number>(0);
  
  // Cabin snapshots (Saved states)
  const [cabinA, setCabinA] = useState<CabinState>({ adult: 0, child: 0, lap: 0 });
  const [cabinC, setCabinC] = useState<CabinState>({ adult: 0, child: 0, lap: 0 });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showReminder, setShowReminder] = useState<boolean>(false);
  
  // Initial hint states
  const [showHint, setShowHint] = useState<boolean>(true);
  const [hintOpacity, setHintOpacity] = useState<boolean>(true);

  // Initialize hint timer on mount
  useEffect(() => {
    // Hint timer: visible for 2 seconds, then fade out
    const timer = setTimeout(() => {
      setHintOpacity(false); // Start fade out
      setTimeout(() => setShowHint(false), 600); // Remove from DOM after fade completes
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIncrementAdult = useCallback(() => setAdultCount(prev => prev + 1), []);
  const handleIncrementChild = useCallback(() => setChildCount(prev => prev + 1), []);
  const handleIncrementLap = useCallback(() => setLapCount(prev => prev + 1), []);

  const handleDecrementAdult = useCallback(() => setAdultCount(prev => Math.max(0, prev - 1)), []);
  const handleDecrementChild = useCallback(() => setChildCount(prev => Math.max(0, prev - 1)), []);
  const handleDecrementLap = useCallback(() => setLapCount(prev => Math.max(0, prev - 1)), []);

  // Total Geral: Strictly the sum of Cabin A and Cabin C
  const totalAdult = cabinA.adult + cabinC.adult;
  const totalChild = cabinA.child + cabinC.child;
  const totalLap = cabinA.lap + cabinC.lap;

  const handleSaveA = () => {
    setCabinA({ adult: adultCount, child: childCount, lap: lapCount });
    // Reset central displays after saving
    setAdultCount(0);
    setChildCount(0);
    setLapCount(0);
  };

  const handleSaveC = () => {
    setCabinC({ adult: adultCount, child: childCount, lap: lapCount });
    // Reset central displays after saving
    setAdultCount(0);
    setChildCount(0);
    setLapCount(0);
  };

  const handleRestoreCabin = (cabin: CabinState) => {
    // Populate central counters with cabin data
    setAdultCount(cabin.adult);
    setChildCount(cabin.child);
    setLapCount(cabin.lap);
  };

  const openResetConfirmation = () => {
    setIsModalOpen(true);
  };

  const handleReset = () => {
    // Clear everything
    setAdultCount(0);
    setChildCount(0);
    setLapCount(0);
    setCabinA({ adult: 0, child: 0, lap: 0 });
    setCabinC({ adult: 0, child: 0, lap: 0 });
    setIsModalOpen(false);
  };

  const handleCancelReset = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8 select-none bg-slate-50/50 relative overflow-hidden">
      
      {/* "Lembrete" Trigger in Top Right Corner */}
      <button 
        onClick={() => setShowReminder(true)}
        className="absolute top-6 right-6 text-[9px] font-semibold text-slate-500 uppercase tracking-widest hover:text-slate-700 transition-colors cursor-pointer"
      >
        Lembrete
      </button>

      {/* Reminder Overlay Message */}
      {showReminder && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          onClick={() => setShowReminder(false)}
        >
          {/* Subtle backdrop */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
          
          <div className="relative bg-white shadow-2xl rounded-2xl p-8 border border-slate-100 max-w-sm w-full animate-in fade-in zoom-in duration-300">
            <p className="text-slate-800 text-sm text-center leading-relaxed font-medium">
              No E195 – E2, a zona de cabine A estende-se do início até a segunda janela de emergência (inclusive), sendo da fileira 1 a 15. A zona de cabine C vai da primeira fileira após a segunda janela de emergência até o final, sendo da fileira 16 a 34.
            </p>
            <div className="mt-6 flex justify-center">
               <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Toque para fechar</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center space-y-4 w-full">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Contador
          </h1>

          <TotalDisplay 
            adult={totalAdult} 
            child={totalChild} 
            lap={totalLap} 
          />
        </div>

        <CabinDisplay 
          cabinA={cabinA} 
          cabinC={cabinC} 
          onSaveA={handleSaveA} 
          onSaveC={handleSaveC} 
          onRestoreCabin={handleRestoreCabin}
        />
      </div>

      <div className="w-full max-w-md space-y-6 relative">
        <CounterRow 
          label="ADULTO" 
          count={adultCount} 
          onIncrement={handleIncrementAdult}
          onDecrement={handleDecrementAdult}
          colorClass="bg-[#213a8a]" 
          hoverClass="hover:bg-[#1e3a8a]"
        />

        {/* Initial Hint Message - positioned between adult and child counters */}
        {showHint && (
          <div 
            className={`absolute left-0 right-0 z-20 flex justify-center pointer-events-none transition-opacity duration-500 ease-out ${hintOpacity ? 'opacity-100' : 'opacity-0'}`}
            style={{ top: 'calc(6rem - 24px)' }} // Adjusted for two lines
          >
            <div className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.1em] text-center block leading-tight">
                toque no número<br />para subtrair
              </span>
            </div>
          </div>
        )}

        <CounterRow 
          label="CRIANÇA" 
          count={childCount} 
          onIncrement={handleIncrementChild}
          onDecrement={handleDecrementChild}
          colorClass="bg-[#2563eb]" 
          hoverClass="hover:bg-[#1d4ed8]"
        />

        <CounterRow 
          label="COLO" 
          count={lapCount} 
          onIncrement={handleIncrementLap}
          onDecrement={handleDecrementLap}
          colorClass="bg-[#bfdbfe]" 
          labelColorClass="text-[#1e3a8a]"
          hoverClass="hover:bg-[#93c5fd]"
        />
      </div>

      <div className="mt-8 flex flex-col items-center space-y-6">
        <ResetButton onClick={openResetConfirmation} />
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen} 
        onConfirm={handleReset} 
        onCancel={handleCancelReset} 
      />
    </div>
  );
};

export default App;
