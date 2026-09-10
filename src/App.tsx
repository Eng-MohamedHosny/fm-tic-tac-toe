import React from 'react';
import { useTicTacToe } from './hooks/useTicTacToe';
import { StartMenu } from './components/start-menu/StartMenu';
import { GameBoard } from './components/game/GameBoard';
import { RoundOverModal } from './components/modals/RoundOverModal';
import { RestartModal } from './components/modals/RestartModal';

export const App: React.FC = () => {
  const {
    state,
    setPlayer1Mark,
    startGame,
    makeMove,
    nextRound,
    toggleRestartModal,
    resetRound,
    quitToMenu,
  } = useTicTacToe();

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center p-6 sm:p-8 font-outfit select-none">
      {/* View Switcher: Start Menu vs Game Board */}
      {state.mode === null ? (
        <StartMenu
          player1Mark={state.player1Mark}
          onSelectMark={setPlayer1Mark}
          onStartGame={startGame}
        />
      ) : (
        <GameBoard
          state={state}
          onMakeMove={makeMove}
          onOpenRestartModal={() => toggleRestartModal(true)}
        />
      )}

      {/* Modals */}
      <RoundOverModal
        status={state.status}
        winner={state.winner}
        mode={state.mode}
        player1Mark={state.player1Mark}
        onQuit={quitToMenu}
        onNextRound={nextRound}
      />

      <RestartModal
        isOpen={state.isRestartModalOpen}
        onCancel={() => toggleRestartModal(false)}
        onRestart={resetRound}
      />
    </div>
  );
};

export default App;
