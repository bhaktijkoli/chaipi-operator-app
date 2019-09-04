import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, View, Text, Button} from 'native-base';
import { Form, Item, Input, Label, Icon } from 'native-base';
import { H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TouchableOpacity, Image, ScrollView } from 'react-native';

import ButtonEx from '../../../components/Button';

const ImagePicker = require('react-native-image-picker');

import Request from '../../../utils/request';
import Style from '../../../styles/style';
import AuthActions from '../../../actions/authActions';
import NavigationActions from '../../../actions/navigationActions';
import { If, Then, Else } from 'react-if';

const profileImageOptions = {
  title: 'Select Profile Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

class UpdateDriverForm extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      email: '',
      profileimage: null,
      licenseimage: null,
      fullname_error: '',
      email_error: '',
      process: false,
      imageLoading: false,
      number: '',
      licence: null,
      number_error: '',
      //licence_error: '',
    }
    this.onClickNext = this.onClickNext.bind(this)
  }
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <ScrollView>
            <Grid style={{alignItems: 'flex-end'}}>
              <Col style={Style.content}>
                <Form style={Style.bottom}>
                  <Text style={Style.label}>Setup your profile</Text>
                  <Item style={Style.input}>
                    <Input
                      value={this.state.fullname}
                      onChangeText={val=>this.setState({fullname: val})}
                      placeholder='Enter fullname' />
                  </Item>
                  <If condition={this.state.fullname_error.length > 0}>
                    <Text style={Style.error}>{this.state.fullname_error}</Text>
                  </If>
                  <Item style = {Style.input}>
                    <Input
                      value ={this.state.email}
                      onChangeText={val=>this.setState({email: val})}
                      placeholder='Enter email address'
                      />
                  </Item>
                  <If condition={this.state.email_error.length > 0}>
                    <Text style={Style.error}>{this.state.email_error}</Text>
                  </If>
                  <Item style = {Style.input}>
                      <Input
                      value = {this.state.number}
                      onChangeText={val=>this.setState({number: val})}
                      placeholder="Enter bike number"
                      ></Input>
                  </Item>
                  <If condition={this.state.number_error > 0}>
                    <Text style={Style.error}>{this.state.number_error}</Text>
                  </If>
                  <Text style = {[Style.label, {marginTop: 20}]}>Upload Profle Picture</Text>
                  <View style={[Style.input, {marginTop: 10}]}>
                    <If condition={this.state.profileimage==null}>
                      <Then>
                        <Button style={[Style.input]} bordered onPress={this.changeImage.bind(this)}>
                          <Icon name="pluscircleo" type="AntDesign" style={{fontSize:30}}/>
                        </Button>
                      </Then>
                      <Else>
                        <TouchableOpacity activeOpacity = { .5 } onPress={this.changeImage.bind(this)}>
                          <Image source={this.state.profileimage} style={{width:152, height:152, marginTop:10, marginBottom: 20}} onPress={this.changeImage.bind(this)}/>
                        </TouchableOpacity>
                      </Else>
                    </If>
                  </View>
                  <Text style = {[Style.label, {marginTop: 10}]}>Upload license</Text>
                  <View style={[Style.input, {marginTop: 10}]}>
                    <If condition={this.state.licenseimage==null}>
                      <Then>
                        <Button style={[Style.input]} bordered onPress={this.changeLicense.bind(this)}>
                          <Icon name="pluscircleo" type="AntDesign" style={{fontSize:30}}/>
                        </Button>
                      </Then>
                      <Else>
                        <TouchableOpacity activeOpacity = { .5 } onPress={this.changeLicense.bind(this)}>
                          <Image source={this.state.licenseimage} style={{width:152, height:152, marginTop:10, marginBottom: 20}} onPress={this.changeLicense.bind(this)}/>
                        </TouchableOpacity>
                      </Else>
                    </If>
                  </View>
                  <ButtonEx onPress={this.onClickNext} loading={this.state.process} text="NEXT"/>
                </Form>
              </Col>
            </Grid>
          </ScrollView>
        </Content>
      </Container>
    )
  }
  onClickNext() {
    this.setState({process: true});
    let data = new FormData();
    data.append('uid', this.props.auth.uid)
    data.append('fullname', this.state.fullname)
    data.append('email', this.state.email)
    data.append('profileimage', this.state.profileimage)
    data.append('licenseimage', this.state.licenseimage)
    data.append('number', this.state.number)
    Request.post('/user/add', data)
    .then(res => {
      if(res.data.success) {
        Request.get('/user/get/'+this.props.auth.uid)
        .then(res => {
          AuthActions.setUser(res.data);
          NavigationActions.resetNavigation(this, 'Login');
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
  }
  changeImage(){
    ImagePicker.showImagePicker(profileImageOptions, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = { uri: response.uri };
        this.setState({
          profileimage: { uri: response.uri, name: response.fileName, type: response.type },
        });
      }
    });
  }
  changeLicense() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = { uri: response.uri };
        this.setState({
          licenseimage: { uri: response.uri, name: response.fileName, type: response.type },
        });
      }
    });
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(UpdateDriverForm);
