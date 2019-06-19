import React, { Component } from 'react';
import { Modal } from 'react-native';
import { View, Spinner } from 'native-base';

import Style from './../styles/style';

class SpinnerModel extends Component {
  render() {
    return(
      <Modal
        animationType={'none'}
        visible={this.props.visible}
        transparent={true}
        >
        <View style={{backgroundColor: '#00000015', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner color='black' />
        </View>
      </Modal>
    )
  }
}

export default SpinnerModel;
