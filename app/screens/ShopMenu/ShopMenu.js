import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { Container, Content, View, Text, Title, Button, Icon } from 'native-base';
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
            ListEmptyComponent={this.renderEmptyComponent.bind(this)}
            ListFooterComponent={this.renderFooterComponent.bind(this)}
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
  renderEmptyComponent() {
    return(
      <View style={{paddingLeft:20, paddingRight:20, paddingTop: 50, paddingBottom: 50, alignItems: 'center'}}>
        <Text>Your shop menu is empty.</Text>
      </View>
    )
  }
  renderFooterComponent() {
    return(
      <View>
        <Button block bordered style={{margin:10}} onPress={e=>this.props.navigation.navigate('ShopAddItem')}>
          <Icon name="plus" type="Entypo"/>
        </Button>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ShopMenu);
