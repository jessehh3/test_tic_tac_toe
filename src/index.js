import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    alert(this.props.value)
  }

  render() {
    return (
      <button 
        className="square"
        onClick={this.handleClick}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  static COLUMNS = 3
  static ROWS = 3

  renderSquare(i) {
    return <Square value={i} key={`square-${i}`}/>;
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
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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