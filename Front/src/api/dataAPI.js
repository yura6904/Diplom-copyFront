import React from 'react';

export const getProducts = async (token) => { //получаю данные, сетаю их в стейт
    let productsData   
    try {
        debugger;
        let responceProducts = await fetch('/api/auth/productsData', {
            method: 'GET', 
            body: null,
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(function(data) {
            productsData = data.json();
            console.log(productsData);

        });
        console.log(productsData);
        return productsData;
    } catch (e) {
        console.log(e.message)
    }
} 
export const getCustomers = async (token) => { //получаю данные, сетаю их в стейт
    let customersData;
    
    try {        
        let responceCustomers = await fetch('/api/auth/customersData', {
            method: 'GET', 
            body: null,
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(function(data) {
            customersData = data.json();
            console.log(customersData);
        });
        console.log(customersData);
        return customersData;
    } catch (e) {
        console.log(e.message)
    }
} 
export const getFactories = async (token) => { //получаю данные, сетаю их в стейт
    let factoriesData;
    
    try {
        let responceFactories = await fetch('/api/auth/factoriesData', {
            method: 'GET', 
            body: null,
            headers: {Authorization: `Bearer ${token}`}
        })

        .then(function(data) {
            factoriesData = data.json();
            console.log(factoriesData);
        });
            
        console.log(factoriesData);
        return factoriesData;
    } catch (e) {
        console.log(e.message)
    }
} 