import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';

import Login from './container/login/login';
import Registration from './container/registration/registration';
import Items from './container/Items/items';
import Product from './container/admin/product/product';
import AddToCart from './container/addToCart/addToCart';
import AddProduct from './container/addToCart/addProductModel';
import UpdateProduct from './component/updateProduct/updateProduct';
import PageNotFound from './pageNotFound/page-not-found';
import UnauthorisedAccess from './unauthorisedAccess/unauthorisedAccess';
import CRoute from './customRoute/customRoute';
import './service/App.css';

//import Layout from './layout/layout';
import Layout from './layout/FLayout';
import Header from "./layout/Header/header";
import Navbar from "./layout/Navbar/navbar";
import Super from "./HOC/hoc";
import AllDeal from './container/allDeal/allDeal';
class App extends Component {
    componentDidMount() {
        console.log('app',this.props)
    }
    render() {
        const admin = 'admin';
        const user = 'user';
        return (
            <div>
                {/*<Layout/>*/}
                <Header/>
                <Navbar/>
                <Switch>
                    <div className={'App'} >
                        {/*<CRoute exact path={'/home'} component={Home}/>*/}
                        <CRoute exact path={'/'} component={Items}/>
                        <CRoute path={'/login'} component={Login}/>
                        <CRoute path={'/registration'} component={Registration}/>
                        {/*<CRoute cprivate crole={[admin,user]} path={'/items'} component={Items}/>*/}
                        {/*<CRoute exact path={'/'} component={PageNotFound}/>*/}
                        {/*<CRoute  cprivate crole={[admin]} path={'/product'}  component={Product}/>*/}
                        <CRoute path={'/product'} component={Product}/>
                        <CRoute path={'/addtocart'} component={AddToCart}/>
                        <CRoute path={'/addproduct'} component={AddProduct}/>
                        <CRoute path={'/editproduct'} component={UpdateProduct}/>
                        <CRoute path={'/alldeal'} component={AllDeal}/>
                        <CRoute path={'/unauthorised'} component={UnauthorisedAccess}/>
                    </div>
                </Switch>
            </div>

        );
    }
}
export default App;
