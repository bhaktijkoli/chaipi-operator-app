import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import HeaderEx from './../../components/Header2'

import RegisterDriverForm from './RegisterDriverForm'

class RegisterDriver extends Component {
  render() {
    return(
      <Container>
        <HeaderEx title="Register As Driver"/>
        <Content contentContainerStyle={{flex: 1}}>
          <RegisterDriverForm auth={this.props.auth} />
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

export default connect(mapStateToProps)(RegisterDriver);
