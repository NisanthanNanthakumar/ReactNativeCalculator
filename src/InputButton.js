import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import Style from './Style';

export default class InputButton extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}
                          style={Style.inputButton}
                          underlayColor="white">
        <Text style={Style.inputButtonText}>{this.props.value}</Text>
      </TouchableHighlight>
    )
  }
}
