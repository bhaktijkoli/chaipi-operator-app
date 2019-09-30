import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList, StyleSheet, Image, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, View, Title, Card, CardItem, Text, Icon } from 'native-base';

import Header3 from './../../components/Header3';
import Chart from './../../components/Chart';
import Auth from './../../actions/authActions';

import ShopFooter from './../../components/ShopFooter';

import shopActions from './../../actions/shopActions';
import Request from './../../utils/request';
import { Col, Row, Grid } from "react-native-easy-grid";
import { If, Then, Else } from 'react-if';

import Style from './../../styles/style';

class Shop extends Component {
  state = {
    data: null,
    layoutOpen: false,
  }
  constructor(props) {
    super(props)
    shopActions.init(this);
  }
  componentDidMount() {
    Request.get('/shop/info')
    .then(res => {
      console.log("Shop Info", res.data);
      this.setState({data:res.data});
    });
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
            <Card style = {CustomStyle.cardstyle}>
                <Title style= {{alignSelf: 'center'}}>Active</Title>
                <Text style = {{alignSelf: 'center'}}>6</Text>
                <Title style= {{alignSelf: 'center'}}>Inactive</Title>
                <Text style = {{alignSelf: 'center'}}>6</Text>
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
              <CardItem>
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
              </CardItem>
            </Card>
          </View>
        </Content>
        <ShopFooter tab='home' navigation={this.props.navigation}/>
      </Container>
    )
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
    marginBottom:2,
  }
})

function mapStateToProps(state) {
  return {
    auth: state.auth,
    shop: state.shop,
  };
}

export default connect(mapStateToProps)(Shop);
