import React, { Component } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      location: null,
      locationPermission: false
    }

    // this.findCoordinates = this.findCoordinates.bind(this);

  }

  findCoordinates = async () => {
    Geolocation.getCurrentPosition((position) => {
      const location = JSON.stringify(position);
      console.log(location);
      this.setState({location:location});
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
        <Button title="Get my coords" onPress={this.findCoordinates} />
        <Text>Location: {this.state.location}</Text>
      </View>
    );
  }

}

export default App;