import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content } from 'native-base';

import Style from './../../styles/style';

import Shop from './../../actions/shopActions';

import HeaderEx from './../../components/Header2'

import ShopAddItemForm from './ShopAddItemForm'

class ShopAddItem extends Component {
  render() {
    return(
      <Container>
        <HeaderEx title="Add item"/>
        <Content contentContainerStyle={{flex: 1}}>
          <ShopAddItemForm auth={this.props.auth} navigation={this.props.navigation} update={this.update.bind(this)}/>
        </Content>
      </Container>
    )
  }
  update() {
    Shop.getShopProducts(this.props.auth.shop.id)
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ShopAddItem);
