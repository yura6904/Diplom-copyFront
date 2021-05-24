import React, {useState, useEffect, useContext} from 'react';
import Authorization from './Authorization';
import './Authorization.css';
import 'materialize-css';
import { AuthAPI } from '../../api/authAPI'
import {getDataThunkCreator} from '../../redux/map-reducer';
import { connect, useDispatch } from 'react-redux';

export const AuthorizationContainer = (props) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const {registerHandler, loginHandler, loadingForm} = AuthAPI({...form});

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }
    
    const register = async () => {
        registerHandler();
    }
    const login = async () => { 
        debugger;
        await loginHandler({...form}).then(function(data) {
            getDataThunkCreator(data.token, dispatch);
        });
    }
    return (<Authorization registerHandler = {register} loginHandler = {login} changeHandler = {changeHandler} loading = {loadingForm}/>)
}