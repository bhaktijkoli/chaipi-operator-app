import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'native-base';
import { View, Form, Item, Label,Content, Text, Card, Input, Textarea, Icon, Button, Toast, Container, CardItem, Body, Right } from 'native-base';

import Style from './../../styles/style.js';
import contactus from '../../data/contactus.json';
 
class AboutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactus: require('../../data/contactus.json'),
    }
  }
    render() {
        return (
          <View>
          {this.contactus()}
        </View>
            )
     }

     contactus(){
      return contactus.map(function(options, i){
        return(
          <View key = {i}>
          <Text style = {Style.heading}>{options.title}</Text>
          <Text>{options.description}</Text>
          </View>
        );
      });
    }

}

export default AboutForm;