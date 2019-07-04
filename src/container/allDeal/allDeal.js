import React, {Component} from 'react';
import './allDeal.css';
import {connect} from 'react-redux';
import * as product from "../../actions/product/productAction";
import {bindActionCreators} from "redux";
import {url} from '../../axios-demo';


class AllDeal extends Component {
    constructor() {
        super();
        this.state = {
            product: [],
        }
    }

    componentDidMount() {
        if(this.props.location.pathname==='/searchproduct'){
           const {products}=this.props;
            this.setState({product: products});
        }else {
            this.props.fetchProduct().then((res) => {
                this.setState({product: res});
            })
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const {products}=this.props;
        if(products!==nextProps){
            this.setState({product:nextProps.products});
        }
    }

    productDesc=(id)=>{
        this.props.history.push(`/productdesc/${id}`);

    };

    render() {
        const {product} = this.state;
        return (
            <div className={'AllDeal'}>
                <div className={'Deals'}>
                    {
                        this.props.location.pathname==='/alldeal'&&
                        <div className={'Name'}>
                            <div style={{fontSize: 24, fontFamily: 'Arial', color: '#212121', fontWeight: 600}}>
                                Flipstart Deals of the Day
                            </div>
                            <div style={{fontSize: 14, fontFamily: 'Arial', color: '#212121', opacity: 0.5, marginTop: 8}}>
                                45 Items
                            </div>
                        </div>
                    }

                    <div className={'Product'}>
                        {
                            product ?
                                ( product.map((item, i) => (
                                    <div className={'Block'} key={i}  onClick={()=>this.productDesc(item.id)}>
                                        <div className={'Img'}>
                                            <img src={`${url}/img/${item.image}`} className={'Img'}
                                                 alt={'responsive-img'}/>
                                        </div>
                                        <div className={'Text1'} style={{marginTop: 15, height: 19, fontWeight: 'bold'}}>
                                            {item.product}
                                        </div>
                                        <div className={'Text1'} style={{padding: 8, height: 27, color: '#388E3C'}}>
                                            {item.price}
                                        </div>
                                        <div className={'Text1'} style={{padding: 7, height: 26, opacity: 0.5}}>
                                            {item.description}
                                        </div>
                                    </div>
                                )) ): (
                                    <div>
                                        <h1>No Record Found</h1>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state=> {
    return{
        products:state.product.product,
    }
}

const mapActionToProps = dispatch => {
    const {fetchProduct} = product;
    return bindActionCreators({fetchProduct}, dispatch);

};

export default connect(mapStateToProps, mapActionToProps)(AllDeal);