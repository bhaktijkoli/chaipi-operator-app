import Request from './../utils/request';
import store from './../store';

module.exports.setUser = (data) => {
  store.dispatch({type: 'AUTH_SET_USER', payload: data})
  if(data.shop) {
    store.dispatch({type: 'AUTH_SET_SHOP', payload: data})
  }
}

module.exports.setUserUID = (data) => {
  store.dispatch({type: 'AUTH_SET_UID', payload: data})
}

module.exports.hasAskedForPermissions = async () => {
  const value = await AsyncStorage.getItem('ASKED_FOR_PERMISSIONS');
  if(value == null) {
    return false;
  }
  return true;
}
module.exports.setAskForPermissions = async () => {
  await AsyncStorage.setItem('ASKED_FOR_PERMISSIONS', 'yes');
  return true;
}
