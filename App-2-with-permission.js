import React, { Component } from 'react';
import { Text, View, Button, Alert, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

async function requestLocationPermission(){
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This app requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}


class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      location: null,
      locationPermission: false
    }

  }

  componentDidMount(){
    this.findCoordinates();
  }

  findCoordinates(){
    console.log("state", this.state);
    if(!this.state.locationPermission){
      console.log("asking for permission...");
      this.state.locationPermission = requestLocationPermission();
    }

    Geolocation.getCurrentPosition((position) => {
      const location = JSON.stringify(position);
      this.setState({location});
    }, (error) => {
      Alert.alert(error.message);
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    });
  }

  render(){
    return (
      <View>
        <Text>Location: {this.state.location}</Text>
      </View>
    );
  }

}

export default App;