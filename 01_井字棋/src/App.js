import { useState } from "react";

// 定义方块
function Square({ value, onSquareClick }) {

  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

// 定义井字棋的棋盘
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null)); // 用数组来定义state，sqares是初始值，setSquares是设置值
  const [xIsNext, setXIsNext] = useState(true); // 定义记录操作者的变量

  // 定义点击的功能
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return; 
    }
    const nextSquares = squares.slice(); // 读取数组的值

    // 更新数组的值
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

// 添加一些必要文字
  const winner = calculateWinner(squares);
  const status = winner? `Winner: ${winner}` : `Next player: ${xIsNext? "X" : "O"}`;
  return (
    // 使用jsx语法，
    // () => handleClick(0)的作用是 React 期望事件处理器是函数, 不是函数调用的结果handleClick(0)
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="status">{status}</div>
    </>
  )
}

// 定义游戏结束的方式
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]; // 定义数组，记录每种可能的胜利方式

  for (let i = 0; i<lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

}
