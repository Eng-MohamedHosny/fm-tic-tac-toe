import React from 'react';
import { GameMode, PlayerMark } from '../../types/game';
import { Button } from '../common/Button';
import { IconLogo, IconO, IconX } from '../common/Icons';

interface StartMenuProps {
  player1Mark: PlayerMark;
  onSelectMark: (mark: PlayerMark) => void;
  onStartGame: (mode: GameMode) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  player1Mark,
  onSelectMark,
  onStartGame,
}) => {
  return (
    <div className="w-full max-w-[327px] sm:max-w-[460px] flex flex-col items-center gap-8 sm:gap-10">
      {/* Header Logo */}
      <IconLogo className="h-8 w-auto" />

      {/* Mark Selection Card */}
      <div className="w-full bg-navy-semi rounded-2xl shadow-tile p-6 sm:p-8 flex flex-col items-center">
        <h2 className="text-silver uppercase font-bold text-sm sm:text-base tracking-wider mb-6 text-center">
          Pick player 1&apos;s mark
        </h2>

        {/* Mark Selector Pill */}
        <div className="w-full bg-navy-dark rounded-xl p-2 flex items-center mb-4">
          {/* Option X */}
          <button
            type="button"
            onClick={() => onSelectMark('X')}
            aria-label="Select X as player 1"
            className={`flex-1 py-3 rounded-lg flex items-center justify-center transition-colors duration-150 cursor-pointer ${
              player1Mark === 'X'
                ? 'bg-silver'
                : 'hover:bg-navy-semi/50'
            }`}
          >
            <IconX
              size={32}
              fillColor={player1Mark === 'X' ? '#1A2A33' : '#A8BFC9'}
            />
          </button>

          {/* Option O */}
          <button
            type="button"
            onClick={() => onSelectMark('O')}
            aria-label="Select O as player 1"
            className={`flex-1 py-3 rounded-lg flex items-center justify-center transition-colors duration-150 cursor-pointer ${
              player1Mark === 'O'
                ? 'bg-silver'
                : 'hover:bg-navy-semi/50'
            }`}
          >
            <IconO
              size={32}
              fillColor={player1Mark === 'O' ? '#1A2A33' : '#A8BFC9'}
            />
          </button>
        </div>

        <p className="text-silver/50 uppercase font-medium text-xs sm:text-sm tracking-widest text-center">
          Remember : X goes first
        </p>
      </div>

      {/* Mode Action Buttons */}
      <div className="w-full flex flex-col gap-4 sm:gap-5">
        <Button
          variant="yellow"
          size="lg"
          fullWidth
          onClick={() => onStartGame('cpu')}
        >
          New Game (vs CPU)
        </Button>
        <Button
          variant="teal"
          size="lg"
          fullWidth
          onClick={() => onStartGame('pvp')}
        >
          New Game (vs Player)
        </Button>
      </div>
    </div>
  );
};
