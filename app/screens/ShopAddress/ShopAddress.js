import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content } from 'native-base';
import { Form, Item, Label, Text, Input, Textarea, Icon, Button, Toast } from 'native-base';
import { PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';

import axios from 'axios'

import Style from './../../styles/style';

import HeaderEx from './../../components/Header2'

class ShopAddress extends Component {
  state = {
    location: '',
    house: '',
    landmark: '',
    house_error: '',
    landmark_error: '',
    lat: 0,
    lon: 0,
  }
  async componentDidMount() {
    if(await !this.requestLocationPermission()) return;
    Geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this.moveCamera(lat, lon)
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  render() {
    let coordinate = {
      latitude: this.state.lat,
      longitude: this.state.lon,
    }
    return(
      <Container>
        <HeaderEx title="Address"/>
        <Content contentContainerStyle={{flex: 1}}>
          <MapView
            ref="map"
            onRegionChange={this.onRegionChange.bind(this)}
            onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
            style={CustomStyle.map}>
            <Marker
              title="Move pin to adjust your location"
              coordinate={coordinate}
              >
            </Marker>
          </MapView>
          <Form style={Style.content}>
            <Label>Location</Label>
            <Item regular style={Style.inputRegularError}>
              <Input
                caretHidden={true}
                placeholder="Searching your location"
                editable={false}
                value={this.state.location} />
            </Item>
            <Text style={Style.error}></Text>
            <Label>House/Flat No</Label>
            <Item regular error={this.state.house_error.length>0} style={Style.inputRegularError}>
              <Input
                value={this.state.house}
                onChangeText={val=>this.setState({house: val})} />
            </Item>
            <Text style={Style.error}>{this.state.house_error}</Text>
            <Label>Landmark</Label>
            <Item regular error={this.state.landmark_error.length>0} style={Style.inputRegularError}>
              <Input
                value={this.state.landmark}
                onChangeText={val=>this.setState({landmark: val})} />
            </Item>
            <Text style={Style.error}>{this.state.landmark_error}</Text>
            <Button block onPress={this.onClickAdd.bind(this)}>
              <Text>Add</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
  onClickAdd() {
    // setLocation
    let setLocation = this.props.navigation.getParam('setLocation');
    let data = {
      location: this.state.location,
      house: this.state.house,
      landmark: this.state.landmark,
      lat: this.state.lat,
      lon: this.state.lon,
    }
    setLocation(data);
    this.props.navigation.goBack();
  }
  onRegionChange(region) {
    this.setState({location: ""})
    this.moveMarker(region.latitude, region.longitude);
  }
  onRegionChangeComplete(region) {
    this.getLocation();
  }
  moveCamera(lat, lon) {
    this.moveMarker(lat, lon)
    this.refs.map.animateCamera({
      center: {
        latitude: this.state.lat,
        longitude: this.state.lon,
      },
      pitch: 0,
      heading: 0,
      altitude: 18,
      zoom: 18,
    })
    this.getLocation();
  }
  moveMarker(lat, lon) {
    this.setState({lat, lon});
  }
  getLocation() {
    let {lat, lon} = this.state;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyB725g4AZKR2idp-yY5opgxFrV_wR2z2MU`;
    axios.get(url)
    .then(res => {
      let location = res.data.results[1].formatted_address;
      this.setState({location});
    })
  }
  async requestLocationPermission() {
    if(Platform.OS === 'iOS') return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        return true
      } else {
        console.log('Camera permission denied');
        return false
      }
    } catch (err) {
      console.warn(err);
      return true;
    }
  }
}

const CustomStyle = StyleSheet.create({
  map: {
    width:'100%',
    height:260,
  },
})

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default ShopAddress;
