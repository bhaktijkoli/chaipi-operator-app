import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

class DriverFooter extends Component {
  render() {
    let tab = this.props.tab;
    return(
      <Footer>
        <FooterTab>
          <Button vertical active={tab=='home'} onPress={e=>this.onClick('DriverMain')}>
            <Icon name="dashboard" type="AntDesign" />
          </Button>
          <Button vertical active={tab=='tasks'} onPress={e=>this.onClick('DriverTasks')}>
            <Icon name="profile" type="AntDesign" />
          </Button>
          <Button vertical active={tab=='account'} onPress={e=>this.onClick('Account')}>
            <Icon name="user" type="AntDesign" />
          </Button>
        </FooterTab>
      </Footer>
    )
  }
  onClick(menu) {
    this.props.navigation.navigate(menu);
  }
}

export default DriverFooter;
