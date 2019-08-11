import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Title, View, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'react-native-firebase';
import SpinnerBox from './../../components/SpinnerBox';

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
      err: null,
      confirmResult: null,
    }
  }
  componentDidMount() {
    let phone = this.props.navigation.getParam('phone');
    let country = this.props.navigation.getParam('country');
    phone = country+phone;
    this.setState({phone});
    firebase.auth().signInWithPhoneNumber(phone)
    .then(confirmResult => {
      console.log('confirmResult', confirmResult);
      this.setState({confirmResult});
    })
    .catch(err => {
      this.setState({err: err.message})
      Alert.alert(
        "Connecting Issue",
        err.message,
        [
          {text: 'Try again', onPress: () => this.props.navigation.navigate('Login')},
        ]
      );
    })
  }
  render() {
    if(!this.state.confirmResult) return <SpinnerBox />
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
