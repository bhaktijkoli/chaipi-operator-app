import React, { Component } from 'react';
import { TouchableOpacity, Image, SrollView } from 'react-native';
import { View, Form, Item, Label, Text, Input, Textarea, Icon, Button, Toast } from 'native-base';
import { If, Then, Else } from 'react-if';
import ButtonEx from './../../components/Button';

import Style from './../../styles/style';
import Request from './../../utils/request';

class RegisterShopForm extends Component {
  state = {
    name: '',
    description: '',
    name_error: '',
    description_error: '',
    address_error: '',
    location: {
      location: "",
      house: "",
      landmark: "",
      lat: 0,
      lon: 0,
    },
    process: false,
  }
  render() {
    return(
      <ScrollView style={Style.content}>
        <Form style={Style.bottom}>
          <Label>Shop Name</Label>
          <Item regular error={this.state.name_error.length>0} style={Style.inputRegularError}>
            <Input
              value={this.state.name}
              onChangeText={val=>this.setState({name: val})} />
          </Item>
          <Text style={Style.error}>{this.state.name_error}</Text>
          <Label>Address:</Label>
          <Textarea
            rowSpan={5}
            bordered
            editable={false}
            value={this.getLocationFormat()}
            style={Style.inputNoBorder} />
          <Button small bordered onPress={e=>this.props.navigation.navigate('ShopAddress', {setLocation: this.setLocation.bind(this)})}>
            <Text>Change</Text>
          </Button>
          <Text style={Style.error}>{this.state.address_error}</Text>
          <Label>Shop Description</Label>
          <Textarea
            rowSpan={5}
            bordered
            style={Style.inputNoBorder}
            value={this.state.description}
            onChangeText={val=>this.setState({description: val})} />
          <Text style={Style.error}>{this.state.description_error}</Text>
          <ButtonEx onPress={this.onClickAdd.bind(this)} loading={this.state.process} text="SUBMIT"/>
        </Form>
      </ScrollView>
    )
  }
  onClickAdd() {
    this.setState({process: true});
    let data = {
      name: this.state.name,
      description: this.state.description,
      location: this.state.location.location,
      house: this.state.location.house,
      landmark: this.state.location.landmark,
      lat: this.state.location.lat,
      lon: this.state.location.lon,
    }
    Request.post('/shop/add', data)
    .then(res => {
      console.log(res.data);
      if(res.data.success) {
        NavigationActions.resetNavigation(this, 'Login');
      } else {
        let messages = res.data.messages;
        Object.keys(messages).forEach(el => {
          var key = el+'_error';
          this.setState({[key]: messages[el]})
        });
      }
      this.setState({process: false});
    }).catch(err => console.error(err))
  }
  changeImage() {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = { uri: response.uri };
        this.setState({
          image: { uri: response.uri, name: response.fileName, type: response.type },
        });
      }
    });
  }
  getLocationFormat() {
    let format = this.state.location.house;
    if(format.length > 0) format += ", "
    format += this.state.location.landmark;
    if(format.length > 0) format += ", "
    format += this.state.location.location;
    return format;
  }
  setLocation(location) {
    this.setState({location})
  }
}

export default RegisterShopForm;
