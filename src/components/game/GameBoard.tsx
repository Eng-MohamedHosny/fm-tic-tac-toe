import React from 'react';
import { GameState } from '../../types/game';
import { GameHeader } from './GameHeader';
import { ScoreBoard } from './ScoreBoard';
import { Tile } from './Tile';

interface GameBoardProps {
  state: GameState;
  onMakeMove: (index: number) => void;
  onOpenRestartModal: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  state,
  onMakeMove,
  onOpenRestartModal,
}) => {
  const isGameActive = state.status === 'in-progress';
  const isTileDisabled = !isGameActive || state.isCpuThinking;

  return (
    <main className="w-full max-w-[327px] sm:max-w-[460px] flex flex-col items-center gap-5">
      {/* Top Bar */}
      <GameHeader
        currentTurn={state.currentTurn}
        onOpenRestartModal={onOpenRestartModal}
      />

      {/* 3x3 Board */}
      <div className="w-full grid grid-cols-3 gap-5">
        {state.board.map((value, index) => {
          const isWinningTile =
            state.winningLine !== null && state.winningLine.includes(index);

          return (
            <Tile
              key={index}
              index={index}
              value={value}
              isWinningTile={isWinningTile}
              currentTurn={state.currentTurn}
              disabled={isTileDisabled}
              onSelect={onMakeMove}
            />
          );
        })}
      </div>

      {/* Score Cards */}
      {state.mode && (
        <ScoreBoard
          scores={state.scores}
          mode={state.mode}
          player1Mark={state.player1Mark}
        />
      )}
    </main>
  );
};
