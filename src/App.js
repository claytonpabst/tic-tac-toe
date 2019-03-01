import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      playerTurn:1,
      board:[
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [],
        []
      ]
    }
  }

  checkForWinner = (board, i, j) => {
    for(let i=0; i<board.length; i++){
      for(let j=0; j<board[i].length; j++){
        if(this.checkHor(board, i, j) || this.checkDiag(board, i, j) || this.checkVert(board, i, j)){
          return true
        }
      }
    }
    return false
  }
  
  checkHor = (board, i, j) => {
    if(board[i][j] !== board[i][j+1] || board[i][j] !== board[i][j+2]){
      return false
    }
    return true
  }
  
  checkDiag = (board, i, j) =>{
    let theReturn = false
    if(board[i][j] !== board[i+1][j+1] || board[i][j] !== board[i+2][j+2] ){
      theReturn = false
    } else {
      theReturn = true
    }
    if(board[i][j] !== board[i+1][j-1] || board[i][j] !== board[i+1][j-2]){
      theReturn = false
    } else {
      theReturn = true
    }
    return theReturn
  }
  
  checkVert(board, i, j){
    if(board[i][j] !== board[i+1][j] || board[i][j] !== board[i+2][j]){
      return false
    }
    return true
  }

  playerMove(i, j){
    if(this.state.playerTurn === 1){
      this.state.board[i][j] = 'x'
      this.state.playerTurn = 2
    } else {
      this.state.board[i][j] = 'o'
      this.state.playerTurn = 1
    }
    this.forceUpdate()
    if(this.checkForWinner(this.state.board, i, j)){
      alert('player ' + this.state.board[i][j] + " Wins")
    }
  }

  buildGrid = () => {
    const {board} = this.state
    let squares = []
    for(let i=0; i<board.length; i++){
      for(let j=0; j<board[i].length; j++){
        if(board[i].length){
          console.log(board[i].length)
          squares.push(
            <div onClick={() => this.playerMove(i, j)} style={{width:'33%', height:'100px', border:'1px solid black'}}>
              {typeof board[i][j] == 'string' && board[i][j]}
            </div>
          )
        }
      }
    }
    return squares
  }

  render() {
    return (
      <div className="App">
        {this.buildGrid()}
      </div>
    );
  }
}

export default App;
