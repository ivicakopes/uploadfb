
 /*
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

const config = {
  apiKey: "AIzaSyChwCMoXTDVpI-jdZe9sIY1CHAXLT1ei9g",
  databaseURL: "https://uploadpicfb.firebaseio.com",
  storageBucket: "uploadpicfb.appspot.com"
};


firebase.initializeApp(config);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>WELCOME !!! </Text>
        <Text style={styles.instructions}>Upload Picture to Firebase</Text>
        <Text style={styles.instructions}>1. install firebase </Text>
        <Text style={styles.instructions}>2. install react-native-image-crop-picker </Text>
        <Text style={styles.instructions}>3. install react-native-image-fetch-blob </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('App', () => App);