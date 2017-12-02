import React, { Component } from 'react';
import './App.css';
import Wheel from '../Wheel/Wheel.js';
import { WinnerBadge } from '../WinnerBadge/WinnerBadge.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      winningSpins: []
    };
  }

  onNewWinner = (number) => {
    let winningSpins = this.state.winningSpins;
    winningSpins.push(number);
    this.setState({ winningSpins });
  }

  render() {
    let winnings = this.state.winningSpins.map((win, index) => (<WinnerBadge key={index} value={win}></WinnerBadge>));
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Spin the wheel</h1>
        </header>
        <div className="app-intro">
          <Wheel spinDuration={7} onNewWinner={this.onNewWinner}></Wheel>
          <h2 className="app-winner-heading">
            Winners:
            </h2>
          {winnings}
        </div>
      </div>
    );
  }
}

export default App;
