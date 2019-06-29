import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Menu, Dropdown, Icon} from 'antd';
import './navbar.css';



const NavBar = () => {
    const onClick = ({key}) => {
        // message.info(`Click on item ${key}`);
    };

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="1">1st menu item</Menu.Item>
            <Menu.Item key="2">2nd menu item</Menu.Item>
            <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
    );
    return (
        <div className={'NavBar '}>
            <div class="d-flex flex-row bd-highlight mb-3 align-items-center justify-content-around">
                <div class="p-2 bd-highlight">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            <div className={'ItemHeading'}> Electronics <Icon style={{width: 4.7, height: 8}}
                                                                              type="down"/></div>
                        </a>
                    </Dropdown>
                </div>
                <div class="p-2 bd-highlight">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            <div className={'ItemHeading'}> TVs & Appliances <Icon type="down"/></div>
                        </a>
                    </Dropdown>
                </div>
                <div class="p-2 bd-highlight">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            <div className={'ItemHeading'}> Men <Icon type="down"/></div>
                        </a>
                    </Dropdown>
                </div>
                <div class="p-2 bd-highlight">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            <div className={'ItemHeading'}> Women <Icon type="down"/></div>
                        </a>
                    </Dropdown>
                </div>
                <div class="p-2 bd-highlight">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            <div className={'ItemHeading'}> Babys & Kids <Icon type="down"/></div>
                        </a>
                    </Dropdown>
                </div>
                <div class="p-2 bd-highlight">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            <div className={'ItemHeading'}> Home & Furniture <Icon type="down"/></div>
                        </a>
                    </Dropdown>
                </div>
                <div class="p-2 bd-highlight">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            <div className={'ItemHeading'}> Sports,Books & More <Icon type="down"/></div>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </div>


    )
}

export default NavBar;