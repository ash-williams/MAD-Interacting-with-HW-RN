import React, { Component } from 'react';
import { View, Button, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';



class App extends Component{

  sendToServer = (data) => {
    console.log(data.uri);

    return fetch("http://10.0.2.2:3333/api/1.0.0/location/1/review/7/photo",
    {
      method: 'POST',
      headers: {
        "Content-Type": "image/jpeg",
        "X-Authorization": "3d5b5b4ccb6c52d085d282bdfdf49cf9"
      },
      body: data
    })
    .then((response) => {
      Alert.alert(response.status);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  takePicture = async() => {
    if(this.camera){
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);

      this.sendToServer(data); 
    }
  }


  render(){
    return (
      <View style={{flex:1}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex:1,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        />
        <Button title="Take Photo" onPress={() => this.takePicture()} />
      </View>
    );
  }

}

export default App;