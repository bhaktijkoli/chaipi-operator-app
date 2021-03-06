import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Text, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class NotAMember extends Component {
  render() {
    return(
      <Container>
        <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button primary transparent block onPress={e=>this.props.navigation.navigate('RegisterShop')}>
            <Text>Register your shop</Text>
          </Button>
          <Button primary transparent block onPress={e=>this.props.navigation.navigate('RegisterDriver')}>
            <Text>Register as Driver</Text>
          </Button>
          <Button primary transparent block onPress={e=>this.props.navigation.navigate('Logout')}>
            <Text>Logout</Text>
          </Button>
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

export default connect(mapStateToProps)(NotAMember);
