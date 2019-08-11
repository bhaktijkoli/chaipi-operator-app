import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'native-base';
import { Form, Item, Label, Input } from 'native-base';
import firebase from 'react-native-firebase';

import ButtonEx from './../../components/Button';

import Style from './../../styles/style';

class OTPVerify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      process: false,
    }
  }
  render() {
    return(
      <Form>
        <View style={{alignItems:'center', marginBottom: 20}}>
          <Label>Enter the verification code sent to</Label>
          <Text style={{marginTop:10, marginBottom:10}}>{this.props.phone}</Text>
        </View>
        <Item floatingLabel style={Style.input}>
          <Input
            textAlign={'center'}
            keyboardType="numeric"
            maxLength={6}
            autoFocus
            value={this.state.code}
            onChangeText={code=> this.setState({code})}
            />
        </Item>
        <ButtonEx onPress={this.OnClickVerify} loading={this.state.process} text="VERIFY" disabled={this.state.code.length != 6}/>
      </Form>
    )
  }
  OnClickVerify = () => {
    let { code } = this.state;
    this.setState({process:true})
    this.props.confirmResult.confirm(code)
    .then(user=> {
      console.log(user);
    })
    .catch(err => {
      console.log(err);
      Alert.alert("Verification failed", "You have enter wrong or expired OTP")
    })
    .finally(() => {
      this.setState({process:false})
    })
  }
}

export default OTPVerify;
