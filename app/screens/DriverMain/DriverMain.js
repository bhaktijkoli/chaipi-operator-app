import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Header3 from './../../components/Header3';
import DriverFooter from './../../components/DriverFooter';

import DriverActions from './../../actions/driverActions';

class DriverMain extends Component {
  componentDidMount() {
    DriverActions.init(this);
    DriverActions.updateLocation();
  }
  render() {
    return(
      <Container>
        <Header3/>
        <Content>
        </Content>
        <DriverFooter tab='home' navigation={this.props.navigation}/>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(DriverMain);
