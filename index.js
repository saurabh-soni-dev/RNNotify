import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import displayNotificationHelper from './src/utility/functions/displayNotificationHelper';

// Background message handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  await displayNotificationHelper(remoteMessage);
});

// Handle the initial notification
messaging()
  .getInitialNotification()
  .then(async remoteMessage => {
    if (remoteMessage) {
      await displayNotificationHelper(remoteMessage);
    }
  });

// Register the main application component
AppRegistry.registerComponent(appName, () => App);
