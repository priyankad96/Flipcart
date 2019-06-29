import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {isEmail} from '../../validation/validation';
import * as login from '../../actions/login/loginActions';
import './login.css';

class Login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errEmail: false,
            errPassword: false,
            isErr: false,
        }
    }

    checkEmail = () => {
        const {email} = this.state;
        if (email === '') {
            this.setState({errEmail: true});
            this.setState({isErr: true});
        }
        else if(!email.match(isEmail)){
            this.setState({errEmail: true});
            this.setState({isErr: true});
        }
        else{
            this.setState({errEmail: false});
            this.setState({isErr: false});
        }
    }

    checkPassword=()=>{
        const {password} = this.state;
        if (password === '') {
            this.setState({errPassword: true});
            this.setState({isErr: true});
        }
        else{
            this.setState({errPassword: false});
            this.setState({isErr: false});
        }
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    };

    handleLogin=()=>{
        // debugger
        const {isErr,email,password}=this.state;
        this.checkEmail();
        this.checkPassword();
       // console.log(isErr+' '+email+'  '+password);
         if(!isErr && email!=='' && password!==''){
             this.props.action.loginAction({email,password})
                 .then(res=>{
                     // console.log(res);
                     // debugger
                     if(res.result){
                         // console.log(res);
                         alert(res.message);
                         if(res.role==='admin'){
                             this.props.history.replace('/product');
                         }else{
                             this.props.history.replace('/');
                         }
                     }else{
                         alert(res.message);
                     }
                 })
         }
    }

    render() {
        return (
            <div className={'LoginMain'}>
                <div className={'Login'}>
                    <div className={'LoginBar'}>
                        <div className={'LoginBar'}>
                            LogIn
                        </div>
                    </div>
                    <div style={{margin: 16}}>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" onBlur={this.checkEmail}  value={this.state.email} name='email' placeholder="Enter Email"
                                   onChange={this.handleChange}/>
                        </div>
                        {
                            this.state.errEmail ?
                                <div style={{textAlign: 'right', color: 'red',fontWeight:'bold'}}>Please enter valid
                                    Email.</div>
                                : null
                        }
                        <div className="input-group mb-3">
                            <input type="password" onBlur={this.checkPassword} className="form-control" value={this.state.password} name='password' placeholder="Enter Password"
                                   onChange={this.handleChange}/>
                        </div>
                        {
                            this.state.errPassword ?
                                <div style={{textAlign: 'right', color: 'red',fontWeight:'bold'}}>Please enter
                                    Password.</div>
                                : null
                        }
                        <div className={'BtnLogin'} onClick={this.handleLogin}>Login</div>
                        <Link to={'/registration'}>
                            <div className={'BtnSingUp'} >New User? Sign up</div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        userInfo:state.login.userInfo,
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        action:{
            loginAction:bindActionCreators(login.login,dispatch),
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);