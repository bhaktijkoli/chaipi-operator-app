import Request from './../utils/request';

module.exports.setUser = (component, data) => {
  component.props.dispatch({type: 'AUTH_SET_USER', payload: data})
  if(data.shop) {
    component.props.dispatch({type: 'AUTH_SET_SHOP', payload: data})
  }
}

module.exports.setUserUID = (component, data) => {
  component.props.dispatch({type: 'AUTH_SET_UID', payload: data})
}

module.exports.getShopProducts = (component, shopid) => {
  Request.get('/product/get?shop=' + shopid)
  .then(res => {
    component.props.dispatch({type: 'AUTH_SET_PRODUCTS', payload: res.data})
  })
  .catch(err => console.error(err));
}
