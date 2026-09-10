import React from 'react';
import { GameMode, PlayerMark, ScoreState } from '../../types/game';

interface ScoreBoardProps {
  scores: ScoreState;
  mode: GameMode;
  player1Mark: PlayerMark;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  scores,
  mode,
  player1Mark,
}) => {
  const getLabel = (mark: PlayerMark) => {
    if (mode === 'cpu') {
      return player1Mark === mark ? `${mark} (YOU)` : `${mark} (CPU)`;
    }
    return player1Mark === mark ? `${mark} (P1)` : `${mark} (P2)`;
  };

  return (
    <footer className="w-full grid grid-cols-3 gap-5">
      {/* X Score Card */}
      <div className="bg-teal text-navy-dark rounded-2xl py-3 sm:py-4 px-2 flex flex-col items-center justify-center">
        <span className="text-[12px] sm:text-sm font-medium tracking-wider uppercase text-center">
          {getLabel('X')}
        </span>
        <span className="text-xl sm:text-2xl font-bold">{scores.x}</span>
      </div>

      {/* Ties Score Card */}
      <div className="bg-silver text-navy-dark rounded-2xl py-3 sm:py-4 px-2 flex flex-col items-center justify-center">
        <span className="text-[12px] sm:text-sm font-medium tracking-wider uppercase text-center">
          Ties
        </span>
        <span className="text-xl sm:text-2xl font-bold">{scores.ties}</span>
      </div>

      {/* O Score Card */}
      <div className="bg-yellow text-navy-dark rounded-2xl py-3 sm:py-4 px-2 flex flex-col items-center justify-center">
        <span className="text-[12px] sm:text-sm font-medium tracking-wider uppercase text-center">
          {getLabel('O')}
        </span>
        <span className="text-xl sm:text-2xl font-bold">{scores.o}</span>
      </div>
    </footer>
  );
};
