export type PlayerMark = 'X' | 'O';

export type GameMode = 'cpu' | 'pvp';

export type Board = (PlayerMark | null)[];

export type WinningLine = [number, number, number];

export interface WinResult {
  winner: PlayerMark;
  line: WinningLine;
}

export type RoundStatus = 'in-progress' | 'won' | 'tied';

export interface ScoreState {
  x: number;
  o: number;
  ties: number;
}

export interface GameState {
  // Setup
  mode: GameMode | null;
  player1Mark: PlayerMark; // Choice in menu (X or O)
  player2Mark: PlayerMark; // Opposite of player1Mark

  // Current Round
  board: Board;
  currentTurn: PlayerMark;
  status: RoundStatus;
  winner: PlayerMark | null;
  winningLine: WinningLine | null;
  roundCount: number;

  // Score History
  scores: ScoreState;

  // UI state
  isRestartModalOpen: boolean;
  isCpuThinking: boolean;
}
