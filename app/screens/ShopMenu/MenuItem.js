import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { View, Text, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Shimmer from 'react-native-shimmer-placeholder';
import {If, Then, Else} from 'react-if';

import Request from './../../utils/request';

class MenuItem extends Component {
  state = {
    loaded: false,
  }
  render() {
    let { item } = this.props
    return(
      <View style={{flexDirection: 'row'}}>
        <Shimmer autoRun={true} visible={this.state.loaded} style={CustomStyle.image}>
          <Image source={{ uri: item.image }} style={CustomStyle.image} onLoad={e=>this.setState({loaded:true})}/>
        </Shimmer>
        <View style={{flexDirection: 'column'}}>
          <Text numberOfLines={1} style={CustomStyle.title}>{item.name}</Text>
          <Text note style={CustomStyle.availableText}>{item.available==1?"Available":"Not Available"}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <If condition={item.available == 1}>
              <Then>
            <Button transparent small style={CustomStyle.button} onPress={e=>this.onToggleAvailable(0)}>
              <Icon name="lock1" type="AntDesign"/>
            </Button>
          </Then>
          <Else>
            <Button transparent small style={CustomStyle.button} onPress={e=>this.onToggleAvailable(1)}>
              <Icon name="unlock" type="AntDesign"/>
            </Button>
          </Else>
          </If>
            <Button info transparent small style={CustomStyle.button}>
              <Icon name="edit" type="AntDesign"/>
            </Button>
          </View>
        </View>
      </View>
    )
  }
  onToggleAvailable(v) {
    let data = {
      product: this.props.item.id,
      available: v,
    }
    Request.post('/product/available', data)
    .then(res => {
      this.props.update();
    }).catch(err => console.error(err))
  }
}

const CustomStyle = StyleSheet.create({
  image: {
    width:116,
    height:84,
    marginLeft:5,
    marginRight:5,
    marginBottom:10,
  },
  title: {
    marginTop:5,
    marginRight:5,
    marginBottom:2,
    marginLeft:5,
    width:'100%',
    height:20,
  },
  availableText: {
    marginRight:5,
    marginBottom:5,
    marginLeft:5,
  },
})

export default MenuItem
