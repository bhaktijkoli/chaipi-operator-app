import React, { Component } from 'react';
import { Container, Content, View, Title} from 'native-base';
import { Button, Text } from 'native-base';
import { Form, Item, Label, Input, Picker, Icon } from 'native-base';

import Style from './../../styles/style';

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.onClickLogin = this.onClickLogin.bind(this);
    this.state = {
      phone: '7710848662',
      country: '+91',
      countries: require('./../../data/countries.json'),
    }
  }
  render() {
    return(
      <Form style={Style.bottom}>
        <Label style={Style.label}>Enter your phone number</Label>
        <View style={{flexDirection:'row'}}>
          <Item picker style={[Style.input, {flex: 1}]}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.country}
              onValueChange={val=> {
                console.log(val);
                this.setState({'country':val})
              }}
              >
              {
                this.state.countries.map((country, key) => {
                  return <Picker.Item key={key} label={"+"+country.dialCode} value={"+"+country.dialCode} />
                })
              }
            </Picker>
          </Item>
          <Item style={[Style.input, {flex: 3}]}>
            <Input
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              maxLength={10}
              placeholder="Enter your phone number"
              value={this.state.phone}
              onChangeText={value=>this.setState({'phone':value})}/>
          </Item>
        </View>
        <Button block large style={Style.button} onPress={this.onClickLogin}>
          <Text>LOGIN</Text>
        </Button>
      </Form>
    )
  }
  onClickLogin() {
    var phone = this.state.phone;
    var country = this.state.country;
    this.props.navigation.navigate('OTPVerify', {phone, country});
  }
}

export default LoginForm;
