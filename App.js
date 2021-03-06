
 /*
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import firebase from './Firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker'
import { YellowBox } from 'react-native';
import 'firebase/storage';
//YellowBox.ignoreWarnings(['Remote debugger']);

/* const config = {
  apiKey: "AIzaSyChwCMoXTDVpI-jdZe9sIY1CHAXLT1ei9g",
  databaseURL: "https://uploadpicfb.firebaseio.com",
  storageBucket: "uploadpicfb.appspot.com"
};  */

//firebase.initializeApp(config);

export default class App extends Component {
  constructor(props) {
   super(props)
   this.state = {
     loading: false,
     dp: null
    }
  }
  /* initializeFirebase() {
    const firebase = require("firebase");
  
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyChwCMoXTDVpI-jdZe9sIY1CHAXLT1ei9g",
      databaseURL: "https://uploadpicfb.firebaseio.com",
      storageBucket: "uploadpicfb.appspot.com"
    };
    firebase.initializeApp(config);
  
    //inicializando o firestore
    //const firestore = require("firebase/firestore");
   // db = firebase.firestore();
   // db.settings({ timestampsInSnapshots: true });
  }
  
  componentWillMount() {
    this.initializeFirebase();
  } */

  openPicker(){
    this.setState({ loading: true })
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    //const { uid } = this.state.user
    const uid = "Ivek"
    ImagePicker.openPicker({
    //ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo'
    }).then(image => {
      console.log(image);
      const imagePath = image.path
      let uploadBlob = null
      const imageRef = firebase.storage().ref(uid).child(image.modificationDate + ".jpg")//("dp1.jpg")
      let mime = 'image/jpg'
      fs.readFile(imagePath, 'base64')
        .then((data) => {
          //console.log(data);
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        console.log(blob);
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        console.log(url);

        let userData = {}
        //userData[dpNo] = url
        //firebase.database().ref('users').child(uid).update({ ...userData})

        let obj = {}
        obj["loading"] = false
        obj["dp"] = url
        this.setState(obj)
        console.log(obj);

      })
      .catch((error) => {
        console.log(error)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
  render() {
    /*return (
       <View style={styles.container}>
        <Text style={styles.welcome}>WELCOME !!! </Text>
        <Text style={styles.instructions}>Upload Picture to Firebase</Text>
        <Text style={styles.instructions}>1. install firebase </Text>
        <Text style={styles.instructions}>2. install react-native-image-crop-picker </Text>
        <Text style={styles.instructions}>3. install react-native-image-fetch-blob </Text>
      </View>
    );  */

    
    const dpr = this.state.dp ? (<TouchableOpacity onPress={ () => this.openPicker() }> 
      <Image
         style={{width: 200, height: 200, margin: 5}}
         source={{uri: this.state.dp}}
       />       
       </TouchableOpacity>) : (<Button
      onPress={ () => this.openPicker() }
      title={ "Izaberi sliku" }
    />
    )

    const dps = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : (<View style={styles.container}>
      <View style={{flexDirection: "row"}}>
        { dpr }
      </View>
    </View>)
//<Image style={{width: 100, height: 100, margin: 5}}
//source={{uri: 'https://firebasestorage.googleapis.com/v0/b/uploadpicfb.appspot.com/o/Ivek%2F1547223516000.jpg?alt=media&token=05a0d100-0b44-40a6-a75f-9dd69ef03585'}}/>
    return (
      <View style={styles.container}>
        { dps }        
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