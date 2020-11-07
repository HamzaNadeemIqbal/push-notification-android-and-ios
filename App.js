/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import messaging from "@react-native-firebase/messaging";

import React from "react";
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

export default class App extends React.Component {
  componentDidMount() {
    // PushNotificationIOS.addEventListener("register", (token) => {
    //   console.log(token);
    //   Alert.alert(token);
    // });

    // PushNotificationIOS.addEventListener(
    //   "registrationError",
    //   (registrationError) => {
    //     console.log(registrationError, "--");
    //   }
    // );

    // PushNotificationIOS.addEventListener("notification", function (
    //   notification
    // ) {
    //   if (!notification) {
    //     return;
    //   }
    //   const data = notification.getData();
    //   Alert.alert(JSON.stringify({ data, source: "CollapsedApp" }));
    // });

    // PushNotificationIOS.getInitialNotification().then((notification) => {
    //   if (!notification) {
    //     return;
    //   }
    //   const data = notification.getData();
    //   Alert.alert(JSON.stringify({ data, source: "ClosedApp" }));
    // });
    // PushNotificationIOS.requestPermissions();

    // this.configureNotification();
    // this.localNotification();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    this.requestUserPermission();

    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
      });
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  localNotification = () => {
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + 2 * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    });

    // PushNotification.localNotification({
    //   /* Android Only Properties */
    //   ticker: "My Notification Ticker", // (optional)
    //   showWhen: true, // (optional) default: true
    //   autoCancel: true, // (optional) default: true
    //   largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    //   largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    //   smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    //   bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    //   subText: "This is a subText", // (optional) default: none
    //   bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    //   color: "red", // (optional) default: system default
    //   vibrate: true, // (optional) default: true
    //   vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    //   tag: "some_tag", // (optional) add tag to message
    //   group: "group", // (optional) add group to message
    //   groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    //   ongoing: false, // (optional) set whether this is an "ongoing" notification
    //   priority: "high", // (optional) set notification priority, default: high
    //   visibility: "private", // (optional) set notification visibility, default: private
    //   importance: "high", // (optional) set notification importance, default: high
    //   ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
    //   shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    //   channelId: "your-custom-channel-id", // (optional) custom channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
    //   onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

    //   when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    //   usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    //   timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

    //   messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

    //   actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
    //   invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

    //   /* iOS only properties */
    //   alertAction: "view", // (optional) default: view
    //   category: "", // (optional) default: empty string

    //   /* iOS and Android properties */
    //   id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    //   title: "My Notification Title", // (optional)
    //   message: "My Notification Message", // (required)
    //   userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    //   playSound: false, // (optional) default: true
    //   soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    //   number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    //   repeatType: "minute", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    // });
  };
  configureNotification = () => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: (notification) => {
        console.log("NOTIFICATION:", notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: (notification) => {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: (err) => {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };
  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></View>
    );
  }
}

// d4580efc49918788de011faa50eb1800f680efced116513051a98c961efee737

// fKcHsPf0e0tqlvEMZ0HGkH:APA91bEe9j1afRC2qMER9vdp9amSOVKzl0IP3czhtdJFVc-612RAcbNAUks745_-CWHQng3DeHYCbTt6eFtTJjFU68R3sJFMlfNazVzs2vegG_sSsWJi52XQPtpQ8JuZgValRmAKmr6A
