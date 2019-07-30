import Request from './../utils/request';
import store from './../store';

getActiveShopOrders = () => {
  Request.get('/order/get/shop/active')
  .then(res => {
    store.dispatch({type: 'SHOP_SET_ACTIVE_ORDERS', payload: res.data})
  })
  .catch(err => console.error(err));
}

getShopProducts = (shopid) => {
  console.log(shopid);
  Request.get('/product/get?shop=' + shopid)
  .then(res => {
    store.dispatch({type: 'SHOP_SET_PRODUCTS', payload: res.data})
  })
  .catch(err => console.error(err));
}


module.exports.getActiveShopOrders = getActiveShopOrders;
module.exports.getShopProducts = getShopProducts;

module.exports.init = (component) => {
  if(!component.props.shop.loaded) {
    getShopProducts(component.props.auth.shop.id);
    getActiveShopOrders();
  }
}
