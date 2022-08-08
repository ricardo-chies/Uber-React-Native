import React from "react";
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({ destination, origin, onReady}) => (
    <MapViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyAt7IFpzM0QpEv5CUSsEHN0Qd4kJg0wO0w"
        strokeWidth={3}
        strokeColor="#222"
    />);

export default Directions;
