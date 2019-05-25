import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'react-native-firebase';

import Request from './../../utils/request';
import Fcm from './../../utils/fcm';
import AuthActions from './../../actions/authActions';
import NavigationActions from './../../actions/navigationActions';
import Style from './../../styles/style';

import LoginForm from './LoginForm'

class Login extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loading: true,
    }
  }
  componentDidMount() {
    let user = null
    this.authChange = firebase.auth().onAuthStateChanged((u) => {
      if(user) return;
      user = u;
      if(user) {
        let data = {uid: user._user.uid, phone: user._user.phoneNumber}
        AuthActions.setUserUID(this, data);
        Request.get('/user/get/'+user._user.uid)
        .then(res => {
          AuthActions.setUser(this, res.data);
          Request.setToken(user._user.uid);
          Fcm.syncToken();
          if(res.data.type == 1) {
            // Shop
            if(res.data.shop.verified == 0) {
              this.props.navigation.dispatch(NavigationActions.waitingAction);
            } else {
              AuthActions.getShopProducts(this, res.data.shop.id);
              this.props.navigation.dispatch(NavigationActions.shopAction);
            }
          } else if(res.data.type == 2) {
            // Driver
            this.props.navigation.dispatch(NavigationActions.driverAction);
          } else {
            this.props.navigation.dispatch(NavigationActions.setupAction);
          }
        })
        .catch(err => {
          NavigationActions.resetNavigation(this, 'ProfileSetup')
        })
      } else {
        this.setState({loading:false})
      }
    });
  }
  componentWillUnmount() {
    this.authChange = null;
  }
  render() {
    if(this.state.loading) {
      return(
        <View></View>
      )
    }
    return(
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Grid style={{alignItems: 'flex-end'}}>
            <Col style={Style.content}>
              <LoginForm navigation={this.props.navigation}/>
            </Col>
          </Grid>
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

export default connect(mapStateToProps)(Login);
