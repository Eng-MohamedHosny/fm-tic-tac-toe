import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GameMode, PlayerMark, RoundStatus } from '../../types/game';
import { Button } from '../common/Button';
import { IconO, IconX } from '../common/Icons';

interface RoundOverModalProps {
  status: RoundStatus;
  winner: PlayerMark | null;
  mode: GameMode | null;
  player1Mark: PlayerMark;
  onQuit: () => void;
  onNextRound: () => void;
}

export const RoundOverModal: React.FC<RoundOverModalProps> = ({
  status,
  winner,
  mode,
  player1Mark,
  onQuit,
  onNextRound,
}) => {
  useEffect(() => {
    if (status === 'won') {
      const colors = winner === 'X' ? ['#31C3BD', '#65E9E4'] : ['#F2B137', '#FFC860'];
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors,
          disableForReducedMotion: true,
        });
      } catch {
        // Safe fallback if canvas is restricted
      }
    }
  }, [status, winner]);

  if (status === 'in-progress') return null;

  const getSubheading = () => {
    if (status === 'tied' || !winner) return null;

    if (mode === 'cpu') {
      return winner === player1Mark ? 'YOU WON!' : 'OH NO, YOU LOST…';
    }
    return winner === player1Mark ? 'PLAYER 1 WINS!' : 'PLAYER 2 WINS!';
  };

  const subheading = getSubheading();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="round-result-heading"
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn"
    >
      <div className="w-full bg-navy-semi py-10 sm:py-11 flex flex-col items-center px-6 animate-popIn">
        {subheading && (
          <p className="text-silver font-bold uppercase text-xs sm:text-base tracking-widest mb-4">
            {subheading}
          </p>
        )}

        {/* Winner Announcement or Tie */}
        {status === 'won' && winner ? (
          <div
            id="round-result-heading"
            className="flex items-center gap-3 sm:gap-6 mb-6 sm:mb-8"
          >
            {winner === 'X' ? (
              <IconX size={40} className="w-8 h-8 sm:w-16 sm:h-16" />
            ) : (
              <IconO size={40} className="w-8 h-8 sm:w-16 sm:h-16" />
            )}
            <h2
              className={`text-2xl sm:text-4xl font-bold uppercase tracking-wider ${
                winner === 'X' ? 'text-teal' : 'text-yellow'
              }`}
            >
              Takes the round
            </h2>
          </div>
        ) : (
          <h2
            id="round-result-heading"
            className="text-2xl sm:text-4xl font-bold uppercase tracking-wider text-silver mb-6 sm:mb-8"
          >
            Round tied
          </h2>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button variant="silver" size="sm" onClick={onQuit}>
            Quit
          </Button>
          <Button variant="yellow" size="sm" onClick={onNextRound}>
            Next Round
          </Button>
        </div>
      </div>
    </div>
  );
};
