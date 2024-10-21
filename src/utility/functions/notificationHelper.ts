import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const requestUserPermission = async () => {
  console.log('enter');
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  } else {
    console.log('enter1');

    try {
      console.log('enter2');

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log('enter3');

      console.log('gg', granted, PermissionsAndroid.RESULTS.GRANTED);

      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        console.log('enter4');

        getFcmToken();
        console.log('Notification permission granted');
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  }
};

const getFcmToken = async () => {
  let checkToken = await AsyncStorage.getItem('fcmToken');
  console.log('Old token: ', checkToken);
  if (!checkToken) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken()
      if (!!fcmToken) {
        console.log('New fcm token generted: ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('Fcm token error: ', error);
    }
  }
};

export {requestUserPermission, getFcmToken};
