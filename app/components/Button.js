import React, { Component } from 'react';
import { Button, Text, Spinner } from 'native-base';

import Style from './../styles/style';

class ButtonEx extends Component {
  render() {
    if(this.props.loading) {
      var content = <Spinner color="white"/>;
    } else {
      var content = <Text>{this.props.text}</Text>;
    }
    return(
      <Button large block style={Style.button} onPress={this.OnPress.bind(this)} disabled={this.props.loading}>
        {content}
      </Button>
    )
  }
  OnPress() {
    this.props.onPress();
  }
}

export default ButtonEx;
