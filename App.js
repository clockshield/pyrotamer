
import React, {useState, Component} from 'react';
import {Button, Text, View, TextInput,  StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import MapView, {PROVIDER_GOOGLE, Marker, MAP_TYPES, ProviderPropType}  from 'react-native-maps';
import {Root, Popup } from 'popup-ui';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import NumericInput from 'react-native-numeric-input'
import { render } from 'react-dom';
import Inputs from './inputs.js'
import Filter from './filter.js'
import Features from './feature.js'
import Draw from './draw.js'

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);
 
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
 
  const [isModalVisible2, setModalVisible2] = useState(false);
  
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
 
  const [isModalVisible3, setModalVisible3] = useState(false);
  
  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
  };
 const[region, setRegion] = React.useState({
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
 })
  return (
    <Root>
      
    <View style = {styles.container}>
      <Draw/>
    <View style = {styles.container2}>
    <View style={styles.Button}>
      <Button  title = "Filter" color = "white" onPress = {toggleModal2}/>
      <Modal isVisible = {isModalVisible2}>
        <Filter/>
        <Button title = "close" onPress = {toggleModal2}/>
      </Modal>
      </View>

      <View style = {styles.Button2}>
      <Button title = "Ask for Help" color = "white" onPress = {toggleModal3}/>
      <Modal isVisible = {isModalVisible3}>
        <Text style = {{ color: 'white'}}>Welcome to PyroTamer App!
        Start by drawing lines and press "place".  </Text>
        <Button title = "close" onPress = {toggleModal3}/>
      </Modal>
      </View>

    
    </View>
    
    </View>
    </Root>
    
  );
}
const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    
    marginTop: -60,
    marginBottom: 20
  },
  Button: {
    textAlign: "center",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fc9300",
    width: 70
  },
  Button2: {
    textAlign: "center",
    backgroundColor: "#fc9300",
    height: 40, 
    borderRadius: 20,
    
  },
  Button3: {
    textAlign: "center",
    backgroundColor: "#fc9300",
    height: 40, 
    borderRadius: 20,
    
  },
  close: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  }
  
});
export default ModalTester;
/*
<View style={styles.Button3}>
    <Button title = "Draw Lines" color = "white" onPress = {toggleModal}/>
      <Modal isVisible = {isModalVisible}>
      
        <Button style = {{flex: 1, justifyContent: 'flex-end', marginBottom: 36}} title = "close" onPress = {toggleModal}/>
      </Modal>
    </View>
    */