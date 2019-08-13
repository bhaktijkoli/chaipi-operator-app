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
    let ordersArray = [];
    ordersArray.push({label: 'Active Orders'});
    if(this.props.shop.active_orders.length > 0) {
      ordersArray = ordersArray.concat(this.props.shop.active_orders);
    } else {
      ordersArray.push({empty:true, text: "You don't have any active orderrs"});
    }
    if(this.props.shop.recent_orders.length > 0) {
      ordersArray.push({label: 'Recent Orders'});
      ordersArray = ordersArray.concat(this.props.shop.recent_orders);
    }
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
                  data={ordersArray}
                  renderItem={({item, index}) => {
                    if(item.label) {
                      return this.renderListTitle(item.label)
                    } else if(item.empty) {
                      return this.renderListEmptyText(item.text)
                    } else {
                      return <Order order={item} navigation={this.props.navigation} update={this.update.bind(this)}/>
                    }
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  />
              </Else>
            </If>
          </Content>
        </Content>
        <ShopFooter tab='orders' navigation={this.props.navigation}/>
      </Container>
    )
  }
  renderListTitle = (title) => {
    return(
      <Text style={[Style.heading]}>{title}</Text>
    )
  }
  renderListEmptyText = (text) => {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 30, paddingBottom: 30}}>
        <Text>{text}</Text>
      </View>
    )
  }
  getShopOders() {
    this.setState({loading: true})
    shopActions.getShopOders(() => {
      this.setState({oading: false});
    });
  }
  update() {
    shopActions.getActiveShopOrders()
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    shop: state.shop,
  };
}

export default connect(mapStateToProps)(ShopOrders);
