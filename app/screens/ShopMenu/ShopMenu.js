import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { Container, Content, View, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import HeaderEx from './../../components/Header'

import ShopFooter from './../../components/ShopFooter'
import Request from './../../utils/request';
import authActions from './../../actions/authActions';

import MenuItem from './MenuItem';

class ShopMenu extends Component {
  render() {
    return(
      <Container>
        <HeaderEx title="Shop Menu"/>
        <Content contentContainerStyle={{flex: 1}}>
          <FlatList
            data={this.props.auth.products}
            renderItem={({item, index}) => {
              return <MenuItem item={item} update={this.update.bind(this)}/>
            }}
            keyExtractor={(item, index) => index.toString()}
            >
          </FlatList>
        </Content>
        <ShopFooter tab='menu' navigation={this.props.navigation}/>
      </Container>
    )
  }
  update() {
    authActions.getShopProducts(this, this.props.auth.shop.id)
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ShopMenu);
