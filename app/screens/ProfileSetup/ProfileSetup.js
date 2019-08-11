import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, View, Text, Button} from 'native-base';
import { Form, Item, Input } from 'native-base';
import { H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import ButtonEx from './../../components/Button';

import Request from './../../utils/request';
import Style from './../../styles/style';
import AuthActions from './../../actions/authActions';
import NavigationActions from './../../actions/navigationActions';

class ProfileSetup extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      process: false,
    }
    this.onClickNext = this.onClickNext.bind(this)
    this.onClickLogout = this.onClickLogout.bind(this)
  }
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Grid style={{alignItems: 'flex-end'}}>
            <Col style={Style.content}>
              <Form style={Style.bottom}>
                <H1 style={Style.heading}>Welcome</H1>
                <Text style={Style.label}>Setup your profile</Text>
                <Item style={Style.input}>
                  <Input
                    value={this.state.fullname}
                    onChangeText={val=>this.setState({fullname: val})}
                    placeholder='Enter fullname' />
                </Item>
                <ButtonEx onPress={this.onClickNext} loading={this.state.process} text="NEXT"/>
                <Button transparent block onPress={this.onClickLogout}>
                  <Text>Logout</Text>
                </Button>
              </Form>
            </Col>
          </Grid>
        </Content>
      </Container>
    )
  }
  onClickNext() {
    this.setState({process: true});
    let data = {
      uid: this.props.auth.uid,
      fullname: this.state.fullname,
    };
    Request.post('/user/add', data)
    .then(res => {
      Request.get('/user/get/'+this.props.auth.uid)
      .then(res => {
        AuthActions.setUser(res.data);
        NavigationActions.resetNavigation(this, 'Login');
      })
    })
    .catch(err => console.error(err))
    .finally(()=> this.setState({process: false}))
  }
  onClickLogout() {
    this.props.navigation.navigate("Logout");
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ProfileSetup);
