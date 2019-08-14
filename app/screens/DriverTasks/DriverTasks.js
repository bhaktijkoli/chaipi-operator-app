import React, { Component } from 'react';
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { Container, Content, View, Text, Title } from 'native-base';
import { If, Else, Then } from 'react-if';

import HeaderEx from './../../components/Header';
import SpinnerBox from './../../components/SpinnerBox';

import DriverFooter from './../../components/DriverFooter';

import Request from './../../utils/request';
import DriverActions from './../../actions/driverActions';

import Style from './../../styles/style';

import Task from './Task';

class DriverTasks extends Component {
  componentDidMount() {
    DriverActions.init(this);
  }
  render() {
    let driver = this.props.driver;
    let navigation = this.props.navigation;
    let ordersArray = [];
    ordersArray.push({label: 'Active Tasks'});
    if(driver.active_orders.length > 0) {
      ordersArray = ordersArray.concat(driver.active_orders)
    } else {
      ordersArray.push({empty:true, text: "You don't have any active orderrs"});
    }
    if(driver.recent_orders.length > 0) {
      ordersArray.push({label: 'Recent Tasks'});
      ordersArray = ordersArray.concat(driver.recent_orders);
    }
    return(
      <Container>
        <HeaderEx title="Your Tasks"/>
        <Content contentContainerStyle={{flex: 1}}>
          <If condition={driver.loading}>
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
                    return <Task order={item} navigation={navigation}/>
                  }
                }}
                keyExtractor={(item, index) => index.toString()}
                />
            </Else>
          </If>
        </Content>
        <DriverFooter tab='tasks' navigation={this.props.navigation}/>
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
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    driver: state.driver,
  };
}

export default connect(mapStateToProps)(DriverTasks);
