import { Board, PlayerMark, WinResult, WinningLine } from '../types/game';

export const WINNING_LINES: WinningLine[] = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

export const INITIAL_BOARD: Board = Array(9).fill(null);

export function checkWinner(board: Board): WinResult | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a] as PlayerMark,
        line,
      };
    }
  }
  return null;
}

export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

export function getAvailableMoves(board: Board): number[] {
  const moves: number[] = [];
  board.forEach((cell, idx) => {
    if (cell === null) moves.push(idx);
  });
  return moves;
}

/**
 * Returns a random starting player ('X' or 'O')
 */
export function getRandomPlayer(): PlayerMark {
  return Math.random() < 0.5 ? 'X' : 'O';
}
