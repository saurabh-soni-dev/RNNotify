import notifee, {
  AndroidBadgeIconType,
  AndroidImportance,
} from '@notifee/react-native';

interface remoteMessageTypes {
  notification?: {
    title?: string;
    body?: string;
  };
}
const displayNotificationHelper = async (remoteMessage: remoteMessageTypes) => {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: '12345',
    name: 'NotifyChannel',
    importance: AndroidImportance.HIGH,
    badge: true,
    sound: 'hollow',
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage?.notification?.title || 'Title',
    body: remoteMessage?.notification?.body || 'Body',
    android: {
      channelId,
      color: '#4caf50',
      actions: [
        {
          title: '<b>Dance</b> &#128111;',
          pressAction: {id: 'dance'},
        },
        {
          title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
          pressAction: {id: 'cry'},
        },
      ],
      badgeIconType: AndroidBadgeIconType.SMALL,
      sound: 'hollow',
    },
  });
};

export default displayNotificationHelper;
