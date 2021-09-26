import React, {useState, Component} from 'react';
import {Button, Text, View, TextInput,  StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import MapView, {PROVIDER_GOOGLE, Marker, Callout, Polyline}  from 'react-native-maps';
import {Root, Popup } from 'popup-ui';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import NumericInput from 'react-native-numeric-input'
import Prompt from 'react-native-numeric-input'
import { render } from 'react-dom';
import Options from './options.js';
function getRandomInt() {
    const status = ["Fire Truck"];
    return status[0];
  }
  
  export default class maps extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        markers: []
      }
      this.handlePress = this.handlePress.bind(this);
    }
    handlePress(e) {
      this.setState({
        markers: [
          ...this.state.markers,
          {
            coordinate: e.nativeEvent.coordinate,
            cost: `${getRandomInt()}`
          }
        ]
      })
    }
    render() {
      
      return (
        
        <Root>
          <MapView 
        style={styles.container}
        initialRegion={{
            latitude: 45.5209087,
            longitude: -122.6705107,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} 
          onPress={this.handlePress}
          provider = "google"
      >
     {this.state.markers.map((marker) => {
        
        return (
          
           
           <Marker {...marker} >
            <Callout>
            <Text style={styles.text}>{marker.cost}</Text>

            </Callout>
                
             
           
          </Marker>
         

          
        )
      })}
      </MapView>
      
      </Root>
        
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    marker: {
      backgroundColor: "#550bbc",
      padding: 5,
      borderRadius: 5,
    },
    text: {
      color: "#000000",
      fontWeight: "bold"
    }
  });
  /*
    
      
      
  */