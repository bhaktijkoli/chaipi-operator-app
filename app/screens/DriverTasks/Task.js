import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, ListItem, Left, Body, Right } from 'native-base';

class Task extends Component {
  render() {
    let task = this.props.task;
    return(
      <ListItem style={CustomStyle.container}>
        <Body>
          <Text>{task.shop.name}</Text>
          <Text note>#{task.trackid}</Text>
        </Body>
        <Right>
          <Text></Text>
        </Right>
      </ListItem>
    )
  }
}

const CustomStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
  }
});

export default Task;
