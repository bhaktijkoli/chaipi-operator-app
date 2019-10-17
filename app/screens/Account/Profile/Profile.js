import React, { Component } from 'react';
import { connect } from "react-redux";
import { TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Text, View } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

const ImagePicker = require('react-native-image-picker');

import Style from './../../../styles/style';
import Request from './../../../utils/request';
import Header2 from './../../../components/Header2';
import ButtonEx from './../../../components/Button';

import AuthActions from './../../../actions/authActions';
import NavigationActions from './../../../actions/navigationActions';
import { If, Then, Else } from 'react-if';

class Profile extends Component {
    constructor(props) {
      super(props)
      this.state = {
        fullname: this.props.auth.user.fullname,
        email: this.props.auth.user.email,
        phone: this.props.auth.phone,
        process: false,
        fullname_error: '',
        email_error: '',
        phone_error: '',
        image: null,
      }
    }
    render() {
      return(
        <Container>
        <Header2 title="Your Profile"/>
        <ScrollView>
          <Grid style={{alignItems: 'flex-end'}}>
            <Col style={Style.content}>
              <Form style={Style.bottom}>
                {/*<Text style={Style.label}>Edit your profile</Text>*/}
                <View style={[Style.avatarContainer, {marginTop: 20}]}>
                <Image source={{uri: Request.url(this.props.auth.user.image)}} style={Style.avatarBig}/>
                  {/*<If condition={this.state.image==null}>
                    <Then>
                      <TouchableOpacity activeOpacity = { .5 } onPress={this.changeImage.bind(this)}>
                        <Image source={{uri: Request.url(this.props.auth.user.image)}} style={Style.avatarBig} onPress={this.changeImage.bind(this)}/>
                      </TouchableOpacity>
                    </Then>
                    <Else>
                      <TouchableOpacity activeOpacity = { .5 } onPress={this.changeImage.bind(this)}>
                        <Image source={this.state.image} style={Style.avatarBig} onPress={this.changeImage.bind(this)}/>
                      </TouchableOpacity>
                    </Else>
                  </If>*/}
                </View>
                <Item style={Style.input}>
                  <Input
                    value={this.state.fullname}
                    //onChangeText={val=>this.setState({fullname: val})}
                    //placeholder='Enter fullname' 
                    />
                </Item>
                {/*<If condition={this.state.fullname_error.length > 0}>
                  <Text style={Style.error}>{this.state.fullname_error}</Text>
                </If>*/}
                {/*<Item style = {Style.input}>
                  <Input
                    value ={this.state.email}
                    onChangeText={val=>this.setState({email: val})}
                    placeholder='Enter email address'
                    />
              </Item>*/}
                {/*<If condition={this.state.email_error.length > 0}>
                  <Text style={Style.error}>{this.state.email_error}</Text>
                </If>*/}
                <Item style = {Style.input}>
                  <Input
                    value ={this.state.phone}
                    //onChangeText={val=>this.setState({phone: val})}
                    //placeholder='Enter phone number'
                    />
              </Item>
                {/*<If condition={this.state. phone_error.length > 0}>
                  <Text style={Style.error}>{this.state. phone_error}</Text>
                </If>*/}
                {/*<ButtonEx onPress={this.onClickNext} loading={this.state.process} text="SAVE"/>*/}
              </Form>
            </Col>
          </Grid>
        </ScrollView>
      </Container>
      )
    }
    /*onClickSave = () => {
      this.setState({process: true});
      Request.post('/user/update/fullname', {fullname: this.state.fullname})
      .then(res => {
        this.setState({process: false});
        this.props.navigation.navigate('Home');
      })
      .catch(err => console.error(err))
    }*/

    /*onClickNext() {
      this.setState({process: true});
      let data = new FormData();
      data.append('uid', this.props.auth.uid)
      data.append('fullname', this.state.fullname)
      data.append('email', this.state.email)
      data.append('image', this.state.image)
      Request.post('/user/update', data)
      .then(res => {
        if(res.data.success) {
          Request.get('/user/get/'+this.props.auth.uid)
          .then(res => {
            AuthActions.setUser(res.data);
            NavigationActions.resetNavigation(this, 'Home');
          })
        } else {
          let messages = res.data.messages;
          Object.keys(messages).forEach(el => {
            var key = el+'_error';
            this.setState({[key]: messages[el]})
          });
          this.setState({process: false});
        }
      })
      .catch(err => console.error(err))
    }*/

    /*changeImage() {
      ImagePicker.default.showImagePicker(profileImageOptions, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
        } else {
          const source = { uri: response.uri };
          this.setState({
            image: { uri: response.uri, name: response.fileName, type: response.type },
          });
        }
      });
    }*/
  }
  
  function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }
  
  export default connect(mapStateToProps)(Profile);
  