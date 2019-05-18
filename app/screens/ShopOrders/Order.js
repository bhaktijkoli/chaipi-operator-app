import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Card, CardItem, Body, Button, Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { If, Then, Else } from 'react-if';

const moment = require('moment');

class Order extends Component {
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
    let createdAt = moment(order.createdAt, 'YYYY-MM-DD HH:mm:ss');
    return(
      <TouchableWithoutFeedback onPress={e=>this.setState({layoutOpen: !this.state.layoutOpen})}>
        <Card style={CustomStyle.container}>
          <CardItem>
            <Col size={4}>
              <View style={CustomStyle.headerid}>
                <Text style={CustomStyle.headeridText}>#{order.trackid}</Text>
              </View>
            </Col>
            <Col>
              <View style={CustomStyle.headerTime}>
                <Text note>{createdAt.format('h:MM A')}</Text>
              </View>
            </Col>
          </CardItem>
          <If condition={this.state.layoutOpen}>
            <Then>
              <CardItem>
                <Grid>
                  <Row>
                    <Col style={CustomStyle.statusContainer}>
                      <Text note>Preparing, {this.state.timeLeft} minutes remaining</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col size={4}>
                      <Text note>Item</Text>
                      {order.products.map((el, key) => {
                        return(
                          <Text numberOfLines={1} key={key}>{el.name}</Text>
                        )
                      })}
                    </Col>
                    <Col>
                      <Text note>Qty</Text>
                      {order.products.map((el, key) => {
                        return(
                          <Text key={key}>{el.count}</Text>
                        )
                      })}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button dark transparent full iconLeft><Text>MARK READY</Text></Button>
                    </Col>
                    <Col>
                      <Button dark transparent full iconLeft><Text>VIEW DETAILS</Text></Button>
                    </Col>
                  </Row>
                </Grid>
              </CardItem>
            </Then>
            <Else>
              <CardItem>
                <Grid>
                  <Row>
                    <Col style={CustomStyle.statusContainer}>
                      <Text note>Preparing, {this.state.timeLeft} minutes remaining</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Text>{order.products.map((el, key) => { return `${el.name}x${el.count}${key!=order.products.length-1?", ":""}`})}</Text>
                    </Col>
                  </Row>
                </Grid>
              </CardItem>
            </Else>
          </If>
        </Card>
      </TouchableWithoutFeedback>
    )
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
    paddingTop: 5,
  },
  statusContainer: {
    marginTop: -15,
  }
});

export default Order;
