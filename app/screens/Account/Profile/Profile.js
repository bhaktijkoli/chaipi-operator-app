import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView } from 'react-native';
import { Container, Content, Form, Item, Label, Input } from 'native-base';

import Style from './../../../styles/style';
import Request from './../../../utils/request';
import Header2 from './../../../components/Header2';

class Profile extends Component {
    constructor(props) {
      super(props)
      this.state = {
        fullname: this.props.auth.user.fullname,
        email: this.props.auth.user.email,
        phone: this.props.auth.user.phone,
        process: false,
      }
    }
    render() {
      return(
        <Container>
          <Header2 title="Your Profile"/>
            <Form style={Style.content}>
              <Label>Fullname</Label>
              <Item regular style={Style.input}>
                <Input value={this.state.fullname} onChangeText={fullname => this.setState({fullname})}/>
              </Item>
              <Label>Email</Label>
              <Item regular style={Style.input}>
                <Input value={this.state.email} onChangeText={email => this.setState({email})}/>
              </Item>
              <Label>Mobile Number</Label>
              <Item regular style={Style.input}>
                <Input value={this.state.phone} onChangeText={email => this.setState({phone})}/>
              </Item>
              <ButtonEx onPress={this.onClickSave} loading={this.state.process} text="SAVE"/>
            </Form>
        </Container>
      )
    }
    onClickSave = () => {
      this.setState({process: true});
      Request.post('/user/update/fullname', {fullname: this.state.fullname})
      .then(res => {
        this.setState({process: false});
        this.props.navigation.navigate('Home');
      })
      .catch(err => console.error(err))
    }
  }
  
  function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }
  
  export default connect(mapStateToProps)(Profile);
  