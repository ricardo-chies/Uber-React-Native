import React, {Component} from 'react';
import { View, Platform, PermissionsAndroid } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import Search from '../search';

export default class Map extends Component {
    state = {
        region: null
    };

    async componentDidMount() {
        Geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {

                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                });
            }, //sucesso
            () => {}, //erro
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
    }

    render() {
        const { region } = this.state;

        return (
        <View style={{ flex:1 }}>
        <MapView
            onMapReady={() => {
                Platform.OS === 'android' ?
                PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                  .then(() => {
                    console.log("Usuário aceitou")
                  })
                : ''
              }}
            style={{flex: 1}}
            region={region}
            showsUserLocation={true}
            loadingEnabled={true}
        />

        <Search/>
        </View>
        );
    }
} 