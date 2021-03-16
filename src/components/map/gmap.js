import React, {useState, useEffect} from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
  import {Card, CardTitle } from 'reactstrap';
import moment from 'moment';
import { DAYS } from '../../constant';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const GoogleMapLocation = (props) => {
  let {shops} = props;
  const [ selected, setSelected ] = useState({});
  const [ shopStatus, setShopStatus ] = useState('');
  
  const [ center, setCenter ] = useState({
    lat: 28.630420,
    lng: 77.217722
  });
  
  const onSelect = item => {
    
    let {lat, lng, openDay, openingTime, closingTime} = item;
    let timeInHhMm = moment().format('d:HH:mm');
    let timeArray = timeInHhMm.split(':').map(element => Number(element));
    if(openDay){
      let openDayValue = timeArray[0]
      if(openDay.includes(openDayValue)){
        let currentTimeInMinuts = timeArray[1]*60 + timeArray[2];
        let openTimeArray = (openingTime).split(':').map(element => Number(element));
        let openTimeTimeInMinuts = openTimeArray[0]*60 + openTimeArray[1];

        let closeTimeArray = (closingTime).split(':').map(element => Number(element));
        let closeTimeTimeInMinuts = closeTimeArray[0]*60 + openTimeArray[1];
        
        if(currentTimeInMinuts > openTimeTimeInMinuts &&  currentTimeInMinuts < closeTimeTimeInMinuts){
            setShopStatus("Open now");
        }
        else {
          setShopStatus("Close now");
        }
      }
      else {
        setShopStatus(`Closed on ${DAYS[openDayValue]}`)
      }
    }

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
  const clearOnClose = () => {
    setSelected({});
    setShopStatus('');
  }

useEffect(() => {
  console.log(selected)    
  console.log(shopStatus)    
}, [selected, shopStatus])

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
              onCloseClick={clearOnClose}
            >
              <Card body inverse>
              {shopStatus && <CardTitle tag="h5">{
              `${selected.type}: ${shopStatus}`
              }</CardTitle> }
              </Card>
            </InfoWindow>
            )
         }
       </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMapLocation)