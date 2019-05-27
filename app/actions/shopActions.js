import Request from './../utils/request';

import ws from './../utils/ws';

getActiveOrders = (component, callback) => {
  Request.get('/order/get/shop/active')
  .then(res => {
    component.props.dispatch({type: 'SHOP_SET_ACTIVE_ORDERS', payload: res.data})
    res.data.forEach((el) => {
      ws.subscribeOrder(el.trackid);
    })
    if(callback) callback();
  })
  .catch(err => console.error(err));
}

getShopProducts = (component, shopid) => {
  Request.get('/product/get?shop=' + shopid)
  .then(res => {
    component.props.dispatch({type: 'SHOP_SET_PRODUCTS', payload: res.data})
  })
  .catch(err => console.error(err));
}


module.exports.getActiveOrders = getActiveOrders;
module.exports.getShopProducts = getShopProducts;

module.exports.init = (component) => {
  if(!component.props.shop.loaded) {
    getShopProducts(component, component.props.auth.shop.id);
    getActiveOrders(component);
  }
}
