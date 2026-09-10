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
 * Calculates a smart, fun, and beatable move for the CPU.
 * Proactively attempts to win and block obvious player wins,
 * but allows clever human players to outmaneuver it with forks and tactical moves.
 */
export function getBestMove(
  board: Board,
  cpuMark: PlayerMark,
  humanMark: PlayerMark
): number {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return 0;

  // 1. Immediate Win: If CPU can win in 1 move, take it!
  for (const move of availableMoves) {
    board[move] = cpuMark;
    const isWin = checkWinner(board)?.winner === cpuMark;
    board[move] = null;
    if (isWin) return move;
  }

  // 2. Immediate Threat: Check if human has winning moves on next turn
  const winningMovesForHuman: number[] = [];
  for (const move of availableMoves) {
    board[move] = humanMark;
    const isWin = checkWinner(board)?.winner === humanMark;
    board[move] = null;
    if (isWin) {
      winningMovesForHuman.push(move);
    }
  }

  // If human has set up a fork (2+ winning moves) or single threat with 75% block chance
  if (winningMovesForHuman.length > 0) {
    if (winningMovesForHuman.length > 1 || Math.random() < 0.75) {
      return winningMovesForHuman[0];
    }
  }

  // 3. Opening moves: pick corners or center for varied games
  if (availableMoves.length === 9) {
    const strategicOpenings = [0, 2, 4, 6, 8];
    return strategicOpenings[Math.floor(Math.random() * strategicOpenings.length)];
  }

  // 4. Tactical Play: 60% optimal Minimax move, 40% heuristic positional move
  // This prevents the CPU from being an unbeatable mathematical calculator,
  // making it possible for the human player to set up forks and win!
  const shouldPlayOptimal = Math.random() < 0.6;
  if (shouldPlayOptimal) {
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

  // 5. Positional heuristic fallback (Center -> Corners -> Random)
  if (availableMoves.includes(4) && Math.random() < 0.6) {
    return 4;
  }
  const corners = [0, 2, 6, 8].filter((c) => availableMoves.includes(c));
  if (corners.length > 0 && Math.random() < 0.6) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}
