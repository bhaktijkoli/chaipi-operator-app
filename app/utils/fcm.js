import firebase from 'react-native-firebase';
import type { Notification, RemoteMessage } from 'react-native-firebase';
import Request from './request';

let fcmToken = null;
let hasPermission = false;
let init = async () => {
  fcmToken = await firebase.messaging().getToken();
  if(fcmToken) {
      firebase.messaging().requestPermission().then(() => {
        hasPermission = true;
        console.log("Device has been Authorized");
        console.log("Token:", fcmToken);
      })
  }
}

let syncToken = async () => {
  console.log("Start token sync");
  if(fcmToken) {
    Request.post('/device/sync')
    .then(res => {
    });
  }
}


module.exports.init = init;
module.exports.syncToken = syncToken;


//
//
// const fcmToken = await firebase.messaging().getToken();
// if (fcmToken) {
//   console.log(fcmToken);
//   firebase.messaging().requestPermission()
//   .then(() => {
//     console.log("Authorized");
//     this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
//       console.log("Notification displayed");
//       // Process your notification as required
//       // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
//     });
//     this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
//       console.log("Notification recieved");
//       console.log(notification);
//       // Process your notification as required
//     });
//     this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
//       console.log("Remote message recieved");
//       console.log(message);
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });
// } else {
//   // user doesn't have a device token yet
// }
