import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Card, CardItem, Body, Button, Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { If, Then, Else } from 'react-if';

import Request from './../../utils/request';

const moment = require('moment');

class Task extends Component {
  state = {
    layoutOpen: false,
    timeLeft: 0,
  }
  componentDidMount() {
    let order = this.props.order;
    let completionTime = moment(order.createdAt, 'YYYY-MM-DD HH:mm:ss').add(order.time, 'minutes');
    this.setState({timeLeft: completionTime.diff(moment(), 'minutes')})
    let timeLeftTimer = () => {
      setTimeout(function () {
        this.setState({timeLeft: this.state.timeLeft-1});
        timeLeftTimer();
      }.bind(this), 60000);
    }
    timeLeftTimer();
  }
  render() {
    let order = this.props.order;
    let shop = order.shop;
    let navigation = this.props.navigation;
    let createdAt = moment(order.createdAt, 'YYYY-MM-DD HH:mm:ss');
    return(
      <TouchableWithoutFeedback onPress={e=>this.setState({layoutOpen: !this.state.layoutOpen})}>
        <Card style={CustomStyle.container}>
          <CardItem>
            <Col size={3}>
              <View style={CustomStyle.headerid}>
                <Text style={CustomStyle.headeridText}>#{order.trackid}</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={CustomStyle.headerTime}>
                <Icon type="Entypo" name="clock" style={CustomStyle.timeIcon}/>
                <Text note>{this.state.timeLeft} Mins Remaining</Text>
              </View>
            </Col>
          </CardItem>
          <CardItem>
            <Row>
              <Col>
                <Text numberOfLines={1}>{shop.name}</Text>
                <Text note numberOfLines={this.state.layoutOpen?0:1}>{shop.house}, {shop.landmark}, {shop.address}</Text>
              </Col>
            </Row>
          </CardItem>
          <If condition={this.state.layoutOpen}>
            <Then>
              <CardItem>
                <Grid>
                  <Row>
                    <Col>
                      <Button dark transparent full onPress={this.onPressDetails.bind(this)}><Text>VIEW DETAILS</Text></Button>
                    </Col>
                  </Row>
                </Grid>
              </CardItem>
            </Then>
          </If>
        </Card>
      </TouchableWithoutFeedback>
    )
  }
  onPressDetails() {
    this.props.navigation.navigate('DriverTaskDetails', {order: this.props.order});
  }
}

const CustomStyle = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 10,
  },
  headerid: {
    marginLeft: -20,
    backgroundColor: '#f39c12',
    alignSelf: 'flex-start',
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  headeridText: {
    color: '#FFF',
    fontSize: 14,
  },
  headerTime: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  timeIcon: {
    color: '#eeee',
    fontSize: 14,
  },
  newText: {
    marginTop: 5,
    color: '#FFF',
    backgroundColor: '#27ae60',
    fontSize: 14,
    paddingTop: 3,
    paddingBottom: 3,
    alignItems: 'center',
    textAlign: 'center',
  },
  statusContainer: {
    marginTop: -15,
  }
});

export default Task;
