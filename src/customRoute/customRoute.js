import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class CRoute extends Component {
    getExtractedJson({ component, cprivate, crole, actions, userInfo, ...rest }) {
        return rest;
    }
    render() {
        // console.log(this.props);
        const rest = this.getExtractedJson(this.props);
        const isUserLoggedIn = this.props.userInfo.token && this.props.userInfo.token !== '';
        const userCurrentRole = this.props.userInfo.role;
        // console.log('role:'+userCurrentRole)
        const { component, cprivate, crole } = this.props;
        const Component = component;

        let redirectTo = undefined;
        if (isUserLoggedIn && rest.path === '/login' && userCurrentRole==='user')
            redirectTo = '/items';
        else if (isUserLoggedIn && rest.path === '/login' && userCurrentRole==='admin')
            redirectTo = '/product';
        else if (!isUserLoggedIn && cprivate)
            redirectTo = '/login';
        else if (isUserLoggedIn && cprivate && crole && crole.filter((item) => item === userCurrentRole).length === 0)
            redirectTo = '/unauthorised';

        return (
            <Route
                {...rest}
                render={props => (
                    (redirectTo)
                        ? <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
                        : <Component {...props} />
                )}
            />
        );
    }
}


const mapStateToProps=state=>{
    return{
        userInfo:state.login.userInfo,
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        // auth: bindActionCreators(authAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CRoute);