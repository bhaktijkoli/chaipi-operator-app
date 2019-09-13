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

class LocationPermissions extends Component {
  render() {
    return(
      <Container>
        <Content>
          <View style={{alignItems:'center', justifyContent: 'center', marginTop: 40}}>
            <Image source={require('./../../assets/location.png')} style={{width:264, height:264, marginLeft:-15,marginBottom:20}}/>
          </View>
          <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
            <Text>Loaction Services</Text>
            <Text note style={{textAlign:'center', marginLeft:'20%', marginRight: '20%'}}>We need to konw where you are in order to scan nearby assiatants.</Text>
          </View>
          <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20, marginLeft:'20%', marginRight: '20%'}}>
            <Button primary block onPress={this.onClickEnable}>
              <Text>ENABLE LOCATION</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
  onClickEnable = () => {
    if(permissionActions.getLocationPermission) {
      this.props.nextStep();
    } else {

    }
  }
}

export default LocationPermissions;
