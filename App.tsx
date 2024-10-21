import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {requestUserPermission} from './src/utility/functions/notificationHelper';
import displayNotificationHelper from './src/utility/functions/displayNotificationHelper';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await displayNotificationHelper(remoteMessage);
    });
    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>Firebase Notification</Text>
    </View>
  );
};

export default App;
