import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Header3 from './../../components/Header3';

import ShopFooter from './../../components/ShopFooter';

import shopActions from './../../actions/shopActions';
import Fcm from './../../utils/fcm';

class Shop extends Component {
  constructor(props) {
    super(props)
    shopActions.init(this);
  }
  render() {
    return(
      <Container>
        <Header3/>
        <Content>
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
