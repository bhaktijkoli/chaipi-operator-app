import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { Container, Content, View, Text, Title } from 'native-base';
import { If, Else, Then } from 'react-if';

import HeaderEx from './../../components/Header';
import ShopFooter from './../../components/ShopFooter';
import SpinnerBox from './../../components/SpinnerBox';

import Style from './../../styles/style';
import Request from './../../utils/request';

import Order from './Order';

class ShopOrders extends Component {
  state = {
    orders: [],
    loading: false,
  }
  componentDidMount() {
    this.getShopOders();
  }
  render() {
    return(
      <Container>
        <HeaderEx title="Orders"/>
        <Content contentContainerStyle={{flex: 1}}>
          <Content contentContainerStyle={{flex: 1}}>
            <If condition={this.state.loading}>
              <Then>
                <SpinnerBox />
              </Then>
              <Else>
                <FlatList
                  data={this.state.orders}
                  renderItem={({item, index}) => {
                    return <Order order={item}/>
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={this.renderEmptyComponent.bind(this)}
                  />
              </Else>
            </If>
          </Content>
        </Content>
        <ShopFooter tab='orders' navigation={this.props.navigation}/>
      </Container>
    )
  }
  renderEmptyComponent() {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No orders available</Text>
      </View>
    )
  }
  getShopOders() {
    this.setState({loading: true})
    Request.get('/order/get/shop')
    .then(res => {
      console.log(res.data);
      this.setState({orders: res.data, loading: false});
    }).catch(err => console.error(err));
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ShopOrders);
