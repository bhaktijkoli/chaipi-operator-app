import React, { Component } from 'react';
import { Container } from 'native-base';
import firebase from 'react-native-firebase';

import NavigationActions from './../../actions/navigationActions';

class Logout extends Component {
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    firebase.auth().signOut();
    setTimeout(function () {
      this.props.navigation.dispatch(NavigationActions.loginAction);
    }.bind(this), 300);
  }
  render() {
    return(
      <Container>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default Logout;
