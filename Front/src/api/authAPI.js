import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useMessage } from '../components/Authorization/messageHook';
import {useHttp} from './requestHttp';

export const AuthAPI = (form) => {
    const {request, loading, error, clearError} = useHttp();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const loadingForm = loading;

    useEffect(() => {
        message(error);
        clearError();
    },[error, message, clearError])

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
            loadingForm = loading;
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            debugger;
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
            return data;
        } catch (e) {}        
    }

    return {loginHandler, registerHandler, loadingForm};    
}

//сделать простые запросы fetch или axios

export default AuthAPI;
