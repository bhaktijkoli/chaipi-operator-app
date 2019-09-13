import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'native-base';
import { View, Form, Item, Label,Content, Text, Card, Input, Textarea, Icon, Button, Toast, Container, CardItem, Body, Right } from 'native-base';

import { Linking } from 'react-native';
import Header2 from './../../components/Header2';
import { StyleSheet } from 'react-native';
import Style from './../../styles/style';
import Request from './../../utils/request';
import { ScrollView } from 'react-native-gesture-handler';
import style from './../../styles/style';
import Policy from './../../data/Policy';

 
class PrivacyPolicyForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Policy: require('./../../data/Policy.json'),
    }
  }


    render() {
        return (
          <View>
            {this.policy()}
          </View>
           /* <Container>
        <Content>
          <ScrollView>
              <Text style = {{fontSize: 20}}>Intoduction</Text>
              <Text style = {CustomStyle.pad}>When you use ChaiPi, you trust us with your information. We are committed to keeping that trust. That starts with helping you understand our privacy practices.
              This policy describes the information we collect, how it is used and shared, and your choices regarding this information. </Text>
              <Text style = {CustomStyle.fp}>Data Collections And Uses</Text>
              <View
              style = {{
                borderBottomColor: 'gainsboro',
                borderBottomWidth: 1,
                paddingTop: 10,
              }}
              ></View>
              <Text style = {CustomStyle.fp}>Scope</Text>
              <Text style = {CustomStyle.fp}>SUMMARY</Text>
              <Text style = {CustomStyle.pad}>This policy applies to users of ChaiPi's services anywhere in the world, including users of ChaiPi's apps, websites, features or other services.</Text>
              <Text style = {CustomStyle.pad}>
                This policy describes how ChaiPi and its affiliates collect and use personal information to provide our services. This policy applies to all users of our apps, websites, features or other services anywhere in the world, unless covered by a separate privacy policy such as the <Text style = {CustomStyle.hyperlink} onPress = {() => Linking.openURL('http://google.com')}>
              ChaiPi Freight Privacy Policy.
              </Text>
              <Text style = {CustomStyle.pad}>This policy specifically applies to:</Text>
              </Text>
              <Text style= {CustomStyle.pad}>{'\u2022'} Riders: users who request or receive transportation</Text>
              <Text>{'\u2022'} Drivers: users who provide transportation individually or through partner transportation companies</Text>
              <Text>{'\u2022'} Delivery Recipients: users who request deliveries of food or other items</Text>
              <Text>{'\u2022'} Delivery Partners: users who provide delivery services</Text>
              <Text style= {CustomStyle.pad}>This policy also applies to those who provide information to Uber in connection with an application to use our services, or whose information Uber otherwise receives in connection with its services (such as contact information of individuals associated with UberEats restaurant partners). All those subject to this policy are referred to as “users” for purposes of this policy.</Text>
              <Text>Th1e practices described in this policy are subject to applicable laws in the places in which we operate. This means that we only engage in the practices described in this policy in a particular country or region if permitted under the laws of those places. Please contact us if you have questions on our practices in your country or region.</Text>
              <View
              style = {{
                borderBottomColor: 'gainsboro',
                borderBottomWidth: 1,
                paddingTop: 10,
              }}
              ></View>
            </ScrollView>
        </Content>
      </Container>*/
        )
     }

     policy(){
      return Policy.map(function(options, i){
        return(
          <View key = {i}>
            <Text>{options.title}</Text>
            <Text >{options.description}</Text>
          </View>
        );
      });
    }
}


export default PrivacyPolicyForm;