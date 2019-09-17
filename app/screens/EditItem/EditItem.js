import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content } from 'native-base';

import Style from '../../styles/style';

import Shop from '../../actions/shopActions';

import HeaderEx from '../../components/Header2'

import EditItemForm from './EditItemForm'

class EditItem extends Component {
  render() {
    return(
      <Container>
        <HeaderEx title="Add item"/>
        <Content contentContainerStyle={{flex: 1}}>
          <EditItemForm auth={this.props.auth} navigation={this.props.navigation}/>
        </Content>
      </Container>
    )
  }

}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(EditItem);
