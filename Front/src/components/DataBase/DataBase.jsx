import React from 'react';
import './DataBase.css';

const DataBase = (props) => {   
    return (        
        <div className = "dataBase">
            <div className = "factories"><p>Заводы</p>
                <table className = "factories_table">
                    <th id = "f1">Название завода</th>
                    <th id = "f2">Адрес</th>
                    <th id = "f3">Координаты</th>                    
                        {props.factoryInfo.map((factory) => {
                            debugger;
                            return(      
                                <tr key = {factory.id}>           
                                    <td>{factory.name}</td>
                                    <td>{factory.address}</td>
                                    <td>{factory.coordinates[0] + " " + factory.coordinates[1]}</td>
                                </tr>
                            )
                        })}
                </table>
            </div>

            <div className = "customers"><p>Заказчики</p>
                <table className = "customers_table">
                    <th id = "c1">Название организации</th>
                    <th id = "c2">Адрес</th>
                    <th id = "c3">Координаты</th>                    
                        {props.customerInfo.map((customer) => {
                            debugger;
                            return(      
                                <tr key = {customer.id}>           
                                    <td>{customer.name}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.coordinates[0] + " " + customer.coordinates[1]}</td>
                                </tr>
                            )
                        })}
                </table>
                
            </div>

            
            <input className = "crypt" type = "button" value = {props.crypt ? "Расшивровать" : "Зашифровать"}
            onClick = {()=>{if (!props.crypt){ crypto(props.factoryInfo, false);crypto(props.customerInfo, false);}
                            else {crypto(props.factoryInfo, true);crypto(props.customerInfo, true);}; props.cryptoRed()}}/>

            <input className = "save" type = "button" value = "Сохранить изменения"/>

        </div>
    );
}
export default DataBase;