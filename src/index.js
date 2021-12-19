import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button 
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  static X = 'X'
  static O = 'O'
  static FIRST_PLAYER = Board.X
  static SECOND_PLAYER = Board.O
  static COLUMNS = 3
  static ROWS = 3

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isFirstPlayer: true,
    };
  }

  currentPlayer() {
    if(this.state.isFirstPlayer){
      return Board.FIRST_PLAYER
    }

    return Board.SECOND_PLAYER
  }

  status(squares){
    const winner = calculateWinner(this.state.squares)
  
    if (winner) {
      return `Winner: ${winner}`
    } else {
      return `Next player: ${this.currentPlayer()}`
    }
  }

  handleClick(i){
    const squares = [...this.state.squares]
    squares[i] = this.currentPlayer()
    this.setState({
      squares,
      isFirstPlayer: !this.state.isFirstPlayer
    })
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        key={`square-${i}`}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  renderRow(row) {
    const squares = Array(Board.COLUMNS).fill(null).map((_, col) => {
      return this.renderSquare(row + col)
    })

    return (
      <div className="board-row" key={`row-${row}`}>
        {squares}
      </div>
    )
  }

  renderRows() {
    return Array(Board.ROWS).fill(null).map((_, row) => {
      return this.renderRow(Board.ROWS * row)
    }) 
  }

  render() {
    return (
      <div>
        <div className="status">{this.status()}</div>
        {this.renderRows()}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}