import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import HeaderEx from './../../components/Header2';

import ShopFooter from './../../components/ShopFooter';

import shopActions from './../../actions/shopActions';
import ws from './../../utils/ws';

class ShopOrderDetails extends Component {
  componentDidMount() {
    ws.init(this);
  }
  render() {
    let order = this.props.navigation.getParam('order');
    console.log(order);
    return(
      <Container>
        <HeaderEx title={'#'+order.trackid}/>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    shop: state.shop,
  };
}

export default connect(mapStateToProps)(ShopOrderDetails);
