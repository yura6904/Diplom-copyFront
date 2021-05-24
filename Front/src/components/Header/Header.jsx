import React from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";
import logo from '../assets/logo.svg';

const Header = (props) => {
    return (
        <div>
            <header className = 'header'>
                <a className = 'header_logo' href="#">
                    <img src= {logo} alt=""/>
                </a>
                <div className = {props.menuClassName[0].burgerClass} onClick = {() => {props.toggleMenu()}}>
                    <span></span>
                </div>
                <nav className = {props.menuClassName[0].menuClass}>
                    <ul className = 'header_list'>
                        {props.menuClassName[1].header.map((element) => {
                            return (
                                <div key = {element.id}>
                                    <li key = {element.id}> <NavLink  className = {props.menuClassName[2].activeLink ? element.activeClass : element.class}
                                         onClick = {() => {props.toggleLink()}} to = {element.way}> {element.name} </NavLink> </li>
                                </div>
                            );
                        })}
                        <li>
                            <a  className = {'header_link'}
                                         onClick = {props.logout}> Выйти </a></li>
                    </ul>
                </nav>
            </header>        
        </div>

    );
}

export default Header;