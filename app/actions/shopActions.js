import Request from './../utils/request';

import ws from './../utils/ws';

getActiveOrders = (component, callback) => {
  Request.get('/order/get/shop/active')
  .then(res => {
    component.props.dispatch({type: 'SHOP_SET_ACTIVE_ORDERS', payload: res.data})
    res.data.forEach((el) => {
      ws.subscribeOrder(el.trackid, (data) => {
        getActiveOrders(component);
      });
    })
    if(callback) callback();
  })
  .catch(err => console.error(err));
}

module.exports.getActiveOrders = getActiveOrders;
