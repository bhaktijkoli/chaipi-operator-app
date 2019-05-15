import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import HeaderEx from './../../components/Header';

import DriverFooter from './../../components/DriverFooter';

class DriverMain extends Component {
  render() {
    return(
      <Container>
        <HeaderEx title="Home"/>
        <Content contentContainerStyle={{flex: 1}}>

        </Content>
        <DriverFooter tab='home' navigation={this.props.navigation}/>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(DriverMain);
