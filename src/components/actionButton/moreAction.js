import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem} from 'reactstrap';
import {ModalWindow} from './../modal/modal';

import './style.scss';

export const MoreButton = ({id, actionMethod, shop, deleteShop}) => {
    const [isAction, setIsAction] = useState(false);
    
    const toggleAction = () => setIsAction(!isAction);
    
    const [isModalToggle, setIsModalToggle] = useState(false);

    const toggleModals = () => {
        setIsModalToggle(!isModalToggle);
    }

    const removeItem = () => {
        toggleAction();
        deleteShop(id);
    }

    useEffect(() => {
        isModalToggle && setIsAction(false);
    }, [isModalToggle])
    return(<>
            <div className="action-wrap pull-right">
                <span href='' data-id={id}  color='default' onClick={toggleAction}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                </span>
            {isAction && <div className="test">
                <ListGroup>
                    <ListGroupItem onClick={toggleModals}>Edit</ListGroupItem>
                    <ListGroupItem onClick={removeItem}>Delete</ListGroupItem>   
                </ListGroup>
            </div> }
        </div>
        {isAction && <div className="o-lay" onClick={toggleAction}></div> }
        <ModalWindow 
            id={id}
            isModalToggle={isModalToggle}
            actionMethod={actionMethod}
            toggleModals={toggleModals}
            title="Edit Shop Details"
            shop={shop}
            toggleAction={toggleAction }
            />
        </>
    )
}