import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      winningSpins: [],
      spinDuration: 7,
      isSpinning: false
    };
  }

  spin = () => {
    if(this.state.isSpinning) {
      return;
    }
    this.setState({isSpinning: true});
    let random = Math.floor(Math.random() * 9);
    let animationName = `animation-${random + 1}`;
    let styleSheet = document.styleSheets[0];

    //Use to get offset of the wheel
    let offset = 0;
    let degrees = random * -36;
    console.log(degrees);

    let keyframes =
      `@-webkit-keyframes ${animationName} {
        0% {-webkit-transform: rotate(${0 + degrees}deg)}
        15% {-webkit-transform: rotate(${-180 + degrees}deg)}
        35% {-webkit-transform: rotate(${-360 + degrees}deg)}
        65% {-webkit-transform: rotate(${-540 + degrees}deg)}
        100% {-webkit-transform: rotate(${-720 + degrees}deg)}
    }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    this.setState({ animationName });
    setTimeout( () => {
      this.showWinner(random + 1);
    }, this.state.spinDuration * 1000 + 200)
  }

  showWinner = (number) => {
      let winningSpins = this.state.winningSpins;
      winningSpins.push(number);
      this.setState({winningSpins, isSpinning: false});
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
    let winnings = this.state.winningSpins.map( (win, index) => (<p key={index}> {win}</p>));
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Spin the wheel</h1>
        </header>
        <div className="App-intro">
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
          </div>
        </div>
        <input type="button" value="SPin that wheel" onClick={this.spin} />

        <p>Winners:</p>
        {winnings}
      </div>
    );
  }
}

export default App;
