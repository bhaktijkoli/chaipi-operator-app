import React, { Component } from 'react';
import { TouchableOpacity, Image, ScrollView } from 'react-native';
import { View, Form, Item, Label, Text, Input, Textarea, Icon, Button, Toast } from 'native-base';
import { If, Then, Else } from 'react-if';
const ImagePicker = require('react-native-image-picker');
import ButtonEx from './../../components/Button';


import Style from './../../styles/style';
import Request from './../../utils/request';
import NavigationActions from './../../actions/navigationActions';

const imagePickerOptions = {
  title: 'Select Shop Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class RegisterShopForm extends Component {
  state = {
    name: '',
    description: '',
    image: null,
    name_error: '',
    description_error: '',
    address_error: '',
    image_error: '',
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
          <Label>Shop Photo</Label>
          <If condition={this.state.image==null}>
            <Then>
              <Button style={Style.input} bordered onPress={this.changeImage.bind(this)}>
                <Icon name="pluscircleo" type="AntDesign"/>
              </Button>
            </Then>
            <Else>
              <TouchableOpacity activeOpacity = { .5 } onPress={this.changeImage.bind(this)}>
                <Image source={this.state.image} style={{width:152, height:152, marginTop:10, marginBottom: 20}} onPress={this.changeImage.bind(this)}/>
              </TouchableOpacity>
            </Else>
          </If>
          <Text style={Style.error}>{this.state.image_error}</Text>
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
    // this.setState({process: true});
    let data = new FormData();
    data.append('name', this.state.name)
    data.append('description', this.state.description)
    data.append('address', this.state.location.address)
    data.append('house', this.state.location.house)
    data.append('landmark', this.state.location.landmark)
    data.append('lat', this.state.location.lat)
    data.append('lon', this.state.location.lon)
    data.append('image', this.state.image)
    Request.post('/shop/add', data)
    .then(res => {
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
    format += this.state.location.address;
    return format;
  }
  setLocation(location) {
    this.setState({location})
  }
}

export default RegisterShopForm;
