import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content } from 'native-base';

import Style from './../../styles/style';

import HeaderEx from './../../components/Header2'

import RegisterShopForm from './RegisterShopForm'

class RegisterShop extends Component {
  render() {
    return(
      <Container>
        <HeaderEx title="Register Your Shop"/>
        <Content contentContainerStyle={{flex: 1}} style={Style.content}>
          <RegisterShopForm auth={this.props.auth} navigation={this.props.navigation}/>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(RegisterShop);
