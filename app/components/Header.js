import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Header, Left, Body, Right, Button, Title, Icon, Text } from 'native-base';

import Style from './../styles/style';

class HeaderEx extends Component {
  render() {
    return(
      <Header transparent >
      <Left>
      <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
      </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          {this.renderRight()}
        </Right>
      </Header>
    )
  }

  renderRight = () => {
    if(this.props.right) {
      return this.props.right();
    }
  }
}

export default withNavigation(HeaderEx);
