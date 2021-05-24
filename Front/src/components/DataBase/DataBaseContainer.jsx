import React from 'react';
import DataBase from './DataBase';
import {connect} from 'react-redux';

class DataBaseContainer extends React.Component {

    componentDidMount() {
        //axios api    
    }
    componentDidUpdate(prevProps, prevState) {
        //реагируем на изменение state
    }
    crypto() {
        
    }
    render(){
        return <DataBase  factoryInfo = {this.props.factoryInfo}
                    customerInfo = {this.props.customerInfo}
                    productsInfo = {this.props.productsInfo}
                    factoryInfo0 = {this.props.factoryInfo0}
                    customerInfo0 = {this.props.customerInfo0}
                    productsInfo0 = {this.props.productsInfo0}
                    cryptoRed = {this.props.crypto} crypt = {this.props.crypt} />
    }
}

let mapStateToProps = (state) => {
    return{
        factoryInfo: state.mapContentData.factories,
        productsInfo: state.mapContentData.products,
        customerInfo: state.mapContentData.customers,
        factoryInfo0: state.mapContentData.factories0,
        productsInfo0: state.mapContentData.products0,
        customerInfo0: state.mapContentData.customers0,
        crypt: state.mapContentData.crypt
    };
}

let mapDispatchToprops = (dispatch) =>{
    return{
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(DataBaseContainer);