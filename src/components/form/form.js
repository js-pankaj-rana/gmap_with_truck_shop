import React, {useState, useEffect} from 'react'
import { 
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert } from 'reactstrap';

export const FormComponent = (props) => {
    let {actionMethod, shop = undefined, toggle, toggleAction = null}   =  props;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [data, setData] = useState({})
    const [error, setError] = useState({})

    
    const onChangeValue = (e) => {
        let {name, value, nodeName} = e.currentTarget;
        if(nodeName === 'SELECT'){
          value = Array.from(e.target.selectedOptions, option => Number(option.value))
          value.sort();
        }
        setData({
            ...data,
            [name]: value
        })
    }
   

   const onSubmit = (e) => {
       e.preventDefault();
      
      //  validation
      let { 
        type = undefined,
        location = undefined,
        openingTime = undefined,
        closingTime = undefined,
        openDay = undefined,
        lat = undefined,
        lng = undefined } = data;
      
      
      if(openingTime && closingTime) {
        let time1 = openingTime.split(':'),
            time2 = closingTime.split(':');

        let openTimeInMinute = Number(time1[0] * 60) + Number(time1[1]), 
            closeTimeInMinute = Number(time2[0] * 60) + Number(time2[1]);
            if(closeTimeInMinute < openTimeInMinute ){
              setError({
                ...error,
                time: 'Shop closing time would be greater than shop opening time'
              })
              return false;
            }
            if(closeTimeInMinute === openTimeInMinute ){
              setError({
                ...error,
                time: 'Shop closing time does not equal of shop opening time'
              })
              return false;
            }
        }
      
        actionMethod(data);
        toggle();

   } 
   useEffect(() => {
       if(shop !== undefined){
        setData({
          ...shop
        })
       }
   }, [])
    return (<>
      {error && error.time && <Alert color="danger" fade={false}>
          {error.time}
      </Alert> }
      <Form onSubmit={onSubmit}>
        <Row>
        <Col md='6'>
          <FormGroup>
            <Label for="foodType">Food Type</Label>
            <Input 
              type="text"
              name="type"
              id="foodType"
              placeholder="eg. Patties"
              onChange={onChangeValue}
              defaultValue={data.type}
              required />
          </FormGroup>
          <FormGroup>
            <Label for="locationAria">Location</Label>
            <Input 
              type="text"
              name="location"
              id="locationAria"
              placeholder="A Block"
              onChange={onChangeValue} 
              defaultValue={data.location}
              required />
          </FormGroup>
          <FormGroup>
            <Label for="locationLat">Location Latitude</Label>
            <Input 
              type="text"
              name="lat"
              id="locationLat"
              placeholder="56.2121"
              onChange={onChangeValue} 
              defaultValue={data.lat}
              pattern="[-+]?[0-9]*[.,]?[0-9]+"
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label for="locationLong">Location Logitude</Label>
            <Input 
              type="text"
              name="lng"
              id="locationLong"
              placeholder="56.2121"
              onChange={onChangeValue} 
              defaultValue={data.lng}
              pattern="[-+]?[0-9]*[.,]?[0-9]+"
              required
            />
          </FormGroup>
          </Col>
      <Col md='6'>
        <FormGroup>
          <Label for="openingTime">Opening Time</Label>
          <Input 
            type="text"
            name="openingTime"
            id="openingTime"
            placeholder="HH:MM"
            pattern="(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])"
            onChange={onChangeValue} 
            defaultValue={data.openingTime}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="closingTime">Closing Time</Label>
          <Input
           type="text"
           name="closingTime"
           id="closingTime"
           placeholder="HH:MM"
           pattern="(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])"
           onChange={onChangeValue} 
           defaultValue={data.closingTime}
           required
          />
        </FormGroup>
        <FormGroup>
          <Label for="daySelect">Select open days (Use ctrl + click)</Label>
          <Input type="select" name="openDay" id="daySelect" multiple onChange={onChangeValue} 
            defaultValue={data.openDay}
          required>
              { days.map( (day, index) => {
                let option = <option value={index+1} key={`day${index}`}>{day}</option> 
                
                if(data.openDay && data.openDay[index] === index+1){
                  option = <option value={index+1} selected key={`day${index}`}>{day}</option> 
                }
                return option;
              }
              )}

              {/* {data.openDay && days.map( (day, index) => {
                
              } )} */}

          </Input>
      </FormGroup>
      </Col>
      </Row>

      <div className="text-center clearfix">
        <Button type='submit' color="primary">Submit</Button>
      </div>
      <p className="text-info">*Note:- <a href="https://latitudelongitude.org/address-latlong" target="_blank">Click here</a> for finding lat and long
        </p>
    </Form>
      </>
    )
}