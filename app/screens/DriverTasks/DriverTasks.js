import React, { Component } from 'react';
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { Container, Content, View, Text, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { If, Else, Then } from 'react-if';

import HeaderEx from './../../components/Header';
import SpinnerBox from './../../components/SpinnerBox';

import DriverFooter from './../../components/DriverFooter';

import Request from './../../utils/request';

import Task from './Task';

class DriverTasks extends Component {
  state = {
    loading: false,
    orders: [],
  }
  componentDidMount() {
    this.getAvailableTasks();
  }
  render() {
    return(
      <Container>
        <HeaderEx title="Your Tasks"/>
        <Content contentContainerStyle={{flex: 1}}>
          <If condition={this.state.loading}>
            <Then>
              <SpinnerBox />
            </Then>
            <Else>
              <FlatList
                data={this.state.orders}
                renderItem={({item, index}) => {
                  return <Task task={item}/>
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
  getAvailableTasks() {
    this.setState({loading: true})
    Request.get('/order/get')
    .then(res => {
      console.log(res.data);
      this.setState({orders: res.data, loading: false})
    })
    .catch(err => console.error(err));
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(DriverTasks);
