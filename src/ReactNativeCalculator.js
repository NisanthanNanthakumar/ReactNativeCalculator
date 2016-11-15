import React, { Component } from 'react';
import Style from './Style';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import InputButton from './InputButton';

//Input buttons to be displayed in the calculator
const inputButtons = [
  ['C', '/', '*', '<-'],
  [7, 8, 9, '-'],
  [4, 5, 6, '+'],
  [1, 2, 3, '()'],
  [0, '.', '+/-','=']
];

class ReactNativeCalculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayValue: '',
            bracketCount: 0
        }
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.displayValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this.renderInputButtons()}
                </View>
            </View>
        )
    }

    renderInputButtons() {
        let views = [];

        for (var r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i ++) {
                let input = row[i];

                inputRow.push(
                    <InputButton
                        value={input}
                        onPress={this.onInputButtonPressed.bind(this, input)}
                        key={r + "-" + i}/>
                );
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;
    }

    onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this.handleNumberInput(input)
            case 'string':
                return this.handleStringInput(input)
        }
    }

    handleNumberInput(num) {
        if (this.state.displayValue.slice(-1)===')') {
          this.setState({
            displayValue: this.state.displayValue + '*' + num
          });
        }
        else {
          this.setState({
              displayValue: this.state.displayValue + num
          });
        }
    }

    handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    displayValue: this.state.displayValue + str
                });
                break;

            case '=':

                let expression = this.state.displayValue;
                let calculation = parseFloat(eval(expression)).toString();

                this.setState({
                    displayValue: calculation
                });
                break;
            case '.':
              this.setState({
                displayValue: this.state.displayValue + str
              });
              break;
            case 'C':
              this.setState({
                displayValue: ''
              });
              break;
            case '<-':
              this.setState({
                displayValue: this.state.displayValue.slice(0,-1)
              });
              break;
            case '()':
              let displayLastChar = this.state.displayValue.slice(-1);
              let displayLength = this.state.displayValue.length;
              if (displayLastChar===')' && this.state.bracketCount === 0){
                this.setState({
                  displayValue: this.state.displayValue + '*(',
                  bracketCount: this.state.count + 1
                });
              }
              else if (displayLastChar===')' && this.state.bracketCount >0){
                this.setState({
                  displayValue: this.state.displayValue + ')',
                  bracketCount: this.state.bracketCount - 1
                });
              }
              else if (this.state.displayValue.charCodeAt(displayLength-1)>47 && this.state.bracketCount === 0){
                this.setState({
                  displayValue: this.state.displayValue + '*(',
                  bracketCount: this.state.bracketCount + 1
                });
              }
              else if (this.state.displayValue === '' || this.state.displayValue.charCodeAt(displayLength-1)===40) {
                  this.setState({
                    displayValue: this.state.displayValue + '(',
                    bracketCount: this.state.bracketCount + 1
                  });
                }
              else if (this.state.displayValue.charCodeAt(displayLength-1)===42 || this.state.displayValue.charCodeAt(displayLength-1)===43 || this.state.displayValue.charCodeAt(displayLength-1)===45 || this.state.displayValue.charCodeAt(displayLength-1)===47) {
                this.setState({
                  displayValue: this.state.displayValue + '(',
                  count: this.state.bracketCount + 1
                });
              }
              else if (this.state.bracketCount > 0) {
                this.setState({
                  displayValue: this.state.displayValue + ')',
                  count: this.state.bracketCount - 1
                });
              }
              break;
            case '+/-':
        }
    }

}


AppRegistry.registerComponent('ReactNativeCalculator', () => ReactNativeCalculator);
