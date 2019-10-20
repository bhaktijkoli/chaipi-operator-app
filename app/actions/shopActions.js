import BackgroundTimer from 'react-native-background-timer';
import Request from './../utils/request';
import store from './../store';

getActiveShopOrders = () => {
  Request.get('/order/get/shop/?active=1')
  .then(res => {
    store.dispatch({type: 'SHOP_SET_ACTIVE_ORDERS', payload: res.data})
  })
  .catch(err => console.error(err));
}

getRecentShopOrders = () => {
  Request.get('/order/get/shop/')
  .then(res => {
    store.dispatch({type: 'SHOP_SET_RECENT_ORDERS', payload: res.data})
  })
  .catch(err => console.error(err));
}

getShopProducts = (shopid) => {
  Request.get('/product/get?shop=' + shopid)
  .then(res => {
    store.dispatch({type: 'SHOP_SET_PRODUCTS', payload: res.data})
  })
  .catch(err => console.error(err));
}


setShopActive = () => {
  BackgroundTimer.runBackgroundTimer(() => {
    Request.post('/shop/set/active');
  },
  1*60000);
}

module.exports.getActiveShopOrders = getActiveShopOrders;
module.exports.getShopProducts = getShopProducts;
module.exports.setShopActive = setShopActive;

module.exports.init = (component) => {
  if(!component.props.shop.loaded) {
    getShopProducts(component.props.auth.shop.id);
    getActiveShopOrders();
    getRecentShopOrders();
    setShopActive();
  }
}
