import React, { useState } from 'react';
import clsx from 'clsx';
import { PlayerMark } from '../../types/game';
import { IconO, IconOOutline, IconX, IconXOutline } from '../common/Icons';

interface TileProps {
  index: number;
  value: PlayerMark | null;
  isWinningTile: boolean;
  currentTurn: PlayerMark;
  disabled: boolean;
  onSelect: (index: number) => void;
}

export const Tile: React.FC<TileProps> = ({
  index,
  value,
  isWinningTile,
  currentTurn,
  disabled,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled && value === null) {
      onSelect(index);
    }
  };

  // Winning tile background overrides
  const getTileStyles = () => {
    if (isWinningTile) {
      if (value === 'X') {
        return 'bg-teal shadow-btn-teal';
      }
      if (value === 'O') {
        return 'bg-yellow shadow-btn-yellow';
      }
    }
    return 'bg-navy-semi shadow-tile';
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || value !== null}
      aria-label={`Tile ${index + 1}, ${value ? `marked with ${value}` : 'empty'}`}
      className={clsx(
        'w-full h-24 sm:h-36 rounded-2xl flex items-center justify-center transition-all duration-150 relative cursor-pointer',
        getTileStyles(),
        !disabled && value === null && 'active:translate-y-1',
        (disabled || value !== null) && 'cursor-default'
      )}
    >
      {/* Marked Value */}
      {value === 'X' && (
        <IconX
          size={56}
          className="w-10 h-10 sm:w-16 sm:h-16"
          fillColor={isWinningTile ? '#1F3641' : '#31C3BD'}
        />
      )}

      {value === 'O' && (
        <IconO
          size={56}
          className="w-10 h-10 sm:w-16 sm:h-16"
          fillColor={isWinningTile ? '#1F3641' : '#F2B137'}
        />
      )}

      {/* Hover Outline Preview */}
      {value === null && !disabled && isHovered && (
        <div className="hidden sm:flex items-center justify-center opacity-80 pointer-events-none">
          {currentTurn === 'X' ? (
            <IconXOutline size={56} className="w-16 h-16" />
          ) : (
            <IconOOutline size={56} className="w-16 h-16" />
          )}
        </div>
      )}
    </button>
  );
};
