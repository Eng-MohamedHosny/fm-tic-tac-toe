import { Board, PlayerMark } from '../types/game';
import { checkWinner, getAvailableMoves, isBoardFull } from './gameLogic';

function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  cpuMark: PlayerMark,
  humanMark: PlayerMark
): number {
  const winResult = checkWinner(board);
  if (winResult) {
    return winResult.winner === cpuMark ? 10 - depth : depth - 10;
  }

  if (isBoardFull(board)) {
    return 0;
  }

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (const move of availableMoves) {
      board[move] = cpuMark;
      const score = minimax(board, depth + 1, false, cpuMark, humanMark);
      board[move] = null;
      maxScore = Math.max(score, maxScore);
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const move of availableMoves) {
      board[move] = humanMark;
      const score = minimax(board, depth + 1, true, cpuMark, humanMark);
      board[move] = null;
      minScore = Math.min(score, minScore);
    }
    return minScore;
  }
}

/**
 * Calculates the optimal move for the CPU using Minimax.
 * If the board is completely empty, picks a strategic corner or center to keep games varied.
 */
export function getBestMove(
  board: Board,
  cpuMark: PlayerMark,
  humanMark: PlayerMark
): number {
  const availableMoves = getAvailableMoves(board);

  // If opening move on empty board, pick a strong opening (center or corners)
  if (availableMoves.length === 9) {
    const strategicOpenings = [0, 2, 4, 6, 8];
    return strategicOpenings[Math.floor(Math.random() * strategicOpenings.length)];
  }

  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (const move of availableMoves) {
    board[move] = cpuMark;
    const score = minimax(board, 0, false, cpuMark, humanMark);
    board[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
