import React, {useState, Component} from 'react';
import {Button, Text, View,  StyleSheet, Dimensions, TouchableOpacity, TouchableHighlightBase } from 'react-native';
import Modal from 'react-native-modal';
import MapView, {PROVIDER_GOOGLE, Marker, MAP_TYPES, ProviderPropType, Callout, Polyline}  from 'react-native-maps';
import {Root, Popup } from 'popup-ui';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import NumericInput from 'react-native-numeric-input'
import { render } from 'react-dom';
import Inputs from './inputs.js'
import Filter from './filter.js'
import Features from './feature.js'
import Draw from './draw.js'


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const toggle = true
let id = 0;
function getRandomInt() {
  const status = ["Fire Trucks"];
  return status[0];
}
function log(eventName, e){
  console.log(eventName, e.nativeEvent);
}
function onP(){

}
class DisplayLatLng extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
      markers: [],
      polylines: [],
      toggle: false,
      editing: null,
      
    }
    
    this.handlePress = this.handlePress.bind(this);
  }
  
  finish() {
    const { polylines, editing } = this.state;
    this.setState({
      polylines: [...polylines, editing],
      editing: null,
      toggle: false
    });
  }
  createHole(){
    const {editing, toggle} = this.state;
    if(!toggle){
      this.setState({
        toggle: true,
        editing:{
          ...editing,
          holes: [...editing.holes, []],
        }
      });
    }else{
      const holes = [...editing.holes];
      if(holes[holes.length - 1].length === 0){
        holes.pop();
        this.setState({
          editing: {
            ...editing,
            holes,
          },
        });
      }
      this.setState({toggle: false});
    }
  }
  onPanDrag(e) {
    const { editing, toggle } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        },
      });
    }else if(!toggle){
      this.setState({
        editing:{
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
        }
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate,
      ];
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [...editing.coordinates],
          holes,
        },
      });
    }
  }
  onRegionChange(region) {
    this.setState({ region });
  }

  jumpRandom() {
    this.setState({ region: this.randomRegion() });
  }
  handlePress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          
        }
      ]
    })
  }

  
  render() {
    
    return (
      <View style={styles.container}>
        <MapView
          provider="google"
          ref={ref => {
            this.map = ref;
          }}
          
          
          initialRegion={this.state.region}
          onLongPress= {this.handlePress}
          zoomTapEnabled = {false}
          
          onRegionChange={region => this.onRegionChange(region)}
          
          scrollEnabled = {this.state.toggle}
          zoomEnabled = {this.state.toggle}
          
          onPanDrag = {e => this.onPanDrag(e)}
        >
          
          {this.state.polylines.map(polyline => (
            <Polyline
              key={polyline.id}
              coordinates={polyline.coordinates}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={2}
              holes = {polyline.holes}
              
            />
          ))}
          {this.state.editing && (
            <Polyline
              key="editingPolyline"
              coordinates={this.state.editing.coordinates}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={2}
              holes={this.state.editing.holes}
              
            />
          )}
          {this.state.markers.map((marker) => {
        return (
          
           
           <Marker 
           
           coordinate={this.state.b}
            onSelect={e => log('onSelect', e)}
            onDrag={e => log('onDrag', e)}
            onDragStart={e => log('onDragStart', e)}
            onDragEnd={e => log('onDragEnd', e)}
            onPress={e => log('onPress', e)}
           
            draggable
            {...marker} 
           
           >
            <Callout>
              
              <Inputs/>
              
            </Callout>
          </Marker>
         

          
        )
      })}
        </MapView>
        
        <View style={styles.bubble}>
          <Text style={styles.centeredText}>
            {this.state.region.latitude.toPrecision(7)},
            {this.state.region.longitude.toPrecision(7)}
          </Text>
        </View>
        <View>
          
        
          
        {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.createHole()}
              style={[styles.bubble2, styles.button]}
            >
              <Text>
                
                {this.state.creatingHole ? '' : 'Place'}
              </Text>
            </TouchableOpacity>
            
          )}
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.finish()}
              style={[styles.bubble3, styles.button]}
            >
              <Text>Create New LineS</Text>
            </TouchableOpacity>
            
          )}
        </View>
      </View>
      
    );
  }
}

DisplayLatLng.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    
    
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    
    paddingHorizontal: 12
    
  },
  container2:{
      
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 20,
    marginTop: 40
  },
  bubble2: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 20,
    marginTop: 20,
    width: 100
  },
  bubble3: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 20,
    marginTop: 20,
    width: 100
  },
 button: {

 },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  centeredText: { 
    textAlign: 'center' 
},

});

export default DisplayLatLng;
/*
 <TouchableOpacity
              onPress = {() => 
                
                this.start()}
              style = {[styles.bubble, styles.button]}
            >
              <Text>Start</Text>
            </TouchableOpacity>
            */