import { EDIT_SHOP, DELETE_SHOP, ADD_SHOP, FILTER_SHOP } from './../constant';

export const addShop = (payload) => {
    return {
        type: ADD_SHOP,
        payload
    }
}

export const editShop = (payload) => {
    return {
        type: EDIT_SHOP,
        payload
    }

}

export const deleteShop = (payload) => {
    return {
        type: DELETE_SHOP,
        payload: payload
    }
}

export const findShop = (payload) => {
    return {
        type: FILTER_SHOP,
        payload
    }
}
