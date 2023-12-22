import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

interface ComponentProps {
  lat: any;
  lng: any;
}
const MapComponent = withGoogleMap((props: ComponentProps) => (
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
));

export default MapComponent;
