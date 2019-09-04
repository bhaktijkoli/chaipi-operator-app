import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import HeaderEx from '../../../components/Header2'

import UpdateDriverForm from '../../Account/UpdateDriver/UpdateDriverForm'

class UpdateDriver extends Component {
  render() {
    return(
      <Container>
        <HeaderEx title="Update your Profile"/>
        <Content contentContainerStyle={{flex: 1}}>
          <UpdateDriverForm auth={this.props.auth} navigation={this.props.navigation}/>
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

export default connect(mapStateToProps)(UpdateDriver);
