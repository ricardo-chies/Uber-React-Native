import React, {Component, Fragment} from 'react';
import { View, Image, Platform, PermissionsAndroid } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import Search from '../search';
import Directions from '../directions';
import Details from '../details';
import { getPixelSize } from '../../utils';

import { Back, LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall } from './styles';

import markerImage from "../../assets/marker.png";
import backImage from '../../assets/back.png';

Geocoder.init('AIzaSyAt7IFpzM0QpEv5CUSsEHN0Qd4kJg0wO0w')

export default class Map extends Component {
    state = {
        region: null,
        destination: null,
    };

    async componentDidMount() {
        Geolocation.getCurrentPosition(
            async ({coords: {latitude, longitude}}) => {
                const response = await Geocoder.from({latitude, longitude});
                const addres = response.results[0].formatted_address;
                const location = addres.substring(0, addres.indexOf(','));

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

    handleLocationSelected = (data, {geometry}) => {
        const {location: {lat: latitude, lng: longitude}} = geometry;

        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            },
        })
    }

    handleBack = () => {
        this.setState({ destination: null});
    }

    render() {
        const { region, destination, duration, location } = this.state;

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
            ref={el => (this.mapView = el)}
            >
            {destination && (
                <Fragment>
                <Directions
                origin={region}
                destination={destination}
                onReady={result =>{
                    this.setState({duration: Math.floor(result.duration)})

                    this.mapView.fitToCoordinates(result.coordinates), {
                        edgePadding: { 
                            right: getPixelSize(50),
                            left: getPixelSize(50), 
                            top: getPixelSize(50),
                            bottom: getPixelSize(50)
                        }
                    };
                }}
            />
            <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
                >
                <LocationBox>
                    <LocationText>{destination.title}</LocationText>
                </LocationBox>
                </Marker>

                <Marker
                coordinate={region}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
            >
                <LocationBox>
                    <LocationText>{destination.title}</LocationText>
                </LocationBox>
                </Marker>

                <Marker
                coordinate={region}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
            >
                <LocationBox>
                    <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                        <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                    </LocationTimeBox>
                    <LocationText>{location}</LocationText>
                </LocationBox>
                </Marker>

            </Fragment>

            )}
        </MapView>

        {destination ? (
            <Fragment>
                <Back onPress={this.handleBack}>
                    <Image source={backImage} />
                </Back>
                <Details/>
            </Fragment>
        ) : (<Search onLocationSelected={this.handleLocationSelected} />
        )}
        </View>
        );
    }
} 