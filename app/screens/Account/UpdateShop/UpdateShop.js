import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import HeaderEx from '../../../components/Header2'

import UpdateShopForm from '../../Account/UpdateShop/UpdateShopForm'

class UpdateShop extends Component {
  render() {
    return(
      <Container>
        <HeaderEx title="Update your Shop"/>
        <Content contentContainerStyle={{flex: 1}}>
          <UpdateShopForm auth={this.props.auth} navigation={this.props.navigation}/>
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

export default connect(mapStateToProps)(UpdateShop);
