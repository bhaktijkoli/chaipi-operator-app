import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { Root, StyleProvider } from 'native-base';
import firebase from 'react-native-firebase';
import type { Notification, RemoteMessage } from 'react-native-firebase';
import store from "./app/store";
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

import Login from './app/screens/Login/Login';
import OTPVerify from './app/screens/OTPVerify/OTPVerify';
import Logout from './app/screens/Login/Logout';
import NotAMember from './app/screens/NotAMember/NotAMember';
import WaitingApproval from './app/screens/WaitingApproval/WaitingApproval';
import RegisterShop from './app/screens/RegisterShop/RegisterShop';
import ShopAddress from './app/screens/ShopAddress/ShopAddress';
import Home from './app/screens/Home/Home';
import Account from './app/screens/Account/Account';
import ShopMain from './app/screens/ShopMain/ShopMain';
import ShopOrders from './app/screens/ShopOrders/ShopOrders';
import ShopOrderDetails from './app/screens/ShopOrderDetails/ShopOrderDetails';
import ShopMenu from './app/screens/ShopMenu/ShopMenu';
import ShopAddItem from './app/screens/ShopAddItem/ShopAddItem';
import DriverMain from './app/screens/DriverMain/DriverMain';
import DriverTasks from './app/screens/DriverTasks/DriverTasks';

class App extends Component {
  async componentDidMount() {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      firebase.messaging().requestPermission()
      .then(() => {
        console.log("Authorized");
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
          console.log("Notification displayed");
          // Process your notification as required
          // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
          console.log("Notification recieved");
          console.log(notification);
          // Process your notification as required
        });
        this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
          console.log("Remote message recieved");
          console.log(message);
        });
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      // user doesn't have a device token yet
    }
  }
  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
  }
  render() {
    return(
      <Root>
        <StyleProvider style={getTheme(commonColor)}>
          <Provider store={store}>
            <AppContainer />
          </Provider>
        </StyleProvider>
      </Root>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Logout: { screen: Logout },
    OTPVerify: { screen: OTPVerify },
    NotAMember: { screen: NotAMember },
    WaitingApproval: { screen: WaitingApproval },
    RegisterShop: { screen: RegisterShop },
    ShopAddress: { screen: ShopAddress },
    Home: { screen: Home },
    Account: { screen: Account },
    ShopMain: { screen: ShopMain },
    ShopOrders: { screen: ShopOrders },
    ShopOrderDetails: { screen: ShopOrderDetails },
    ShopMenu: { screen: ShopMenu },
    ShopAddItem: { screen: ShopAddItem },
    DriverMain: { screen: DriverMain },
    DriverTasks: { screen: DriverTasks },
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer =  createAppContainer(AppNavigator);
export default App;
