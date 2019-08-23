import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class Home extends Component {
  render() {
    return(
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Text>Home</Text>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Home);
