import React from 'react';
import {DAYS} from './../../constant/constant';
import {List} from 'reactstrap';

export const DaySelect = ({openDay}) => {

    return ( 
        <List>
            {openDay.map( (days, index) => DAYS[days] && <li key={`indx${index+1}`}>{DAYS[days]}</li>)}
        </List>
    )
}