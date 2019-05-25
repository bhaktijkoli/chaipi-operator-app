import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { Form, Item, Label, Text, Input, Textarea, Icon, Toast, Button } from 'native-base';
import { If, Then, Else } from 'react-if';
import ButtonEx from './../../components/Button';

const ImagePicker = require('react-native-image-picker');

import Style from './../../styles/style';
import Request from './../../utils/request';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class RegisterDriverForm extends Component {
  state = {
    number: '',
    licence: null,
    number_error: '',
    licence_error: '',
    process: false,
  }
  render() {
    return(
      <ScrollView style={Style.content}>
        <Form style={Style.bottom}>
          <Label>Bike Number</Label>
          <Item regular error={this.state.number_error.length>0} style={Style.inputRegularError}>
            <Input
              value={this.state.number}
              onChangeText={val=>this.setState({number: val})} />
          </Item>
          <Text style={Style.error}>{this.state.number_error}</Text>
          <Label>Upload licence</Label>
          <If condition={this.state.licence==null}>
            <Then>
              <Button style={Style.input} bordered onPress={this.changeLicense.bind(this)}>
                <Icon name="pluscircleo" type="AntDesign"/>
              </Button>
            </Then>
            <Else>
              <TouchableOpacity activeOpacity = { .5 } onPress={this.changeLicense.bind(this)}>
                <Image source={this.state.licence} style={{width:152, height:152, marginTop:10, marginBottom: 20}} onPress={this.changeLicense.bind(this)}/>
              </TouchableOpacity>
            </Else>
          </If>
          <Text style={Style.error}>{this.state.licence_error}</Text>
            <ButtonEx onPress={this.onClickRegister.bind(this)} loading={this.state.process} text="REGISTER"/>
        </Form>
      </ScrollView>
    )
  }
  changeLicense() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = { uri: response.uri };
        this.setState({
          licence: { uri: response.uri, name: response.fileName, type: response.type },
        });
      }
    });
  }
  onClickRegister() {
    this.setState({process: true, number_error: '', licence_error: ''});
    let data = new FormData();
    data.append('number', this.state.number)
    data.append('licence', this.state.licence)
    Request.post('/driver/add', data)
    .then(res => {
      console.log(res.data);
      if(res.data.success) {
        alert("We have recieved your application, we will come back to you soon.")
        this.props.update();
        this.props.navigation.navigate('Login');
      } else {
        let messages = res.data.messages;
        Object.keys(messages).forEach(el => {
          var key = el+'_error';
          this.setState({[key]: messages[el]})
        });
      }
    })
    .catch(res => console.err(res))
    .finally(()=>this.setState({process: false}));
  }
}

export default RegisterDriverForm;
