import { StackActions, NavigationActions } from 'react-navigation';

module.exports.homeAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

module.exports.loginAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

module.exports.setupAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'NotAMember' })],
});

module.exports.waitingAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'WaitingApproval' })],
});

module.exports.shopAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'ShopMain' })],
});

module.exports.driverAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'DriverMain' })],
});

module.exports.resetNavigation = (component, routeName) => {
  component.props.navigation.dispatch(StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
  }));
}
