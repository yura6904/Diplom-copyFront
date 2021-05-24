import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import { useAuth } from './components/Authorization/authHook';
import {AuthorizationContainer} from './components/Authorization/AuthorizationContainer';
import DataBaseContainer from './components/DataBase/DataBaseContainer';
import MapContainer from './components/Map/MapContainer';
import { getDataThunkCreator } from './redux/map-reducer';
//TODO: отслеживать изменение store после обновления страницы через токен. Если авторизирован юзер, то делать запрос на сервер. 
export const useRoutes = isAuthetificated => {
    const {token, login, logout, userId} = useAuth();
    const dispatch = useDispatch();

    debugger;
    if (isAuthetificated) {
        //тут запрос на получение данных
        return (
            <Switch>
                <Route path = '/map' exact>
                    <MapContainer token = {token}/>
                </Route>
                <Route path = '/dataBase' exact>
                    <DataBaseContainer />
                </Route>
                <Route path = '/aboutSite' exact>
                </Route>
                <Redirect to = "/map" />
            </Switch>
        )        
    }
    return (
        <Switch>
            <Route path = '/' exact>
                <AuthorizationContainer/>
            </Route>
            <Redirect to = '/' />
        </Switch>
    )
}