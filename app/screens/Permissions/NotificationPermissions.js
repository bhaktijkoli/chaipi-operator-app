import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, View, Text, Button} from 'native-base';
import { Form, Item, Input } from 'native-base';
import { H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Request from './../../utils/request';
import permissionActions from './../../actions/permissionActions';
import Style from './../../styles/style';



class NotificationPermissions extends Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    return(
      <Container>
        <Content>
          <View style={{alignItems:'center', justifyContent: 'center', marginTop: 40}}>
            <Image source={require('./../../assets/notification.png')} style={{width:264, height:264, marginLeft:-15,marginBottom:20}}/>
          </View>
          <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
            <Text>Notification Services</Text>
            <Text note style={{textAlign:'center', marginLeft:'20%', marginRight: '20%'}}>Enable notifications so you don't miss updates from ChaiPi.</Text>
          </View>
          <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20,  marginLeft:'20%', marginRight: '20%'}}>
            <Button primary block onPress={this.onClickEnable}>
              <Text>ENABLE NOTIFICATION</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
  onClickEnable() {
    this.props.nextStep();
  }
}

export default NotificationPermissions;
