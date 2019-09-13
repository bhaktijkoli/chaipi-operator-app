import { PermissionsAndroid, Platform } from 'react-native';

module.exports.getLocationPermission = async () => {
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
