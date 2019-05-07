import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

class FooterEx extends Component {
  componentDidMount() {
  }
  render() {
    let tab = this.props.tab;
    return(
      <Footer>
        <FooterTab>
          <Button vertical active={tab=='home'} onPress={e=>this.onClick('ShopMain')}>
            <Icon name="dashboard" type="AntDesign" />
          </Button>
          <Button vertical active={tab=='orders'} onPress={e=>this.onClick('ShopMain')}>
            <Icon name="profile" type="AntDesign" />
          </Button>
          <Button vertical active={tab=='menu'}>
            <Icon name="menuunfold" type="AntDesign"onPress={e=>this.onClick('ShopMenu')} />
          </Button>
          <Button vertical active={tab=='account'} onPress={e=>this.onClick('ShopMain')}>
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

export default FooterEx;
