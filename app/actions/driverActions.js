import { PermissionsAndroid, Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from 'react-native-geolocation-service';
import Request from './../utils/request';
import store from './../store';

getActiveOrders = (callback) => {
  Request.get('/order/get/driver?active=1')
  .then(res => {
    store.dispatch({type: 'DRIVER_SET_ACTIVE_ORDERS', payload: res.data})
  })
  .catch(err => console.error(err));
};

getRecentOrders = (callback) => {
  Request.get('/order/get/driver')
  .then(res => {
    store.dispatch({type: 'DRIVER_SET_RECENT_ORDERS', payload: res.data})
  })
  .catch(err => console.error(err));
};

updateLocation = async () => {
  if(await !requestLocationPermission()) return;
  BackgroundTimer.runBackgroundTimer(() => {
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
  },
  1*3000);
}

requestLocationPermission = async () => {
  if(Platform.OS === 'iOS') return true;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool Photo App Camera Permission',
        message:
        'Cool Photo App needs access to your camera ' +
        'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
      return true
    } else {
      console.log('Camera permission denied');
      return false
    }
  } catch (err) {
    console.warn(err);
    return true;
  }
}

module.exports.getActiveOrders = getActiveOrders;
module.exports.getRecentOrders = getRecentOrders;
module.exports.updateLocation = updateLocation;

module.exports.init = (component) => {
  if(!component.props.auth.loaded) {
    getActiveOrders();
    getRecentOrders();
    updateLocation();
  }
}
