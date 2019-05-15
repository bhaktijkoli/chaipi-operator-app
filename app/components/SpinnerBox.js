import React, { Component } from 'react';
import { View, Spinner } from 'native-base';

import Style from './../styles/style';

class SpinnerBox extends Component {
  render() {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner color='black' />
      </View>
    )
  }
}

export default SpinnerBox;
