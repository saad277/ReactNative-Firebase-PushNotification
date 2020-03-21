

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import firebase from 'react-native-firebase'


class App extends Component {

  async getToken() {

    let fcmToken = await AsyncStorage.getItem("fcmToken");

    if (!fcmToken) {

      fcmToken = await firebase.messaging().getToken();

      if (fcmToken) {

        await AsyncStorage.setItem("fcmToken", fcmToken)
      }



    }

  }


  async requestPermission() {

    try {
      await firebase.messaging().requestPermission();
      this.getToken();

    } catch (error) {

      console.log("Permission Rejected")
    }
  }


  async checkPermission() {

    const enabled = await firebase.messaging().hasPermission();


    if (enabled) {

      this.getToken();

    } else {

      this.requestPermission();
    }


  }


  async createNotificationListener() {

    firebase.notifications().onNotification((notification) => {


      notification.android.setChannelId("insider").setSound("default");
      firebase.notifications().displayNotification(notification)
    })
  }

  componentDidMount() {

    const channel = new firebase.notifications.Android.Channel("insider", "insider channel", firebase.notifications.Android.Importance.Max);
    firebase.notifications().android.createChannel(channel);
    this.checkPermission();
    this.createNotificationListener();

  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Push Notifications</Text>
      </View>
    )

  }




}


const styles = StyleSheet.create({

  container: {

    alignItems: "center",
    justifyContent: "center"

  },

  text: {

    fontSize: 28,


  }


})


export default App;
