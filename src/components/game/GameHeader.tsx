import React from 'react';
import { PlayerMark } from '../../types/game';
import { IconLogo, IconO, IconRestart, IconX } from '../common/Icons';

interface GameHeaderProps {
  currentTurn: PlayerMark;
  onOpenRestartModal: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentTurn,
  onOpenRestartModal,
}) => {
  return (
    <header className="w-full flex items-center justify-between">
      {/* Logo */}
      <IconLogo className="h-8 w-auto" />

      {/* Turn Indicator Pill */}
      <div
        className="bg-navy-semi shadow-turn-pill rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3"
        aria-live="polite"
        aria-label={`Current turn is player ${currentTurn}`}
      >
        {currentTurn === 'X' ? (
          <IconX size={20} fillColor="#A8BFC9" />
        ) : (
          <IconO size={20} fillColor="#A8BFC9" />
        )}
        <span className="text-silver uppercase font-bold text-xs sm:text-sm tracking-wider">
          Turn
        </span>
      </div>

      {/* Restart Button */}
      <button
        type="button"
        onClick={onOpenRestartModal}
        aria-label="Restart game"
        className="w-10 h-10 sm:w-12 sm:h-12 bg-silver hover:bg-silver-hover shadow-btn-silver-sm rounded-xl flex items-center justify-center transition-all duration-150 active:translate-y-1 cursor-pointer text-navy-dark"
      >
        <IconRestart className="w-4 h-4 sm:w-5 sm:h-5 text-navy-dark" />
      </button>
    </header>
  );
};
