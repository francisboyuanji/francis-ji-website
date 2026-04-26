import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Monitor, Users } from 'lucide-react';

const BOARD_SIZE = 15;
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

function checkWin(board: number[][], r: number, c: number, player: number): boolean {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (const [dr, dc] of dirs) {
    let count = 1;
    for (let d = 1; d < 5; d++) { const nr = r + dr * d, nc = c + dc * d; if (nr < 0 || nr >= BOARD_SIZE || nc < 0 || nc >= BOARD_SIZE || board[nr][nc] !== player) break; count++; }
    for (let d = 1; d < 5; d++) { const nr = r - dr * d, nc = c - dc * d; if (nr < 0 || nr >= BOARD_SIZE || nc < 0 || nc >= BOARD_SIZE || board[nr][nc] !== player) break; count++; }
    if (count >= 5) return true;
  }
  return false;
}

function evaluatePos(board: number[][], r: number, c: number, player: number): number {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  let score = 0;
  const opponent = player === BLACK ? WHITE : BLACK;
  for (const [dr, dc] of dirs) {
    let my = 0, op = 0;
    for (let d = -4; d <= 4; d++) {
      if (d === 0) continue;
      const nr = r + dr * d, nc = c + dc * d;
      if (nr < 0 || nr >= BOARD_SIZE || nc < 0 || nc >= BOARD_SIZE) continue;
      if (board[nr][nc] === player) my++;
      else if (board[nr][nc] === opponent) op++;
    }
    if (my >= 3 && op === 0) score += my * 100;
    else if (my >= 2 && op === 0) score += my * 10;
    if (op >= 3 && my === 0) score += op * 80;
    else if (op >= 2 && my === 0) score += op * 8;
    if (my > 0 || op > 0) score += 2;
  }
  const cd = Math.abs(r - 7) + Math.abs(c - 7);
  score += Math.max(0, 10 - cd);
  return score;
}

function findBestMove(board: number[][]): [number, number] {
  for (let r = 0; r < BOARD_SIZE; r++) for (let c = 0; c < BOARD_SIZE; c++) if (board[r][c] === EMPTY) {
    board[r][c] = WHITE; if (checkWin(board, r, c, WHITE)) { board[r][c] = EMPTY; return [r, c]; } board[r][c] = EMPTY;
    board[r][c] = BLACK; if (checkWin(board, r, c, BLACK)) { board[r][c] = EMPTY; return [r, c]; } board[r][c] = EMPTY;
  }
  let best = -1, bestMoves: [number, number][] = [];
  for (let r = 0; r < BOARD_SIZE; r++) for (let c = 0; c < BOARD_SIZE; c++) if (board[r][c] === EMPTY) {
    const s = evaluatePos(board, r, c, WHITE);
    if (s > best) { best = s; bestMoves = [[r, c]]; }
    else if (s === best) bestMoves.push([r, c]);
  }
  return bestMoves[Math.floor(Math.random() * bestMoves.length)] || [7, 7];
}

type GameMode = 'ai' | 'friend';

export default function GomokuGame() {
  const [mode, setMode] = useState<GameMode>('ai');
  const [board, setBoard] = useState(() => Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(EMPTY)));
  const [currentPlayer, setCurrentPlayer] = useState(BLACK);
  const [winner, setWinner] = useState<number | null>(null);
  const [lastMove, setLastMove] = useState<[number, number] | null>(null);
  const [thinking, setThinking] = useState(false);

  const reset = useCallback(() => {
    setBoard(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(EMPTY)));
    setCurrentPlayer(BLACK);
    setWinner(null); setLastMove(null); setThinking(false);
  }, []);

  // AI mode: human plays black, AI plays white
  const handleClickAI = useCallback((r: number, c: number) => {
    if (board[r][c] !== EMPTY || winner || thinking) return;
    const nb = board.map(row => [...row]);
    nb[r][c] = BLACK;
    setBoard(nb); setLastMove([r, c]);
    if (checkWin(nb, r, c, BLACK)) { setWinner(BLACK); return; }
    setThinking(true);
    setTimeout(() => {
      const [ar, ac] = findBestMove(nb);
      const ab = nb.map(row => [...row]);
      ab[ar][ac] = WHITE;
      setBoard(ab); setLastMove([ar, ac]);
      if (checkWin(ab, ar, ac, WHITE)) setWinner(WHITE);
      setThinking(false);
    }, 400);
  }, [board, winner, thinking]);

  // Friend mode: two humans alternate
  const handleClickFriend = useCallback((r: number, c: number) => {
    if (board[r][c] !== EMPTY || winner) return;
    const nb = board.map(row => [...row]);
    nb[r][c] = currentPlayer;
    setBoard(nb); setLastMove([r, c]);
    if (checkWin(nb, r, c, currentPlayer)) { setWinner(currentPlayer); return; }
    setCurrentPlayer(p => p === BLACK ? WHITE : BLACK);
  }, [board, winner, currentPlayer]);

  const handleClick = mode === 'ai' ? handleClickAI : handleClickFriend;

  const getTurnText = () => {
    if (winner) return winner === BLACK ? 'Black Wins!' : 'White Wins!';
    if (mode === 'ai') {
      return thinking ? 'AI thinking...' : 'Your turn (Black)';
    }
    return currentPlayer === BLACK ? "Black's turn" : "White's turn";
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => { setMode('ai'); reset(); }}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200"
          style={{
            backgroundColor: mode === 'ai' ? 'rgba(245,158,11,0.12)' : 'transparent',
            color: mode === 'ai' ? 'var(--accent-amber)' : 'var(--text-secondary)',
            border: mode === 'ai' ? '1px solid rgba(245,158,11,0.25)' : '1px solid var(--glass-border)',
          }}
        >
          <Monitor size={14} /> vs AI
        </button>
        <button
          onClick={() => { setMode('friend'); reset(); }}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200"
          style={{
            backgroundColor: mode === 'friend' ? 'rgba(245,158,11,0.12)' : 'transparent',
            color: mode === 'friend' ? 'var(--accent-amber)' : 'var(--text-secondary)',
            border: mode === 'friend' ? '1px solid rgba(245,158,11,0.25)' : '1px solid var(--glass-border)',
          }}
        >
          <Users size={14} /> vs Friend
        </button>
      </div>

      {/* Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: '#059669', boxShadow: '0 0 6px rgba(5,150,105,0.5)' }} />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Black</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 0 4px rgba(255,255,255,0.2)' }} />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>White</span>
        </div>
      </div>

      {winner && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="text-center px-6 py-2.5 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>
          <span className="text-base font-medium" style={{ color: winner === BLACK ? '#34D399' : 'rgba(255,255,255,0.9)' }}>
            {getTurnText()}
          </span>
        </motion.div>
      )}

      {!winner && mode === 'friend' && (
        <div className="text-center">
          <span className="text-sm" style={{ color: currentPlayer === BLACK ? '#34D399' : 'rgba(255,255,255,0.7)' }}>
            {getTurnText()}
          </span>
        </div>
      )}

      {!winner && mode === 'ai' && thinking && (
        <span className="text-xs animate-pulse" style={{ color: 'var(--accent-cyan)' }}>AI thinking...</span>
      )}

      {/* Board */}
      <div className="glass-card p-3 md:p-4">
        <div style={{ width: 'min(85vw, 520px)', height: 'min(85vw, 520px)', position: 'relative' }}>
          <div className="absolute inset-0 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)' }} />
          {Array.from({ length: BOARD_SIZE }, (_, i) => (
            <div key={`h${i}`} className="absolute" style={{ left: `${(i / (BOARD_SIZE - 1)) * 100}%`, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
          ))}
          {Array.from({ length: BOARD_SIZE }, (_, i) => (
            <div key={`v${i}`} className="absolute" style={{ top: `${(i / (BOARD_SIZE - 1)) * 100}%`, left: 0, right: 0, height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
          ))}
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}>
            {board.map((row, r) => row.map((cell, c) => (
              <button key={`${r}-${c}`} onClick={() => handleClick(r, c)}
                className="relative flex items-center justify-center"
                style={{ aspectRatio: '1', cursor: cell === EMPTY && !winner && !thinking ? 'pointer' : 'default', backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                disabled={cell !== EMPTY || !!winner || thinking}>
                {cell !== EMPTY && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="rounded-full"
                    style={{
                      width: '72%', height: '72%',
                      backgroundColor: cell === BLACK ? '#059669' : 'rgba(255,255,255,0.9)',
                      boxShadow: cell === BLACK ? '0 0 8px rgba(5,150,105,0.5)' : '0 0 4px rgba(255,255,255,0.2)',
                      border: lastMove && lastMove[0] === r && lastMove[1] === c ? '2px solid #fff' : 'none',
                    }} />
                )}
              </button>
            )))}
          </div>
          {[3, 7, 11].flatMap(r => [3, 7, 11].map(c => [r, c])).map(([r, c], i) => (
            <div key={`star${i}`} className="absolute w-1 h-1 rounded-full" style={{
              left: `${(c / (BOARD_SIZE - 1)) * 100}%`, top: `${(r / (BOARD_SIZE - 1)) * 100}%`,
              transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255,255,255,0.25)',
            }} />
          ))}
        </div>
      </div>

      <button onClick={reset}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-colors"
        style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)' }}>
        <RotateCcw size={14} /> New Game
      </button>
    </div>
  );
}
