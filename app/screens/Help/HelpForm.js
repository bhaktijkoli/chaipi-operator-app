import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'native-base';
import { View, Form, Item, Label,Content, Text, Card, Input, Textarea, Icon, Button, Toast, Container, CardItem, Body, Right } from 'native-base';

import Style from './../../styles/style.js';

 
class HelpForm extends Component {
    render() {
        return (
            <Container>
            <Content>
               <List>
                   <ListItem>
                   </ListItem>
                   {this.renderHelpItems(helpitems)}
               </List>
            </Content>
          </Container>
            )
     }

     renderHelpItems(arrayItems, condition=true) {
        if(condition) {
          return arrayItems.map((el, key) => {
            return(
              <ListItem key={key} onPress={e=>this.onClickListItem(el.route)}>
                <Body style={{flex:6}}>
                  <Text>{el.name}</Text>
                </Body>
              </ListItem>
            )
          })
        }
        else {
          return null;
        }
      }
      onClickListItem(route) {
        this.props.navigation.navigate(route);
      }
}

const helpitems= [
    {name : 'Guide to ChaiPiOperator', route: 'Home', type: 'AntDesign'},
];


export default HelpForm;