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

import Task from './Task';

class DriverTasks extends Component {
  componentDidMount() {
    DriverActions.init(this);
    DriverActions.updateLocation();
  }
  render() {
    let driver = this.props.driver;
    let navigation = this.props.navigation;
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
                data={driver.active_orders}
                renderItem={({item, index}) => {
                  return <Task order={item} navigation={navigation}/>
                }}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={this.renderEmptyComponent.bind(this)}
                />
            </Else>
          </If>
        </Content>
        <DriverFooter tab='tasks' navigation={this.props.navigation}/>
      </Container>
    )
  }
  renderEmptyComponent() {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No tasks available</Text>
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
