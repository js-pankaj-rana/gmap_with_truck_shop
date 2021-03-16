import React, {useState, useEffect} from 'react';
import {Button, Input, ListGroup, ListGroupItem} from 'reactstrap';
import {ModalWindow} from './../modal/modal';
import './style.scss';
import {MoreButton} from './../actionButton/moreAction';



export const ShopList = (props) => {
    const [findShopItem, setFindShopItem] = useState('');
    const [addModals, setAddModal] = useState(false);
    const toggleModals = () => setAddModal(!addModals);

    const findShop = (e) => {
        setFindShopItem(e.currentTarget.value);
    }
    useEffect(() => {
            props.findShop(findShopItem);
    }, [findShopItem])
    return (
        <>
        <div className="input-wrap">
            <Input type="text" onChange={findShop} placeholder="Find shop here" />
            { (!!props.isFilterKey) && (props.filterShop.length === 0) && <p className="text-warning warn-message">
                There is not item of {props.isFilterKey} keyword 
            </p>}
        </div>
        
        <ListGroup>
            {(!props.isFilterKey && (props.filterShop).length < 1) ? props.shops.map( shop => (
                <ListGroupItem className="clearfix shop-list-item" key={`p${shop.id}`} >
                    <div className="pull-left">{`${shop.type} - ${shop.location}`} </div>
                    <MoreButton id={shop.id} shop={shop} actionMethod={props.editShop} deleteShop={props.deleteShop}/>
                </ListGroupItem>
                )) : props.filterShop.map( shop => (
                    <ListGroupItem className="clearfix shop-list-item" key={`c${shop.id}`} >
                        <div className="pull-left">{`${shop.type} - ${shop.location}`} </div>
                        <MoreButton id={shop.id} shop={shop} actionMethod={props.editShop} deleteShop={props.deleteShop}/>
                    </ListGroupItem>
                ))
            }
        </ListGroup>
         <div className="text-center m-t-2">
            <Button color="success" className="text-center" onClick={toggleModals}>Add More Shop</Button>
        </div>
        <ModalWindow isModalToggle={addModals} toggleModals={toggleModals} actionMethod={props.addShop} title="Add New Details" />
        </>
        )
}


