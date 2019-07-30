import Geolocation from 'react-native-geolocation-service';
import Request from './../utils/request';
import store from './../store';

getActiveOrders = (callback) => {
  Request.get('/order/get/driver/active')
  .then(res => {
    store.dispatch({type: 'DRIVER_SET_ACTIVE_ORDERS', payload: res.data})
  })
  .catch(err => console.error(err));
};

updateLocation = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      Request.post('/driver/location', {lat, lon});
    },
    (error) => {
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}

module.exports.getActiveOrders = getActiveOrders;
module.exports.updateLocation = updateLocation;

module.exports.init = (component) => {
  if(!component.props.auth.loaded) {
    getActiveOrders(component);
  }
}
