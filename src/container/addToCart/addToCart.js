import React, {Component} from 'react';
import {connect} from 'react-redux';


import * as product from '../../actions/product/productAction';
import ViewProduct from './pagination';

class Product extends Component {

    constructor() {
        super();
        this.state = {}
    }


    handleGoBack = () => {
        //console.log(this.props);
        this.props.history.goBack();
    }

    render() {
        const {check, disable} = this.state;
        return (
            <div>
                <div><strong><h2>Products</h2></strong></div>
                <hr/>
                <ViewProduct selectedProduct={this.props.selectedProduct}/>

                <div style={{textAlign: 'right'}}>
                    <button type="button" className="btn btn-dark" onClick={this.handleGoBack}>GO BACK</button>
                    {' '}&nbsp;
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedProduct: state.product.selectedProduct,
    }
};


export default connect(mapStateToProps, null)(Product);