import React from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { Root, StyleProvider } from 'native-base';
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
import ShopMenu from './app/screens/ShopMenu/ShopMenu';
import ShopAddItem from './app/screens/ShopAddItem/ShopAddItem';
import DriverMain from './app/screens/DriverMain/DriverMain';
import DriverTasks from './app/screens/DriverTasks/DriverTasks';

const App = () => {
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
