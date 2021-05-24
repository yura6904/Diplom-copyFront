import React from 'react';
import {AuthAPI} from '../api/authAPI';
import { getFactories, getProducts, getCustomers } from '../api/dataAPI';

const CHOOSE_FACTORY = 'CHOOSE_FACTORY';
const CHOOSE_PRODUCT = 'CHOOSE_PRODUCT';
const GET_PRODUCTS = 'GET_PRODUCTS';
const CHOOSE_CUSTOMER = 'CHOOSE_CUSTOMER';
const SWIPE_SLIDE = 'SWIPE_SLIDE';
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_FACTORIES = 'SET_FACTORIES';
const SET_CUSTOMERS = 'SET_CUSTOMERS';

let initialState = {
    factories: [],    
    products: [],
    customers: [],
    prodArray: [],

    className: 'check',
    showProductsIndex: 0,
    swipeSliderWay: 0,
    factoriesArray: [], //массив заводов, для построения координат
    factoriesArrayOfCoordinates: [], //массивы координат заводов и заказчиков
    customersArrayOfCoordinates:[],
}        
        
export const getDataThunkCreator = (token, dispatch) =>  {
    debugger;
    getProducts(token).then((data) => {
        dispatch(setProductsAC(data));
    });
    getFactories(token).then((data) => {
        dispatch(setFactoriesAC(data));
    });
    getCustomers(token).then((data) => {
        dispatch(setCustomersAC(data));
    });
}
export const setProductsAC = (data) => ({type: SET_PRODUCTS, data});
export const setFactoriesAC = (data) => ({type: SET_FACTORIES, data});
export const setCustomersAC = (data) => ({type: SET_CUSTOMERS, data});
export const getFactoryAC = (index) => ({type: CHOOSE_FACTORY, index});
export const getProductAC = (flag, index) => ({type: GET_PRODUCTS, flag, index});
export const chooseProductAC = (index, arIndex) => ({type: CHOOSE_PRODUCT, index, arIndex});
export const chooseCustomerAC = (id) => ({type: CHOOSE_CUSTOMER, id});
export const swipeSlideAC = (way) => ({type: SWIPE_SLIDE, way});

export const mapReducer = (state = initialState, action) => {
    const pushArray = (index) => {
        state.prodArray = [];
        if (index + 3 <= state.products.length) {
            for (let i = index; i < index + 3; i++) {
                state.prodArray.push(state.products[i]);
            }
        }
        else {
            for (let i = index; i < state.products.length; i++) {
                state.prodArray.push(state.products[i]);
            }
        }

    }
    //заполнение массива заводов
    const chooseFactories = (indexProd) => {
        if (state.products[indexProd].checked) { 
            debugger;
            let factories = state.factoriesArray;
            let indexOfOneFactory = 0;
            let deletLastFactory = false;
            let chosenFactory = 0;
            let flagStopPushFact = false;
            factories.push(state.products[action.index].factoriesID);
            if (factories.length > 1) {
                for ( let i = 0; i < factories.length-1; i++) {
                    if (!flagStopPushFact) {                    
                        let factoryChosenFlag = false;
                        let countSum = 0;                    
                        for ( let j = 0; j < factories[i].length; j++) {                        
                            for ( let x = i+1; x < factories.length; x++) {
                                for ( let y = 0; y < factories[x].length; y++) {
                                    if (factories[i][j] === factories[x][y]) {
                                        factoryChosenFlag = true;
                                        deletLastFactory = true;
                                        countSum++;
                                        chosenFactory = factories[x][y];
                                    }
                                }
                                if (!factoryChosenFlag){
                                    indexOfOneFactory = x;
                                    chosenFactory = state.products[action.index].factoriesID[0];
                                }
                            }
                        }
                        if (countSum > 0) { //если сумма больше 0, то остается это же значение
                            factories[i] = [chosenFactory];
                            flagStopPushFact = true;
                        }
                        if (factories[indexOfOneFactory].length === 1 && !factoryChosenFlag || factories.length < 3) {
                            chosenFactory = state.products[action.index].factoriesID[0];
                            factories[indexOfOneFactory] = [chosenFactory];
                            flagStopPushFact = false;

                        }
                        else {
                            continue;
                        }
                    }
                }
                state.factories[chosenFactory].productsId.push(indexProd);//завод, в который нужно вписать выбранный продукт
                if (deletLastFactory) {
                    factories.pop();
                }
            }
            else {
                //для 1 массива
                factories = [[state.products[action.index].factoriesID[0]]];
                state.factories[state.products[action.index].factoriesID[0]].productsId.push(indexProd);//завод, в который нужно вписать выбранный продукт
            }
            //проверка и удаление дубликатов, если есть в массиве заводов !!!!!!!!!!!!!!!!!
            state.factoriesArray = factories;
        }
        else {
            debugger;
            //удаляем завод из массива
            let factInd = state.factoriesArray;
            let stopDeleteFactories = false;
            let checkingFactories = state.products[indexProd].factoriesID;
            for (let i = 0; i < checkingFactories.length; i++) {
                if (!stopDeleteFactories){
                    let productsInFactory = state.factories[checkingFactories[i]].productsId;
                    if (productsInFactory.length !== 0){
                        let indexToDelete = productsInFactory.indexOf(indexProd);
                        let indToDelFactInfactInd;
                        for (let j = 0; j < factInd.length; j++) {
                            if (factInd[j][0] === checkingFactories[i])
                            indToDelFactInfactInd = j;
                        }
                        if (indexToDelete != undefined && indexToDelete != -1) {
                            if (productsInFactory.length === 1) {//===0 скип еще добавить
                                productsInFactory.pop();
                                //factInd.pop()

                                if (indToDelFactInfactInd === 0) {
                                    factInd.shift();
                                }
                                if (indToDelFactInfactInd > 0 && indToDelFactInfactInd < factInd.length-1) {
                                    let beforeDel = factInd.slice(0,indToDelFactInfactInd);
                                    let afterDel = factInd.slice(indToDelFactInfactInd+1,factInd.length);
                                    factInd = beforeDel;
                                    afterDel.forEach(e => {factInd.push(e)});
                                }
                                if (indToDelFactInfactInd === factInd.length-1 && indToDelFactInfactInd !== 0) {
                                    factInd.pop();
                                }

                                state.factoriesArray = factInd;
                                state.factories[checkingFactories[i]].productsId = productsInFactory;
                                stopDeleteFactories = true;
                            }
                            else {
                                let deleteProdInFactory = productsInFactory.indexOf(indexProd);
                                if (deleteProdInFactory === 0) {
                                    productsInFactory.shift();
                                }
                                if (deleteProdInFactory > 0 && deleteProdInFactory < productsInFactory.length-1) {
                                    let beforeDeleteIndex = productsInFactory.slice(0, deleteProdInFactory);
                                    let afterDeleteIndex = productsInFactory.slice(deleteProdInFactory+1, productsInFactory.length);
                                    productsInFactory = beforeDeleteIndex;
                                    afterDeleteIndex.forEach(e=>{productsInFactory.push(e)});
                                }
                                if (deleteProdInFactory === productsInFactory.length-1 && deleteProdInFactory !== 0) {
                                    productsInFactory.pop();
                                }
                                state.factories[state.products[indexProd].factoriesID[i]].productsId = productsInFactory;

                                //чистим, если нужно factoriesArray
                                if (state.factories[state.products[indexProd].factoriesID[i]].productsId.length > 0) {
                                    state.factoriesArray = factInd;
                                }
                                else {
                                    if (indToDelFactInfactInd === 0) {
                                        factInd.shift();
                                    }
                                    if (indToDelFactInfactInd > 0 && indToDelFactInfactInd < factInd.length-1) {
                                        let beforeDel = factInd.slice(0,indToDelFactInfactInd);
                                        let afterDel = factInd.slice(indToDelFactInfactInd,factInd.length);
                                        factInd = beforeDel + afterDel;
                                    }
                                    if (indToDelFactInfactInd === factInd.length-1 && indToDelFactInfactInd !== 0) {
                                        factInd.pop();
                                    }
                                    state.factoriesArray = factInd;
                                }
                                stopDeleteFactories = true;
                                state.factoriesArray = factInd;
                            }
                        }
                    }                    
                }
                else {
                    break;
                }
            }
        }
    }
    //выставляем координаты
    const factoriesCoordinates = () => {
        let factoriesArrayOfCoordinates = [];
        let factories = state.factoriesArray;
    }
    switch (action.type) {
        case CHOOSE_FACTORY: {
            return {...state, factoryIndex: action.index}
        }
        case GET_PRODUCTS: {
            if (action.flag && action.index >= state.products.length-3) {}   
            else if (!action.flag && action.index !== 0) {
                state.showProductsIndex -= 3;
                pushArray(state.showProductsIndex);
            }
            else if (!action.flag && action.index === 0)
                state.showProductsIndex = 0;
            else if (action.flag && action.index >= 0 && action.index < state.products.length) {
                state.showProductsIndex += 3;
                pushArray(state.showProductsIndex);
            }
            return {...state};
        }
        case CHOOSE_PRODUCT: {
            debugger;
            state.products[action.index].checked = !state.products[action.index].checked;
            state.prodArray[action.arIndex].checked = state.products[action.index].checked;
            //заполнение массива заводов
            chooseFactories(action.index);
            //координаты
            factoriesCoordinates();
            if (state.prodArray[action.arIndex].checked && state.className === 'check') return {...state, className: 'active_check'}
            else if (!state.prodArray[action.arIndex].checked && state.className === 'active_check') return {...state, className: 'check'}
            else if (!state.prodArray[action.arIndex].checked && state.className === 'check') return {...state, className: 'active_check'}
            else return {...state, className: 'check'}
        }
        case CHOOSE_CUSTOMER: {
            debugger;
            state.customers[action.id].checked = !state.customers[action.id].checked;
            //заполнение массива заказчиков
            let coordinates = state.customers[action.id].coordinates;
            if(state.customers[action.id].checked){
                state.customersArrayOfCoordinates.push(coordinates);
            }
            else {
                let indexToDelete = state.customersArrayOfCoordinates.indexOf(coordinates);
                if (state.customersArrayOfCoordinates.length === 1) {
                    state.customersArrayOfCoordinates = [];
                }
                else if ((indexToDelete === 0) && (state.customersArrayOfCoordinates.length === 1)) {
                    state.customersArrayOfCoordinates.slice(1, state.customersArrayOfCoordinates.length);
                }
                else if ((indexToDelete === state.customersArrayOfCoordinates.length - 1) && (state.customersArrayOfCoordinates.length > 1)) {
                    state.customersArrayOfCoordinates = state.customersArrayOfCoordinates.slice(0, indexToDelete);
                }
                else {
                    let arrayBeforeDeleteInd = [];
                    let arrayAfterDeleteInd = [];
                    arrayBeforeDeleteInd = state.customersArrayOfCoordinates.slice(0, indexToDelete);
                    arrayAfterDeleteInd = state.customersArrayOfCoordinates.slice(indexToDelete+1, state.customersArrayOfCoordinates.length);
                    state.customersArrayOfCoordinates = [];
                    arrayBeforeDeleteInd.forEach(element => {state.customersArrayOfCoordinates.push(element)});
                    arrayAfterDeleteInd.forEach(element => {state.customersArrayOfCoordinates.push(element)});                    
                }
            } 
            return {...state};
        }
        case SWIPE_SLIDE: {
            state.swipeSliderWay = action.way;
            return {...state}
        }
        case SET_PRODUCTS: {
            state.products = action.data.products;
            for (let i = 0; i < 3; i++) {
                state.prodArray.push(action.data.products[i]);
            }
            state.products.forEach(p => {
                p.checked = false;
            });
            return {...state}
        }
        case SET_FACTORIES: {
            debugger;
            state.factories = action.data.factories;
            state.factories.forEach(f => {
                f.productsId = [];
            })
            return {...state}
        }
        case SET_CUSTOMERS: {
            debugger;
            state.customers = action.data.customers;
            state.customers.forEach(c => {
                c.checked = false;
            });
            return {...state}
        }
        default: {
            return state;
        }
    }
}