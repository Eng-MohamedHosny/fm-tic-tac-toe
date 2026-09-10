import { useReducer, useEffect } from 'react';
import { GameMode, GameState, PlayerMark } from '../types/game';
import { checkWinner, getRandomPlayer, INITIAL_BOARD, isBoardFull } from '../utils/gameLogic';
import { getBestMove } from '../utils/minimax';

const STORAGE_KEY = 'tic-tac-toe-state-v1';

type GameAction =
  | { type: 'SET_PLAYER1_MARK'; mark: PlayerMark }
  | { type: 'START_GAME'; mode: GameMode }
  | { type: 'MAKE_MOVE'; index: number }
  | { type: 'CPU_MOVE'; index: number }
  | { type: 'SET_CPU_THINKING'; isThinking: boolean }
  | { type: 'NEXT_ROUND' }
  | { type: 'TOGGLE_RESTART_MODAL'; isOpen: boolean }
  | { type: 'RESET_ROUND' }
  | { type: 'QUIT_TO_MENU' }
  | { type: 'HYDRATE'; state: GameState };

const initialState: GameState = {
  mode: null,
  player1Mark: 'O',
  player2Mark: 'X',
  board: INITIAL_BOARD,
  currentTurn: 'X',
  status: 'in-progress',
  winner: null,
  winningLine: null,
  roundCount: 1,
  scores: {
    x: 0,
    o: 0,
    ties: 0,
  },
  isRestartModalOpen: false,
  isCpuThinking: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PLAYER1_MARK': {
      const p1 = action.mark;
      const p2 = p1 === 'X' ? 'O' : 'X';
      return {
        ...state,
        player1Mark: p1,
        player2Mark: p2,
      };
    }

    case 'START_GAME': {
      const startingTurn = getRandomPlayer();
      return {
        ...state,
        mode: action.mode,
        board: [...INITIAL_BOARD],
        currentTurn: startingTurn,
        status: 'in-progress',
        winner: null,
        winningLine: null,
        roundCount: 1,
        scores: { x: 0, o: 0, ties: 0 },
        isRestartModalOpen: false,
        isCpuThinking: false,
      };
    }

    case 'MAKE_MOVE':
    case 'CPU_MOVE': {
      const { index } = action;
      if (
        state.board[index] !== null ||
        state.status !== 'in-progress' ||
        (action.type === 'MAKE_MOVE' && state.isCpuThinking)
      ) {
        return state;
      }

      const nextBoard = [...state.board];
      nextBoard[index] = state.currentTurn;

      const winResult = checkWinner(nextBoard);
      if (winResult) {
        const nextScores = { ...state.scores };
        if (winResult.winner === 'X') nextScores.x += 1;
        else nextScores.o += 1;

        return {
          ...state,
          board: nextBoard,
          status: 'won',
          winner: winResult.winner,
          winningLine: winResult.line,
          scores: nextScores,
          isCpuThinking: false,
        };
      }

      if (isBoardFull(nextBoard)) {
        return {
          ...state,
          board: nextBoard,
          status: 'tied',
          winner: null,
          winningLine: null,
          scores: { ...state.scores, ties: state.scores.ties + 1 },
          isCpuThinking: false,
        };
      }

      const nextTurn: PlayerMark = state.currentTurn === 'X' ? 'O' : 'X';
      return {
        ...state,
        board: nextBoard,
        currentTurn: nextTurn,
        isCpuThinking: false,
      };
    }

    case 'SET_CPU_THINKING':
      return {
        ...state,
        isCpuThinking: action.isThinking,
      };

    case 'NEXT_ROUND': {
      const nextStartingTurn = getRandomPlayer();
      return {
        ...state,
        board: [...INITIAL_BOARD],
        currentTurn: nextStartingTurn,
        status: 'in-progress',
        winner: null,
        winningLine: null,
        roundCount: state.roundCount + 1,
        isRestartModalOpen: false,
        isCpuThinking: false,
      };
    }

    case 'TOGGLE_RESTART_MODAL':
      return {
        ...state,
        isRestartModalOpen: action.isOpen,
      };

    case 'RESET_ROUND': {
      const resetStartingTurn = getRandomPlayer();
      return {
        ...state,
        board: [...INITIAL_BOARD],
        currentTurn: resetStartingTurn,
        status: 'in-progress',
        winner: null,
        winningLine: null,
        isRestartModalOpen: false,
        isCpuThinking: false,
      };
    }

    case 'QUIT_TO_MENU':
      return {
        ...initialState,
        player1Mark: state.player1Mark,
        player2Mark: state.player2Mark,
      };

    case 'HYDRATE':
      return action.state;

    default:
      return state;
  }
}

export function useTicTacToe() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          dispatch({ type: 'HYDRATE', state: parsed });
        }
      }
    } catch {
      // LocalStorage access may fail in private mode
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore write errors
    }
  }, [state]);

  // CPU move trigger effect
  useEffect(() => {
    if (
      state.mode === 'cpu' &&
      state.status === 'in-progress' &&
      state.currentTurn === state.player2Mark &&
      !state.isRestartModalOpen
    ) {
      dispatch({ type: 'SET_CPU_THINKING', isThinking: true });

      const timer = setTimeout(() => {
        const bestMove = getBestMove(
          state.board,
          state.player2Mark,
          state.player1Mark
        );
        dispatch({ type: 'CPU_MOVE', index: bestMove });
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [
    state.mode,
    state.status,
    state.currentTurn,
    state.player2Mark,
    state.player1Mark,
    state.board,
    state.isRestartModalOpen,
  ]);

  return {
    state,
    setPlayer1Mark: (mark: PlayerMark) =>
      dispatch({ type: 'SET_PLAYER1_MARK', mark }),
    startGame: (mode: GameMode) => dispatch({ type: 'START_GAME', mode }),
    makeMove: (index: number) => dispatch({ type: 'MAKE_MOVE', index }),
    nextRound: () => dispatch({ type: 'NEXT_ROUND' }),
    toggleRestartModal: (isOpen: boolean) =>
      dispatch({ type: 'TOGGLE_RESTART_MODAL', isOpen }),
    resetRound: () => dispatch({ type: 'RESET_ROUND' }),
    quitToMenu: () => dispatch({ type: 'QUIT_TO_MENU' }),
  };
}
