import { v4 as uuidv4 } from 'uuid';
import { EDIT_SHOP, DELETE_SHOP, ADD_SHOP, FILTER_SHOP } from './../constant';

const defaultState = {
    shops: [
      {
        "id": "7364edac-83b3-11eb-8dcd-0242ac130003",
        "type": "Chinese food",
        "location": "Near Regal Cinema",
        "openingTime": '09:00',
        "closingTime": '19:00',
        "openDay": [1,2,3,4,5,6,7],
        "lat": '28.625889',
        "lng": '77.234296',
      },
      {
        "id": "7364ef28-83b3-11eb-8dcd-0242ac130003",
        "type": "Patties and burgers",
        "location": "Block P",
        "openingTime": '09:00',
        "closingTime": '19:00',
        "openDay": [1,2,3,4,5,6,7],
        "lat": '28.625899',
        "lng": '77.234296',
      },
      {
        "id": "7364f004-83b3-11eb-8dcd-0242ac130003",
        "type": "Chaat",
        "location": "Near Shankar Market",
        "openingTime": '09:00',
        "closingTime": '19:00',
        "openDay": [1,2,3,4,5,6,7],
        "lat": '28.633570',
        "lng": '77.222912',
      },
      {
        "id": "7364eaf0-83b3-11eb-8dcd-0242ac130003",
        "type": "Chinese food",
        "location": "Front of Mandi house",
        "openingTime": '09:00',
        "closingTime": '19:00',
        "openDay": [1,2,3,4,5,6,7],
        "lat": '28.625899',
        "lng": '77.234296',
      },
      {
        "id": "7364f162-83b3-11eb-8dcd-0242ac130003",
        "type": "Chaat",
        "location": "Block N",
        "openingTime": '09:00',
        "closingTime": '19:00',
        "openDay": [1,2,3,4,5,6,7],
        "lat": '28.630728',
        "lng": '77.221295'
      },
      {
        "id": "7364f220-83b3-11eb-8dcd-0242ac130003",
        "type": "India food – Rajma, subji, roti, chawal",
        "location": "KG Marg in front of British council",
        "openingTime": '09:00',
        "closingTime": '19:00',
        "openDay": [1,2,3,4,5,6,7],
        "lat": '28.626946',
        "lng": '77.222362',
      },
      {
        "id": "7364f3a6-83b3-11eb-8dcd-0242ac130003",
        "type": "Coffee, tea and cakes",
        "location": "Barakhamba Road in front of Metro Station",
        "openingTime": '09:00',
        "closingTime": '19:00',
        "openDay": [1,2,3,4,5,6,7],
        "lat": '28.628632',
        "lng": '77.226989',
      }],
        filterShop: [],
        isFilterKey: '',
    }

const reducer = (state = defaultState, action) => {
  let newShop, filterShop = [], shops = []; 
    switch(action.type){
        case ADD_SHOP:
            newShop = [{
                ...action.payload,
                id: uuidv4()
            }];
            return {
                ...state,
                shops: [...state.shops, ...newShop]
              }

        case EDIT_SHOP:
            shops = state.shops.map( obj => {
              newShop = obj ;
              if(obj.id === action.payload.id){
                newShop = action.payload
              }
              return newShop;
            });

            if(state.isFilterKey && state.filterShop.length > 0){
              newShop = {};
              filterShop = state.filterShop.map( obj => {
                newShop = obj;
                if(obj.id === action.payload.id){
                  newShop = action.payload
                }
                return newShop;
              })
            }
            if(state.isFilterKey.length === 0){
              filterShop = []
            }

            return {
                ...state,
                shops,
                filterShop
            }

        case DELETE_SHOP:
            shops = state.shops.filter( obj => obj.id !== action.payload);
            if(state.filterShop.length > 0){
              filterShop = state.filterShop.filter( obj => obj.id !== action.payload)
            }
            return {
                ...state,
                shops,
                filterShop
            }

         case FILTER_SHOP: 
            let payload = (action.payload).toLowerCase();
            filterShop = state.shops.filter( v => (v.type).toLowerCase().indexOf(payload) === 0);
            if(action.payload.length === 0){
              filterShop: []
            }
            
            return {
              ...state,
              filterShop,
              isFilterKey: action.payload
            }
    
        default: 
            return state
    }
}

export default reducer;