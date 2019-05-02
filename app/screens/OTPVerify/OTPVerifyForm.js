import React, { Component } from 'react';
import { Text, View } from 'native-base';
import { Form, Item, Label, Input } from 'native-base';
import firebase from 'react-native-firebase';

import Button from './../../components/Button';

import Style from './../../styles/style';

class OTPVerify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code0: '',
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      process: false,
    }
    this.OnClickVerify = this.OnClickVerify.bind(this);
  }
  render() {
    var counts = [0,1,2,3,4,5];
    var countsList = counts.map((el, key) => {
      return(
        <View key={key} style={{flex:1,margin:3}}>
          <Item style={Style.input}>
            <Input
              ref={input => this['code'+key] = input}
              textAlign={'center'}
              keyboardType="numeric"
              maxLength={1}
              autoFocus={key==0}
              value={this.state['code'+key]}
              onChangeText={value=> {
                this.setState({['code'+key]:value})
                if(value.length == 1 && key < counts.length-1) {
                  this['code'+(key+1)]._root.focus();
                }
              }}
              onKeyPress={event => {
                if(event.nativeEvent.key == "Backspace" && key > 0) {
                  let k = 'code'+parseInt(key-1);
                  console.log(this.state[k]);
                  this.setState({[k]:""})
                  this[k]._root.focus();
                }
              }}
              />
          </Item>
        </View>
      )
    });
    return(

      <Form>
        <View style={{'alignItems':'center'}}>
          <Label>Enter the verification code sent to</Label>
          <Text style={{marginTop:10, marginBottom:10}}>{this.props.phone}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          {countsList}
        </View>
        <Button onPress={this.OnClickVerify} loading={this.state.process} text="VERIFY"/>
      </Form>
    )
  }
  OnClickVerify() {
    let { code0, code1, code2, code3, code4, code5 } = this.state;
    let code = code0 + code1 + code2 + code3 + code4 + code5;
    this.setState({process:true})
    this.props.confirmResult.confirm(code)
    .then(user=> {
      console.log(user);
    })
    .catch(err => {
      console.log(err.message);
      Toast.show({ text: err.message, buttonText: 'Ok' })
    })
    .finally(() => {
      this.setState({process:false})
    })
  }
}

export default OTPVerify;
