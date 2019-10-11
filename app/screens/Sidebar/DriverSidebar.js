import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title, Text} from 'native-base';
import { Header, Left, Body, Right, Icon } from 'native-base';
import { List, ListItem } from 'native-base';
import { If, Else, Then } from 'react-if'
import { Image, StyleSheet } from 'react-native';

import ShopFooter from './../../components/ShopFooter'
import DriverFooter from './../../components/DriverFooter'

import Style from './../../styles/style';
import Request from './../../utils/request';
import ImageResizing from '../../utils/ImageResizing/ImageResizer';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

let imageResizerObj = new ImageResizing();

class DriverSidebar extends Component {
  componentDidMount() {
  }
  render() {
    let user = this.props.auth.user;
    let phone = this.props.auth.phone;
    let shop = this.props.auth.shop;
    let image = this.props.auth.user.image;
    return(
      <Container>
        <Content>
            <ScrollView>
              <View style={{marginTop:50, marginBottom: 10}}>
            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 20}}>
                <Image source={{uri: Request.url(image)}} style={Style.avatar}/>
                {/*<Image source={{uri: Request.url(image)}} style={{ flex: 1,width: 200,height: 200, resizeMode: 'contain'}}/>*/}
            </View>
              {/*<View style={CustomStyle.mainContainer}>
                <Image resizeMode={'contain'} style={CustomStyle.img} source={{uri: Request.url(image)}}></Image>
  </View>*/}
                <Text style={{marginLeft:15,color:'#000'}}>{user.fullname.toUpperCase()}</Text>
                <Text style={{marginLeft:15,color:'#000'}}>{phone}</Text>
              </View>
          <List>
            <ListItem itemDivider>
              <Text>My Account</Text>
            </ListItem>
            {this.renderSettingItems(accountItems)}
            <ListItem itemDivider>
              <Text>Help</Text>
            </ListItem>
            {this.renderSettingItems(helpItems)}
          </List>
          </ScrollView>
        </Content>
      </Container>
    )
  }
  renderSettingItems(arrayItems, condition=true) {
    if(condition) {
      return arrayItems.map((el, key) => {
        return(
          <ListItem key={key} onPress={e=>this.onClickListItem(el.route)}>
            <Left>
              <Icon name={el.icon} type={el.type}/>
            </Left>
            <Body style={{flex:6}}>
              <Text>{el.name}</Text>
            </Body>
          </ListItem>
        )
      })
    }
    else {
      return null;
    }
  }
  onClickListItem(route) {
    this.props.navigation.navigate(route);
  }
}

const CustomStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
},
img:{
  height:imageResizerObj.getHeight(800),
  width:imageResizerObj.getWidth(3000),
  marginLeft:imageResizerObj.getWidth(5),
  marginRight:imageResizerObj.getWidth(5),
  borderRadius: 500,
}
})

const accountItems = [
  {name: 'Profile', icon: 'user', route: 'Profile', type: 'AntDesign'},
  //{name: 'Payment', icon: 'creditcard', route: 'Home', type: 'AntDesign'},
  //{name: 'Update Profile', icon: '', route: 'UpdateDriver', type: 'AntDesign'},
  //{name: 'App Settings', icon: 'setting', route: 'Home', type: 'AntDesign'},
  {name: 'Logout', icon: 'logout', route: 'Logout', type: 'AntDesign'},
];

/*const shopManagementItems = [
  {name: 'Shop', icon: 'shop', route: 'Home', type: 'Entypo'},
  {name: 'Products', icon: 'profile', route: 'Home', type: 'AntDesign'},
];*/

const helpItems = [
  {name: 'AboutUs', icon: 'infocirlceo', route: 'About', type: 'AntDesign'},
  {name: 'ContactUs', icon: 'contacts', route: 'Contactus', type: 'AntDesign'},
  //{name: 'Help', icon: 'questioncircleo', route: 'Help', type: 'AntDesign'},
]

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(DriverSidebar);
