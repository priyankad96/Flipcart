import React, {Component} from 'react';
import Radium, {StyleRoot} from 'radium';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Login from '../../container/login/login';
import {withRouter} from 'react-router-dom';
import './header.css';
import {Row, Col, Input, Avatar, Icon} from 'antd';
import {Link} from "react-router-dom";
import * as logout from "../../actions/login/loginActions";
import * as product from "../../actions/product/productAction";

const Search = Input.Search;


class Header extends Component {
    constructor(props){
        super();
        this.state={
            products:[],
        }
    }

    handleLogout = () => {
        this.props.logOut();
        window.location.reload();
    };

    search=(key)=>{
        debugger
        this.props.searchProduct(key).then((res)=>{
           if(res){
               console.log('h',res);
               this.props.history.push('/searchproduct');
           }
        });
    };

    render() {
        debugger
        const style = {
            '@media (min-width:1000px)': {
                width: '950px'
            }
        };
        const token=localStorage.getItem('token');
        return (
            <StyleRoot>
                <div>
                    <Row align='middle' type='flex' justify='space-around'
                         style={{backgroundColor: '#2874f0', height: 56,position:'relative',width:'100%'}}>
                        <Col span={2}></Col>
                        <Col span={2}>
                            <Row type='flex' justify='end' style={{paddingRight: 2}}>
                                <a href='/' className='Right'>
                                    <img width='75'
                                         src='https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_4ee2f9.png'
                                         alt='FlipKart' title='Flipkart'/>
                                </a>
                                <a href='/Plus' style={{
                                    fontSize: 12,
                                    fontStyle: 'italic',
                                    marginTop: -1,
                                    color: '#FFFFFF',
                                    fontWeight: 550
                                }}>
                                    Explore
                                    <span style={{color: '#ffe500', fontWeight: 550, paddingRight: 2}}>Plus</span>
                                    <img width="10"
                                         src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/plus_b13a8b.png"
                                         alt={'responsive-image'}/>
                                </a>
                            </Row>
                        </Col>
                        <Col span={10} style={{paddingLeft: 10, paddingRight: 10}}>
                            <Search
                                placeholder="Search for products,brands and more"
                                onSearch={(value) => this.search(value)}
                            />
                        </Col>
                        <Col span={2}/>
                        <Col span={2}/>
                        <Col span={2}>
                            <Row type='flex' justify='space-around' style={{paddingRight: 2}}>
                                {
                                    (!token) ?
                                        (
                                            <Link to={'/login'}>
                                                <div
                                                    style={{
                                                        fontSize: 15,
                                                        marginTop: -1,
                                                        color: '#FFFFFF',
                                                        fontWeight: 'bold'
                                                    }}>
                                                    Login & SignUp
                                                </div>
                                            </Link>
                                        ) :
                                        (
                                            <div
                                                onClick={this.handleLogout}
                                                style={{
                                                    fontSize: 15,
                                                    marginTop: -1,
                                                    color: '#FFFFFF',
                                                    fontWeight: 'bold'
                                                }}>
                                                LogOut
                                            </div>
                                        )
                                }

                            </Row>
                        </Col>
                        <Col span={2}>
                            <Row type='flex' justify='end' style={{paddingRight: 2}}>
                                <a href='#'>
                                    <Icon type="shopping-cart" style={{fontSize: 25, color: '#ffffff'}}/>
                                    <span style={{
                                        fontSize: 15,
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                        paddingLeft: 2
                                    }}>Cart</span>
                                </a>
                            </Row>
                        </Col>
                        <Col span={2}></Col>
                    </Row>

                </div>
            </StyleRoot>
        )
    }
}

const mapStateToProps = state=> {
    return{
        products:state.product.product,
    }
}

const mapDispatchToProps = dispatch => {
    const {logOut} = logout;
    const {fetchProduct,searchProduct} = product;
    return bindActionCreators({fetchProduct, logOut,searchProduct   }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(Header)));
