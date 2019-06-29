import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';

import * as logout from '../actions/login/loginActions';
import Aux from '../HOC/hoc';
import './layout.css';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


class LayoutWeb extends Component {
    state = {
        collapsed: false,
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    handleLogout = () => {
        console.log('---');
        console.log(this.props.location);
        this.props.action.logout();
        //this.props.history.replace('/login');

    };

    render() {
        return (
            <Aux>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo">

                        </div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                            {/*<Menu.Item key="1">*/}
                            {/*<Link to={'/login'}>*/}
                            {/*<Icon type="login"/>*/}
                            {/*<span><strong>Login</strong></span>*/}
                            {/*</Link>*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="2">*/}
                            {/*<Icon type="desktop"/>*/}
                            {/*<span>Option 2</span>*/}
                            {/*</Menu.Item>*/}
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                           <Icon type="user"/>
                                           <span>User</span>
                                         </span>
                                }
                            >
                                <Menu.Item key="3">
                                    <Link to={'/login'}>
                                        <Icon type="login"/>
                                        <span><strong>Login</strong></span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to={'/login'} onClick={this.handleLogout}>
                                        <Icon type="logout"/>
                                        <span><strong>LogOut</strong></span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            {/*<SubMenu*/}
                            {/*key="sub2"*/}
                            {/*title={*/}
                            {/*<span> <Icon type="team"/><span>Team</span></span>*/}
                            {/*}*/}
                            {/*>*/}
                            {/*<Menu.Item key="6">Team 1</Menu.Item>*/}
                            {/*<Menu.Item key="8">Team 2</Menu.Item>*/}
                            {/*</SubMenu>*/}
                            {/*<Menu.Item key="9">*/}
                            {/*<Icon type="file"/>*/}
                            {/*<span>File</span>*/}
                            {/*</Menu.Item>*/}
                        </Menu>
                    </Sider>
                    <Layout>
                        {/*<Header style={{background: '#001529', padding: 0}}/>*/}
                        <Content style={{margin: '0 16px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                            </Breadcrumb>
                            <div style={{padding: 5, background: '#fff', minHeight: 360}}>
                                <main>
                                    {this.props.children}
                                </main>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}></Footer>
                    </Layout>
                </Layout>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
          userInfo:state.login.userInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        action: {
            logout: bindActionCreators(logout.logOut, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutWeb);