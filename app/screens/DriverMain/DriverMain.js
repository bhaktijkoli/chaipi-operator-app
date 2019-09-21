import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { FlatList, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Container, Content, View, Title, Card, CardItem, Text, Icon } from 'native-base';


import Header3 from './../../components/Header3';
import DriverFooter from './../../components/DriverFooter';

import DriverActions from './../../actions/driverActions';

class DriverMain extends Component {
  componentDidMount() {
    DriverActions.init(this);
    DriverActions.updateLocation();
  }
  render() {
    return(
      <Container>
        <Header3/>
        <Content>
          <Card>
            <Title style= {[{alignSelf: 'center'}]}>Active</Title>
            <Text style = {[{alignSelf: 'center'}]}>6</Text>
            <Title style= {[{alignSelf: 'center'}]}>Inactive</Title>
            <Text style = {[{alignSelf: 'center'}]}>6</Text>
          </Card>
          <Card>
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
          <Card>
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
                <Text style={CustomStyle.billItem}>TOTAL EARNINGS</Text>
              </Col>
              <Col>
                <Text style={CustomStyle.billCost}>&#8377;</Text>
              </Col>
            </Row>
            <Row style={[Style.upperBorder, {paddingTop:5,paddingBottom:5}]}>
              <Col>
                <Text style={CustomStyle.billItem}>CASH COLLECTED</Text>
              </Col>
              <Col>
                <Text style={CustomStyle.billCost}>&#8377;</Text>
              </Col>
            </Row>
            <Row style={[Style.upperBorder, {paddingTop:5,paddingBottom:5}]}>
              <Col>
                <Text style={CustomStyle.billItem}>CASH DEPOSITED</Text>
              </Col>
              <Col>
                <Text style={CustomStyle.billCost}>&#8377;</Text>
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
        </Content>
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
  checkoutContainer: {
    borderTopWidth: 0.2,
    padding: 15,
    borderColor: '#000'
  },
  addressModalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0000000d'
  },
  addressModal: {
    marginTop: 200,
    backgroundColor: 'white',
    height: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  }
})

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(DriverMain);
