import React, { Component } from 'react';
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { Container, Content, View, Text, Button, Icon } from 'native-base';
import { If, Else, Then } from 'react-if';
import { Col, Row, Grid } from 'react-native-easy-grid';
import MapView, { Marker } from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions'

import HeaderEx from './../../components/Header2';
import SpinnerBox from './../../components/SpinnerBox';

import Style from './../../styles/style';
import Request from './../../utils/request';
import DriverActions from './../../actions/driverActions';

class DriverTaskDetails extends Component {
  componentDidMount() {
  }
  render() {
    let order = this.props.navigation.getParam('order');
    let shop = order.shop;
    let products = JSON.parse(order.products);
    let shopCoordinates = {
      latitude: shop.lat,
      longitude: shop.lon,
    }
    return(
      <Container>
        <HeaderEx title={"TASK #"+order.trackid}/>
        <ScrollView>
          <MapView
            style={{width:'100%', height: 260}}
            initialRegion={{
              latitude: shop.lat,
              longitude: shop.lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            >
            <Marker
              coordinate={shopCoordinates}/>
          </MapView>
          <Content style={[Style.content, Style.mg10]}>
            <Grid>
              <Row>
                <Col>
                  <Text>ORDER #{order.trackid}</Text>
                </Col>
              </Row>
              <Row style={Style.top}>
                <Col><Icon type="Entypo" name="shop" style={this.getAddressStyle(order, 1)}/></Col>
                <Col size={4} onPress={this.onGetDirections.bind(this)}>
                  <Text style={this.getAddressStyle(order, 1)}>{shop.house}, {shop.landmark}, {shop.location}</Text>
                </Col>
              </Row>
              <Row style={Style.top10}>
                <Col><Icon type="FontAwesome" name="map-marker" style={this.getAddressStyle(order, 2)}/></Col>
                <Col size={4} onPress={this.onGetDirections.bind(this)}>
                  <Text style={this.getAddressStyle(order, 2)}>{shop.house}, {shop.landmark}, {shop.location}</Text>
                </Col>
              </Row>
              <Row style={Style.top}>
                <Col>
                  <Text>Order Details</Text>
                </Col>
              </Row>
              <Row style={Style.top10}>
                <Col size={4}>
                  <Text note>Item</Text>
                  {
                    products.map((p, key) => {
                      return(
                        <Text>{p.name}</Text>
                      )
                    })
                  }
                </Col>
                <Col size={1}>
                  <Text note>Qty</Text>
                    {
                      products.map((p, key) => {
                        return(
                          <Text>{p.count}</Text>
                        )
                      })
                    }
                </Col>
              </Row>
            </Grid>
          </Content>
        </ScrollView>
      </Container>
    )
  }
  onGetDirections() {
    let order = this.props.navigation.getParam('order');
    let data = {
      destination: {
        latitude: order.shop.lat,
        longitude: order.shop.lon,
      },
      params: [
        {
          key: "travelmode",
          value: "driving"
        },
        {
          key: "dir_action",
          value: "navigate"
        }
      ]
    }
    getDirections(data)
  }
  getAddressStyle(order, num) {
    if(num == 1) {
      if(order.status < 3 || order.status == 4) {
        return {fontSize: 18}
      } else {
        return {fontSize: 14, color: '#808080'}
      }
    } else {
      if(order.status >= 3 || order.status == 4) {
        return {fontSize: 18}
      } else {
        return {fontSize: 14, color: '#808080'}
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    driver: state.driver,
  };
}

export default connect(mapStateToProps)(DriverTaskDetails);
