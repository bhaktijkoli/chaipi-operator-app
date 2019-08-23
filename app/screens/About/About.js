import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView, Image } from 'react-native';
import { Container, Content, Button, ListItem, Left, Right, Body, Icon, Text, View } from 'native-base';

import Header2 from './../../components/Header2.js';
import Style from './../../styles/style.js';

import AboutForm from './AboutForm';

 
class About extends Component {
    render() {
        return (
            <Container>
            <Header2 title="About"/>
            <View
            style = {{
                borderBottomColor: 'gainsboro',
                borderBottomWidth: 1,
            }}
            ></View>
            <ScrollView style={Style.content}>
            <AboutForm auth={this.props.auth} navigation={this.props.navigation}/>
            </ScrollView>
          </Container>
        )
     }
}

function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }

  export default connect(mapStateToProps)(About);