import React from 'react';
import {Container, Row, Col, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {connect} from 'react-redux';
import {ShopList} from './../components/shopList/shopList';
import GoogleMapLocation from './../components/map/gmap';
import * as actionType from './../action/action.shop';


const App = (props) => {
    
    
    return (<>
    <Container>
        <Row>
            <Col md={4}>
                <ShopList 
                    shops={props.shops}
                    filterShop={props.filterShop}
                    addShop={props.addShop}
                    editShop={props.editShop}
                    deleteShop={props.deleteShop}
                    findShop={props.findShop}
                    isFilterKey={props.isFilterKey}
                />
            </Col>
            <Col md={8}>
                <GoogleMapLocation shops={props.shops}/> 
            </Col>
        </Row>

    </Container>
  </>
)
}

const mapStateToProps = state => ({
    shops: state.shops,
    filterShop: state.filterShop,
    isFilterKey: state.isFilterKey
})

const mapDispatchToProps = (dispatch) => ({
    addShop: shop =>  dispatch(actionType.addShop(shop)),
    editShop: shop => dispatch(actionType.editShop(shop)),
    deleteShop: id => dispatch(actionType.deleteShop(id)),
    findShop: name => dispatch(actionType.findShop(name))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
