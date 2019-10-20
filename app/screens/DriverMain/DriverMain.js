import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { FlatList, StyleSheet, Image, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Container, Content, View, Title, Card, CardItem, Text, Icon, Button } from 'native-base';

import ToggleSwitch from 'toggle-switch-react-native'
import Chart from './../../components/Chart';
import Header3 from './../../components/Header3';
import DriverFooter from './../../components/DriverFooter';

import AuthActions from './../../actions/authActions';
import DriverActions from './../../actions/driverActions';
import Request from './../../utils/request';

import Style from './../../styles/style';
import { If, Then, Else } from 'react-if';

class DriverMain extends Component {
  state = {
    data: null,
    layoutOpen: false,
  }

  constructor(props) {
    super(props)
    DriverActions.init(this);
    DriverActions.updateLocation();
  }
  componentDidMount() {
    Request.get('/driver/info')
    .then(res => {
      console.log("Driver Info", res.data);
      this.setState({data:res.data});
    });
    console.log("Driver Details", this.props.auth.user);
  }
  render() {
    let total_orders = 0;
    let total_successfull_orders = 0;
    let total_earnings = 0;
    if(this.state.data) {
      total_orders = this.state.data.total_orders;
      total_successfull_orders = this.state.data.total_successfull_orders;
      total_earnings = this.state.data.total_earnings;
    }
    return(
      <Container>
        <Header3/>
        <Content>
          <View>
            <Card style={CustomStyle.cardstyle}>
              <CardItem>
                <View style={{flexDirection: 'row'}}>
                {/*<ToggleSwitch
                  isOn={true}
                  onColor="green"
                  offColor="red"
                  labelStyle={{ color: "black", fontWeight: "900" }}
                  size="small"
                  onToggle={isOn => console.log("changed to : ", isOn)}
                ></ToggleSwitch>*/}
                  <If condition={this.props.auth.user.driver.active}>
                    <Then>
                  {/*<Text>You are accepting new tasks</Text>*/}
                      <Button block danger style={{marginLeft: 50, marginRight: 50, borderRadius: 20, width: 200}} onPress={e => this.updateActive(0)}><Text>INACTIVE</Text></Button>
                    </Then>
                      <Else>
                  {/*<Text>You are not accepting new tasks</Text>*/}
                      <Button block success style = {{marginLeft: 50, marginRight:50, borderRadius:20, width: 200}} onPress={e => this.updateActive(1)}><Text>ACTIVE</Text></Button>
                      </Else>
                  </If>
                </View>
              </CardItem>
            </Card>
            <Card style = {CustomStyle.cardstyle}>
            <CardItem>
                <Grid style={CustomStyle.billContainer}>
                  <Row>
                    <Col>
                      <Text style={{marginBottom: 15}}>TOTAL SUMMARY</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}>&#8377;</Text>
                    </Col>
                  </Row>
                  <Row style={{paddingTop:5,paddingBottom:5}}>
                    <Col>
                      <Text style={CustomStyle.billItem}>BOOKINGS</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}></Text>
                    </Col>
                  </Row>
                  <Row style={[Style.upperBorder, {paddingTop:5,paddingBottom:5}]}>
                    <Col>
                      <Text style={CustomStyle.billItem}>TOTAL ORDERS</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}>{total_orders}</Text>
                    </Col>
                  </Row>
                  <Row style={[Style.upperBorder, {paddingTop:5,paddingBottom:5}]}>
                    <Col>
                      <Text style={CustomStyle.billItem}>SUCESSFULL ORDERS</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}>{total_successfull_orders}</Text>
                    </Col>
                  </Row>
                  <Row style={[Style.upperBorder, {paddingTop:5,paddingBottom:5}]}>
                    <Col>
                      <Text style={CustomStyle.billItem}>CASH EARNINGS</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}>&#8377;{total_earnings}</Text>
                    </Col>
                  </Row>
                </Grid>
              </CardItem>
              <Row style = {{borderTopWidth:1,borderTopColor: 'gainsboro',}}/>
              {/*<CardItem>
                <Grid style={CustomStyle.billContainer}>
                  <Row>
                    <Col>
                      <Text style={{marginBottom: 15}}>PAYMENTS MADE</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}>&#8377;</Text>
                    </Col>
                  </Row>
                </Grid>
              </CardItem>*/}
            </Card>
            <Card style = {CustomStyle.cardstyle}>
              <CardItem>
                <View style = {{flexDirection: 'row'}}>
                  <Icon name = "suitcase" type = "FontAwesome"/>
                  <Grid>
                    <Row>
                      <Text style={{marginLeft: 40,alignItems: 'center',marginTop: 5}}>View Payment Due</Text>
                    </Row>
                  </Grid>
                  <Icon name = "right" type = "AntDesign"/>
                </View>
              </CardItem>
              <Row style = {{borderTopWidth:1,borderTopColor: 'gainsboro',}}/>
              <CardItem>
                <View style = {{flexDirection: 'row'}}>
                  <Icon name = "wallet" type = "AntDesign"/>
                  <Grid>
                    <Row>
                      <Text style={{marginLeft: 40,alignItems: 'center'}}>View Current Balance</Text>
                    </Row>
                  </Grid>
                  <Icon name = "right" type = "AntDesign"/>
                </View>
              </CardItem>
            </Card>
            <Card style = {CustomStyle.cardstyle}>
              <TouchableWithoutFeedback onPress={e=>this.setState({layoutOpen: !this.state.layoutOpen})}>
                <CardItem>
                  <View style = {{flexDirection: 'row'}}>
                    <Grid>
                      <Row>
                        <Col>
                          <Text style = {CustomStyle.billContainer2}>LAST 30 DAYS</Text>
                        </Col>
                      </Row>
                    </Grid>
                    <Icon name= "caret-down" type= "FontAwesome" color='#ffa500'/>
                  </View>
                </CardItem>
              </TouchableWithoutFeedback>
              <Row style = {{borderTopWidth:1,borderTopColor: 'gainsboro',}}/>
              <If condition={this.state.layoutOpen}>
                <CardItem>
                  <Chart/>
                </CardItem>
              </If>
              <Row style = {{borderTopWidth:1,borderTopColor: 'gainsboro',}}/>
              <If condition={this.state.layoutOpen}>
              <CardItem>
                <Grid style={CustomStyle.billContainer}>
                  <Row>
                    <Col>
                      <Text style={{marginBottom: 15}}>TOTAL SUMMARY</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}>&#8377;</Text>
                    </Col>
                  </Row>
                  <Row style={{paddingTop:5,paddingBottom:5}}>
                    <Col>
                      <Text style={CustomStyle.billItem}>BOOKINGS</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}></Text>
                    </Col>
                  </Row>
                  <Row style={[Style.upperBorder, {paddingTop:5,paddingBottom:5}]}>
                    <Col>
                      <Text style={CustomStyle.billItem}>TOTAL ORDERS</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}>{total_orders}</Text>
                    </Col>
                  </Row>
                  <Row style={[Style.upperBorder, {paddingTop:5,paddingBottom:5}]}>
                    <Col>
                      <Text style={CustomStyle.billItem}>SUCESSFULL ORDERS</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}>{total_successfull_orders}</Text>
                    </Col>
                  </Row>
                  <Row style={[Style.upperBorder, {paddingTop:5,paddingBottom:5}]}>
                    <Col>
                      <Text style={CustomStyle.billItem}>CASH EARNINGS</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}>&#8377;{total_earnings}</Text>
                    </Col>
                  </Row>
                </Grid>
              </CardItem>
              <Row style = {{borderTopWidth:1,borderTopColor: 'gainsboro',}}/>
              {/*<CardItem>
                <Grid style={CustomStyle.billContainer}>
                  <Row>
                    <Col>
                      <Text style={{marginBottom: 15}}>PAYMENTS MADE</Text>
                    </Col>
                    <Col>
                      <Text style={CustomStyle.billCost}>&#8377;</Text>
                    </Col>
                  </Row>
                </Grid>
              </CardItem>*/}
              </If>
            </Card>
          </View>
        </Content>
        <DriverFooter tab='home' navigation={this.props.navigation}/>
      </Container>
    )
  } 
  updateActive = (active) => {
    Request.post('/driver/set/active', {active})
    .then(res => {
      let user = this.props.auth.user;
      user.driver.active = active;
      AuthActions.setUser(user)
    })
  }
}

const CustomStyle = StyleSheet.create({
  billContainer: {
    padding: 10,
  },
  billContainer2: {
    color: '#ffa500',
    alignItems: 'center',
  },
  billItem: {

  },
  header:{
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  billCost: {
    fontWeight: '500',
    alignSelf: 'flex-end',
  },
  cardstyle: {
    marginLeft:5,
    marginRight:5,
    elevation: 5,
    marginBottom: 2,
  },
})

function mapStateToProps(state) {
  return {
    auth: state.auth,
    shop: state.shop,
  };
}

export default connect(mapStateToProps)(DriverMain);
