import React, { Component } from 'react';
import { Container, Content, Title, View, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'react-native-firebase';

import OTPVerifyForm from './OTPVerifyForm'

import Style from './../../styles/style';

class OTPVerify extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      err: '',
      confirmResult: null,
    }
  }
  componentDidMount() {
    let phone = this.props.navigation.getParam('phone');
    let country = this.props.navigation.getParam('country');
    phone = country+phone;
    this.setState({phone});
    firebase.auth().signInWithPhoneNumber(phone, true)
    .then(confirmResult => {
      this.setState({confirmResult: confirmResult});
    })
    .catch(err => {
      console.error(err.message);
    })
  }
  render() {
    return(
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Text>{this.state.err}</Text>
          <Grid style={{alignItems: 'center'}}>
            <Col style={Style.content}>
              <OTPVerifyForm phone={this.state.phone} confirmResult={this.state.confirmResult} />
            </Col>
          </Grid>
        </Content>
      </Container>
    )
  }
}

export default OTPVerify;
