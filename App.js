import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { Root, StyleProvider } from 'native-base';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import store from "./app/store";
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

import Login from './app/screens/Login/Login';
import OTPVerify from './app/screens/OTPVerify/OTPVerify';
import ProfileSetup from './app/screens/ProfileSetup/ProfileSetup';
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

import fcm from './app/utils/fcm'

class App extends Component {
  async componentDidMount() {
    fcm.init();
    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      console.log("App opended by notification");
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      console.log(notification);
    }
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
    ProfileSetup: { screen: ProfileSetup },
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
