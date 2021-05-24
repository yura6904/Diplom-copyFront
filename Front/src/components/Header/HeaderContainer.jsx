import React, {useReducer, useEffect, useContext} from 'react';
import {headerReducer, toggleMenuAC, toggleLinkAC} from '../../redux/header-reducer';
import { AuthContext } from '../../context/AuthContext';
import {useHistory} from 'react-router-dom'; 
import Header from './Header';

const HeaderContainer = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }
    const [state, dispatch] = useReducer(headerReducer,
        [
            {
                burgerClass: 'header_burger',
                menuClass: 'header_menu'
            },
            {
                header: [
                    {
                        id: 0,
                        name: 'Карта',
                        class: 'header_link',
                        activeClass: 'header__link_active',
                        way: '/map',
                        active: false
                    },
                    {
                        id: 1,
                        name: 'База Данных',
                        class: 'header_link',
                        activeClass: 'header__link_active',
                        way: '/dataBase',
                        active: false
                    },
                    {
                        id: 2,
                        name: 'Инструкция',
                        class: 'header_link',
                        activeClass: 'header__link_active',
                        way: '/instruction',
                        active: false
                    },
                    {
                        id: 3,
                        name: 'О сайте',
                        class: 'header_link',
                        activeClass: 'header__link_active',
                        way: '/aboutSite',
                        active: false
                    },
                ]
            },
            {
                activeLink: false
            }            
        ]
    )

    useEffect(() => {
        if (state.activateMenu){
            state[0].burgerClass = 'header_burger active';
            state[0].menuClass = 'header_menu active';
        }

        else {
            state[0].burgerClass = 'header_burger';
            state[0].menuClass = 'header_menu';
        }
    }, [state.activateMenu]);

    useEffect(() => {
        if (state[2].activeLink){
            state[2].activeLink = true;
        }

        else {
            state[2].activeLink = false;
        }
        
    }, [state[2].activeLink]);

    const toggleMenu = () => {
        dispatch (toggleMenuAC());
    }
    const toggleLink = () => {
        dispatch (toggleLinkAC());
    }
    return <Header toggleMenu = {toggleMenu} toggleLink = {toggleLink} menuClassName = {state} logout = {logoutHandler}/>    
}

export default HeaderContainer;