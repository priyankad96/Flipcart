import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import * as signup from '../../actions/registration/regiAction';
import {isEmail} from '../../validation/validation';
import '../login/login.css';

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSignUp = () => {
        console.log(this.props);
        const {email, password, isErr} = this.state;
        this.checkEmail();
        this.checkPassword();
        console.log(isErr+' '+email+'  '+password);
        if (!isErr && email!=='' && password!=='') {
            {
                this.props.action.signup({email, password})
                    .then(res => {
                        if (!res.data.message) {
                            this.props.history.replace('/login');
                            console.log(res);
                        } else {
                            alert(res.data.message);
                        }
                    })
            }
        }else{
            this.props.history.push('/registration');
        }
    };

    render() {
        return (
            <div className={'LoginMain'}>
                <div className={'Login'}>
                    <div className={'LoginBar'}>
                        <div className={'LoginBar'}>
                            SignUp
                        </div>
                    </div>
                    <div style={{marginTop: 16, marginLeft: 16, marginRight: 16}}>
                        <div class="input-group mb-3">
                            <input onBlur={this.checkEmail} type="email" class="form-control" name='email'
                                   placeholder="Enter Email"
                                   onChange={this.handleChange}/>
                        </div>
                        {
                            this.state.errEmail ?
                                <div style={{textAlign: 'right', color: 'red',fontWeight:'bold'}}>Please enter valid
                                    Email.</div>
                                : null
                        }
                        <div class="input-group mb-3">
                            <input onBlur={this.checkPassword} type="password" class="form-control" name='password'
                                   placeholder="Enter Password"
                                   onChange={this.handleChange}/>
                        </div>
                        {
                            this.state.errPassword ?
                                <div style={{textAlign: 'right', color: 'red',fontWeight:'bold'}}>Please enter
                                    Password.</div>
                                : null
                        }
                        <div className={'BtnLogin'} onClick={this.handleSignUp}>CONTINUE</div>
                        <Link to={'/login'}><div className={'BtnSingUp'} onClick={this.toggle}>Existing User?Log in</div></Link>
                    </div>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        action: {
            signup: bindActionCreators(signup.signUp, dispatch)
        }
    }
}

export default connect(null, mapDispatchToProps)(Registration);