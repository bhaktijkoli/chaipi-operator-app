import Request from './../utils/request';

getActiveOrders = (component, callback) => {
  console.log("WHY THE HELL IT IS CALLED?");
  Request.get('/order/get/driver/active')
  .then(res => {
    component.props.dispatch({type: 'DRIVER_SET_ACTIVE_ORDERS', payload: res.data})
  })
  .catch(err => console.error(err));
};

module.exports.getActiveOrders = getActiveOrders;

module.exports.init = (component) => {
  if(!component.props.auth.loaded) {
    getActiveOrders(component);
  }
}
