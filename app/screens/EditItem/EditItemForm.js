import React, { Component } from 'react';
import { TouchableOpacity, Image, ScrollView } from 'react-native';
import { Form, Item, Label, Text, Input, Textarea, Icon, Button, Toast } from 'native-base';
import { If } from 'react-if';
import ButtonEx from '../../components/Button';

import Style from '../../styles/style';
import Request from '../../utils/request';

const ImagePicker = require('react-native-image-picker');

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class ShopAddItemItemForm extends Component {
  state = {
    name: '',
    product_id: null,
    price: '0',
    time: '0',
    image: null,
    description: '',
    name_error: '',
    price_error: '',
    time_error: '',
    process: false,
  }
  async componentDidMount() {
    let product = this.props.navigation.getParam('product');
    this.setState({
      name_id: product.id,
      name: product.name,
      price: product.price,
      time: product.time,
      image: product.image,
      description: product.description, 
    });
  }
  render() {
    return(
      <ScrollView style={Style.content}>
        <Form style={Style.bottom}>
          <Label>Name</Label>
          <Item regular error={this.state.name_error.length>0} style={Style.inputRegularError}>
            <Input
              value={this.state.name}
              onChangeText={val=>this.setState({name: val})}
              />
          </Item>
          <Text style={Style.error}>{this.state.name_error}</Text>
          <Label>Final Price</Label>
          <Item regular error={this.state.price_error.length>0} style={Style.inputRegularError}>
            <Input
              value={this.state.price}
              keyboardType="numeric"
              onChangeText={val=>this.setState({price: val})} />
            <Icon name='inr' type="FontAwesome" style={{color:'#575757'}}/>
          </Item>
          <Text style={Style.error}>{this.state.price_error}</Text>
          <Label>Preparation Time</Label>
          <Item regular error={this.state.time_error.length>0} style={Style.inputRegularError}>
            <Input
              keyboardType="numeric"
              value={this.state.time}
              onChangeText={val=>this.setState({time: val})} />
            <Icon name='clock-o' type="FontAwesome" style={{color:'#575757'}}/>
          </Item>
          <Text style={Style.error}>{this.state.time_error}</Text>
          <Label>Image</Label>
          <If condition={this.state.image!=null}>
            <TouchableOpacity activeOpacity = { .5 } onPress={this.changeImage.bind(this)}>
              <Image source={this.state.image} style={{width:152, height:152, marginTop:10, marginBottom: 20}} onPress={this.changeImage.bind(this)}/>
            </TouchableOpacity>
          </If>
          <If condition={this.state.image==null}>
            <Button style={Style.input} bordered onPress={this.changeImage.bind(this)}>
              <Icon name="pluscircleo" type="AntDesign"/>
            </Button>
          </If>
          <Label>Description</Label>
          <Textarea
            rowSpan={5}
            bordered
            style={Style.inputNoBorder}
            value={this.state.description}
            onChangeText={val=>this.setState({description: val})} />
          <ButtonEx onPress={this.onClickAdd.bind(this)} loading={this.state.process} text="ADD"/>
        </Form>
      </ScrollView>
    )
  }
  changeImage() {
    ImagePicker.showImagePicker(options, (response) => {
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
  onClickAdd() {
    this.setState({process: true, name_error: '', price_error: '', time_error: ''});
    let data = new FormData();
    data.append('name', this.state.name)
    data.append('type', 'product')
    data.append('price', this.state.price)
    data.append('time', this.state.time)
    data.append('description', this.state.description)
    data.append('image', this.state.image)
    Request.post('/product/add', data)
    .then(res => {
      if(res.data.success) {
        Toast.show({text: `${this.state.name} has been listed.`, buttonText: 'Ok'});
        this.props.update();
        this.props.navigation.navigate('ShopMenu');
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


export default ShopAddItemItemForm;
