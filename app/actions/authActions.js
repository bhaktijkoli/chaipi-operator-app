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
