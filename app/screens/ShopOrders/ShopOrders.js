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
import ws from './../../utils/ws';
import shopActions from './../../actions/shopActions';

import Order from './Order';


class ShopOrders extends Component {
  state = {
    loading: false,
  }
  constructor(props) {
    super(props)
    shopActions.init(this);
  }
  render() {
    return(
      <Container>
        <HeaderEx title="Your Orders"/>
        <Content contentContainerStyle={{flex: 1}}>
          <Content contentContainerStyle={{flex: 1}}>
            <If condition={this.state.loading}>
              <Then>
                <SpinnerBox />
              </Then>
              <Else>
                <FlatList
                  data={this.props.shop.active_orders}
                  renderItem={({item, index}) => {
                    return <Order order={item} navigation={this.props.navigation} update={this.update.bind(this)}/>
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  ListHeaderComponent={this.renderActiveOrdersHeader.bind(this)}
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
  renderActiveOrdersHeader() {
    return(
      <Text style={[Style.heading]}>Active Orders</Text>
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
    shopActions.getShopOders(this, () => {
      this.setState({oading: false});
    });
  }
  update() {
    shopActions.getActiveOrders(this)
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    shop: state.shop,
  };
}

export default connect(mapStateToProps)(ShopOrders);
