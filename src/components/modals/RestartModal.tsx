import React from 'react';
import { Button } from '../common/Button';

interface RestartModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onRestart: () => void;
}

export const RestartModal: React.FC<RestartModalProps> = ({
  isOpen,
  onCancel,
  onRestart,
}) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="restart-heading"
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn"
    >
      <div className="w-full bg-navy-semi py-10 sm:py-11 flex flex-col items-center px-6 animate-popIn">
        <h2
          id="restart-heading"
          className="text-2xl sm:text-4xl font-bold uppercase tracking-wider text-silver mb-6 sm:mb-8"
        >
          Restart game?
        </h2>

        <div className="flex items-center gap-4">
          <Button variant="silver" size="sm" onClick={onCancel}>
            No, cancel
          </Button>
          <Button variant="yellow" size="sm" onClick={onRestart}>
            Yes, restart
          </Button>
        </div>
      </div>
    </div>
  );
};
