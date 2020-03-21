

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import firebase from 'react-native-firebase'


class App extends Component {


  state={

  }

  componentDidMount() {

    const getFood = async () => {

      var foodList = []

      var snapshot = await firebase.firestore().collection("food").get();



      snapshot.forEach((doc) => {

        const foodItem = doc.data();

       

        foodItem.id = doc.id;                     // get id 

        foodList.push(foodItem);

      })
      this.setState({

        foods: [...foodList]

      })

    }

    getFood();

    



  }


  render() {

    return (
      <View>
        <Text>firebase</Text>
      </View>
    )

  }




}


export default App;
