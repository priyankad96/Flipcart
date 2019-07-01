import React,{Component} from 'react';
import Super from '../HOC/hoc';
import Header from '../layout/Header/header';
import Navbar from '../layout/Navbar/navbar';
import * as logout from "../actions/login/loginActions";
class Layout extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <Super>
                <Header/>
                <Navbar/>
                <main>
                    {this.props.children}
                </main>
            </Super>
        )
    }
}

export default Layout;