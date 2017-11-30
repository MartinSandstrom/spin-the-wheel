import React, { Component } from 'react';
import './App.css';
import Hammer from 'react-hammerjs';

const COR_NUMBERS = {
  1: 1,
  2: 10,
  3: 9,
  4: 8,
  5: 7,
  6: 6,
  7: 5,
  8: 4,
  9: 3,
  10: 2
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      winningSpins: [],
      spinDuration: 6,
      isSpinning: false
    };
  }

  spin = (backwards) => {
    if (this.state.isSpinning) {
      return;
    }
    this.setState({ isSpinning: true });
    let random = Math.floor(Math.random() * 9);
    let actualNumber = random + 1;

    //Handle forward spins 
    if (!backwards) {
      actualNumber = COR_NUMBERS[actualNumber];
    }

    let animationName = `animation-${actualNumber}`;
    let styleSheet = document.styleSheets[0];
    let degrees = random * 36;
    console.log('DEGREED: ', degrees);
    console.log('RANDOM: ', random + 1);
    console.log('ACTUAL NUMBER: ', actualNumber);
    console.log(backwards);
    let negativeOrPositive = backwards ? -1 : 1;
    console.log(negativeOrPositive);

    let first = (0 + degrees) * negativeOrPositive;
    let second = (180 + degrees) * negativeOrPositive;
    let third = (360 + degrees) * negativeOrPositive;
    let fourth = (540 + degrees) * negativeOrPositive;
    let fifth = (720 + degrees) * negativeOrPositive;

    console.log('DEGREES FAKTISKA; ', fifth);

    let keyframes =
      `@-webkit-keyframes ${animationName} {
        0% {-webkit-transform: rotate(${first}deg)}
        15% {-webkit-transform: rotate(${second}deg)}
        35% {-webkit-transform: rotate(${third}deg)}
        65% {-webkit-transform: rotate(${fourth}deg)}
        100% {-webkit-transform: rotate(${fifth}deg)}
    }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    this.setState({ animationName });
    setTimeout(() => {
      this.showWinner(actualNumber);
    }, this.state.spinDuration * 1000 + 200)
  }

  showWinner = (number) => {
    let winningSpins = this.state.winningSpins;
    winningSpins.push(number);
    this.setState({ winningSpins, isSpinning: false });
  }

  onSwipe = (e) => {
    let direction = e.direction;
    if (direction === 16) {
      //SWIPED DOWN
      console.log('SWIPED DOWN');
      this.spin(false);
    }
    else if (direction === 8) {
      //SWIPED UP
      console.log('SWIPED UP');
      this.spin(true);
    }
  }

  render() {
    let style = {
      animationName: this.state.animationName,
      animationTimingFunction: 'linear',
      animationDuration: `${this.state.spinDuration}s`,
      animationDelay: '0.0s',
      animationIterationCount: 1,
      animationDirection: 'normal',
      animationFillMode: 'forwards'
    }
    let winnings = this.state.winningSpins.map((win, index) => (<p key={index}> {win}</p>));

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Spin the wheel</h1>
        </header>
        <div className="App-intro">
          <Hammer onSwipe={this.onSwipe} direction="DIRECTION_VERTICAL">
            <div className="wheel-container">
              <div className="wheel-stop"></div>
              <div className="wheel" style={style}>
                <div className="wheel-number wheel-one">1</div>
                <div className="wheel-number wheel-two">2</div>
                <div className="wheel-number wheel-three">3</div>
                <div className="wheel-number wheel-four">4</div>
                <div className="wheel-number wheel-five">5</div>
                <div className="wheel-number wheel-six">6</div>
                <div className="wheel-number wheel-seven">7</div>
                <div className="wheel-number wheel-eight">8</div>
                <div className="wheel-number wheel-nine">9</div>
                <div className="wheel-number wheel-ten">10</div>
              </div>
              <img src="./pointer.png" className="pointer" alt="pointer"></img>
            </div>
          </Hammer>
        </div>
        <input type="button" className="btn" value="SPIN" onClick={() => this.spin(false)} />

        <p>Winners:</p>
        {winnings}
      </div>
    );
  }
}

export default App;
