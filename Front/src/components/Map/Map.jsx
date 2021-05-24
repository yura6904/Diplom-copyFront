import React from 'react';
import './Map.css';
import Slider from './Slider/Slider';
import './Slider/Slider.css';
import './GoogleMap/MapGoogle';
import {MapGoogle} from './GoogleMap/MapGoogle';
//AIzaSyAysOBaBATSCoFAqT0uqNlnXwhh0sTndgs - API Google Maps

const Map = (props) => {
    return (        
        <div>
            <div className = 'content'>                
                <div className = 'map_container'>
                    <MapGoogle factoryInfo = {props.factoryInfo} customerInfo = {props.customerInfo} factoriesArray = {props.factoriesArray}/>
                </div>

                <div className = 'registration_container'>
                    <div className = 'customers_container'>
                        <p>Список заказчиков: </p>
                        <div className = 'check_customer_container'>
                            {props.customerInfo.map((customer) => {
                                return (
                                    <div className = 'customer' key = {customer._id}>
                                        <label  className = 'customer_check' key = {customer._id}>
                                            <input type = 'checkbox' onClick = {() => {
                                                props.chooseCustomer(customer._id);
                                                props.changeCustomerStatus();
                                            }}  key = {customer._id}/>                                        
                                            <span></span>
                                            {' Название организации: ' + customer.name + '; Контакты: ' + customer.contacts}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className = 'products'><br />
                        <p>Список товаров: </p>
                        <Slider elementsArray = {props.prodArray} chooseElements = {props.chooseProduct} swipeSlider = {props.swipeSlider}
                        changeElements = {props.changeProducts} showElements = {props.showProducts} swipeSliderWay = {props.swipeSliderWay}/>                   
                    </div>
                </div>
            </div>              
        </div>
    );
}
export default Map;