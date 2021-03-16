import React, {useState, useEffect} from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import {DaySelect} from './../days/days';
import {Card, CardTitle, CardText} from 'reactstrap';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const GoogleMapLocation = (props) => {

  let {shops} = props;
  
  const [ selected, setSelected ] = useState({});
  
  const [ center, setCenter ] = useState({
    lat: 28.630420,
    lng: 77.217722
  });
  
  const onSelect = item => {
    setSelected(item);
  }


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)

  }, [])

  useEffect(() => {
    console.log(selected)

  }, [selected])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapTypeId={window.google.maps.MapTypeId.ROADMAP}
        >
        {
          shops.map(item => {
            let {lat, lng, id} = item;
            lat = Number(lat);
            lng = Number(lng);
            return (
              <Marker 
                key={`item${id}`}
                position={{lat, lng}}
                onClick={() => onSelect(item)}  
              />
            )
          })
       }
       {
            selected.location && 
            (
              <InfoWindow
              position={{lat: Number(selected.lat), lng: Number(selected.lng)}}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <Card body inverse>
                <CardTitle tag="h5">{selected.type}</CardTitle>
                <CardText>{`Open Time: ${selected.openingTime} `} </CardText>
                <CardText>{`Close Time: ${selected.closingTime} `}</CardText>
                <DaySelect openDay={selected.openDay} />
              </Card>
            </InfoWindow>
            )
         }
       </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMapLocation)