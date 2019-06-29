import React from 'react';
import {Route,Switch} from 'react-router-dom';

import Home from './component/home/home';
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

import Layout from './layout/layout';
//import Layout from './layout/FLayout';
function App() {
    const admin = 'admin';
    const user = 'user';
    return (
        <div>
            <Layout>
                <Switch>
                <div className={'App'}>
                    {/*<CRoute exact path={'/home'} component={Home}/>*/}
                    <CRoute exact path={'/'} component={Items}/>
                    <CRoute path={'/login'} component={Login}/>
                    <CRoute path={'/registration'} component={Registration}/>
                    {/*<CRoute cprivate crole={[admin,user]} path={'/items'} component={Items}/>*/}
                    {/*<CRoute exact path={'/'} component={PageNotFound}/>*/}
                    {/*<CRoute  cprivate crole={[admin]} path={'/product'}  component={Product}/>*/}
                    <CRoute  path={'/product'}  component={Product}/>
                    <CRoute  path={'/addtocart'}  component={AddToCart}/>
                    <CRoute path={'/addproduct'} component={AddProduct}/>
                    <CRoute path={'/editproduct'} component={UpdateProduct}/>
                    <CRoute path={'/unauthorised'} component={UnauthorisedAccess}/>
                </div>
                </Switch>
            </Layout>
        </div>
    );
}

export default App;
