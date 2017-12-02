import React, { Component } from 'react';
import './Wheel.css';
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

export default class Wheel extends Component {
    constructor() {
        super();
        this.state = {
            spinDuration: 7,
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
        let negativeOrPositive = backwards ? -1 : 1;

        let keyframes =
            `@-webkit-keyframes ${animationName} {
            0% {-webkit-transform: rotate(${(0 + degrees) * negativeOrPositive}deg)}
            10% {-webkit-transform: rotate(${(288 + degrees) * negativeOrPositive}deg)}
            25% {-webkit-transform: rotate(${(576 + degrees) * negativeOrPositive}deg)}
            45% {-webkit-transform: rotate(${(950 + degrees) * negativeOrPositive}deg)}
            70% {-webkit-transform: rotate(${(1250 + degrees) * negativeOrPositive}deg)}
            100% {-webkit-transform: rotate(${(1440 + degrees) * negativeOrPositive}deg)}
        }`;
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        this.setState({ animationName });
        setTimeout(() => {
            this.showWinner(actualNumber);
        }, this.state.spinDuration * 1000 + 300)
    }

    showWinner = (number) => {
        this.props.onNewWinner(number);
        this.setState({ isSpinning: false });
    }

    onSwipe = (e) => {
        let direction = e.direction;
        if (direction === 16) {
            this.spin(false);
        }
        else if (direction === 8) {
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
        return (
            <div>
                <div className="app-intro">
                    <Hammer onSwipe={this.onSwipe} direction="DIRECTION_VERTICAL">
                        <div className="wheel-container">
                            <div className="wheel-stop"></div>
                            <div className="wheel-mark"></div>
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
                                <div className="wheel-number wheel-ten" >10</div>
                            </div>
                            <img src="./pointer.png" className="pointer" alt="pointer"></img>
                        </div>
                    </Hammer>
                </div>
                <input type="button" className="btn" value="SPIN" onClick={() => this.spin(false)} />
            </div>
        );
    }
}