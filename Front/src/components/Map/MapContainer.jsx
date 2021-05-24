import React, { useEffect, useReducer, useState, useCallback, useContext } from 'react';
import Map from './Map';
import {connect} from 'react-redux';
import {getFactoryAC, getProductAC, chooseCustomerAC, chooseProductAC, swipeSlideAC, mapReducer, getDataThunkCreator} from '../../redux/map-reducer';
import { useAuth } from '../Authorization/authHook';

//TODO: переделать в хук

class MapContainer extends React.Component {
    
    componentDidMount() {
        debugger 
        //api    
        if (this.props.token) {
        }
    }
    componentDidUpdate(prevProps, prevState) {   
     
    }
    changeCustomerStatus = () => {
        this.setState({
            customerInfo: this.props.customerInfo
        })
    }
    render(){
        return <Map changeFactoryIndex = {this.props.changeFactoryIndex}  factoryInfo = {this.props.factoryInfo}
                    chooseCustomer = {this.props.chooseCustomer} customerInfo = {this.props.customerInfo}
                    swipeSlider = {this.props.swipeSlider} swipeSliderWay = {this.props.swipeSliderWay}
                    productsInfo = {this.props.productsInfo} showProducts = {this.props.showProducts} 
                    changeProducts = {this.props.changeProducts} prodArray = {this.props.prodArray}
                    chooseProduct = {this.props.chooseProduct} className = {this.props.className}
                    changeCustomerStatus = {this.changeCustomerStatus} factoriesArray = {this.props.factoriesArray}
                    customersCoordinates = {this.props.customersCoordinates} keyValue = {-1}/>
    }
}

let mapStateToProps = (state) => {
    return{
        factoryInfo: state.mapContentData.factories,
        productsInfo: state.mapContentData.products,
        showProducts: state.mapContentData.showProductsIndex,
        prodArray: state.mapContentData.prodArray,
        className: state.mapContentData.className,
        customerInfo: state.mapContentData.customers,
        swipeSliderWay: state.mapContentData.swipeSliderWay,
        factoriesArray: state.mapContentData.factoriesArray,
        customersCoordinates: state.mapContentData.customersArrayOfCoordinates
    };
}

let mapDispatchToprops = (dispatch) =>{
    return {
        changeFactoryIndex: (index) => {
            dispatch(getFactoryAC(index));
        },
        changeProducts: (flag, index) => {
            dispatch(getProductAC(flag, index));
        },
        chooseCustomer: (id) => {
            dispatch(chooseCustomerAC(id))//в этот АС добавляются ещё и координаты для пути
        },
        chooseProduct: (index, arIndex) => {
            dispatch(chooseProductAC(index, arIndex))//в этот АС добавляются ещё и координаты для пути
        },
        swipeSlider: (way) => {
            dispatch(swipeSlideAC(way));
        },
        getData: (token) => {
            getDataThunkCreator(token, dispatch);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(MapContainer);


/*const MapContainer = () => {
    //const [state, setState, dispatch] = useReducer(mapReducer);
    const {request} = useHttp();
    const [state, setState, dispatch] = useState(null);
    const {token} = useContext(AuthContext);
    let productsData, customersData, factoriesData;
    debugger;
    const getAllData = useCallback(async () => {
        try {
            productsData = await request('/api/data/productsData', 'GET', null, {Authorization: `Bearer ${token}`});
            console.log(productsData);
            customersData = await request('/api/data/customersData', 'GET', null, {Authorization: `Bearer ${token}`});
            factoriesData = await request('/api/data/factoriesData', 'GET', null, {Authorization: `Bearer ${token}`});
            const allData = {productsData, customersData, factoriesData};
            setState(allData);
        } catch (e) {}
    },[token, request]);
    getAllData();

    useEffect(() => {
        debugger;
        getAllData();
    },[getAllData]);

    const changeFactoryIndex = (index) => {
        dispatch(getFactoryAC(index));
    }
    const changeProducts = (flag, index) => {
        dispatch(getProductAC(flag, index));
    }
    const chooseCustomer = (id) => {
        dispatch(chooseCustomerAC(id))//в этот АС добавляются ещё и координаты для пути
    }
    const chooseProduct = (index, arIndex) => {
        dispatch(chooseProductAC(index, arIndex))//в этот АС добавляются ещё и координаты для пути
    }
    const swipeSlider = (way) => {
        dispatch(swipeSlideAC(way));
    }
    
    return <Map changeFactoryIndex = {changeFactoryIndex}  factoryInfo = {state.factories}
                    chooseCustomer = {chooseCustomer} customerInfo = {state.customers}
                    swipeSlider = {swipeSlider} swipeSliderWay = {state.swipeSliderWay}
                    productsInfo = {productsData} showProducts = {state.showProductsIndex} 
                    changeProducts = {changeProducts} prodArray = {state.prodArray}
                    chooseProduct = {chooseProduct} className = {state.className}
                    factoriesArray = {state.factoriesArrayOfCoordinates} customersCoordinates = {state.customersArrayOfCoordinates} 
                    keyValue = {-1}/>
}*/

/*
const {loading, request, error, clearError} = useHttp();

        const getProductsData = async () => {
            try {
                const data = await request('/api/auth/productsData', 'POST');
            } catch (e) {}
        }
*/