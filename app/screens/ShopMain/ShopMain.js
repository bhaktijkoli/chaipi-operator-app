import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import HeaderEx from './../../components/Header';

import ShopFooter from './../../components/ShopFooter';

import shopActions from './../../actions/shopActions';
import ws from './../../utils/ws';

class Shop extends Component {
  componentDidMount() {
    shopActions.getActiveOrders(this);
    shopActions.getShopProducts(this, this.props.auth.shop.id);
    ws.init(this);
    ws.subscribeShop(this.props.auth.shop.id);
  }
  render() {
    return(
      <Container>
        <HeaderEx title="Home"/>
        <Content contentContainerStyle={{flex: 1}}>

        </Content>
        <ShopFooter tab='home' navigation={this.props.navigation}/>
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

export default connect(mapStateToProps)(Shop);
