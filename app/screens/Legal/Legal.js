import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView, Image } from 'react-native';
import { Container, Content, Button, ListItem, Left, Right, Body, Icon, Text, View } from 'native-base';

import Header2 from './../../components/Header2.js';
import ButtonEx from './../../components/Button';
import Style from './../../styles/style';

import LegalForm from './LegalForm';

class Legal extends Component {
  render() {
    return(
      <Container>
        <Header2 title="Legal"/>
        <View
        style = {{
            borderBottomColor: 'gainsboro',
            borderBottomWidth: 1,
        }}
        ></View>
        <ScrollView style={Style.content}>
        <LegalForm auth={this.props.auth} navigation={this.props.navigation}/>

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

export default connect(mapStateToProps)(Legal);
