import React, {Component} from 'react';
import ReactImageMagnify from 'react-image-magnify';
import {connect} from 'react-redux';
import './productDesc.css';
import {Icon} from 'antd';
import {url} from '../../../axios-demo';
import styled,{keyframes} from 'styled-components';
import {bounce} from 'react-animations';


import * as product from "../../../actions/product/productAction";
import {bindActionCreators} from "redux";

const Bounce=styled.div`animation: 2s ${keyframes`${bounce}`} infinite`;
class ProductDesc extends Component {
    constructor() {
        super();
        this.state = {
            src: '',
            product: '',
            description: '',
            price: '',
            image: '',
        }
    }

    componentDidMount() {
        let arr;
        arr = this.props.location.pathname.split('/');
        this.props.getById(arr[2]).then((res) => {
            this.setState({
                product: res.product,
                description: res.description,
                price: res.price,
                image: res.image
            })
        })
    }

    changeImage = (e) => {
        console.log(e.target.src);
        this.setState({src: e.target.src});
    };

    render() {
        const {image,product,description,price,src} = this.state;
        const img=(src==='')?(`${url}/img/${image}`):src;
        return (
            <div className={'Container'}>
                <div className={'Main'}>
                    <div className={'Fmain'}>
                        <div className={'Row'}>
                            <div className={'FFmain'}>
                                <div style={{width: 70, height: 74}} id={'i1'} onMouseOver={this.changeImage}>
                                    <img src={img} alt={'img'} className={'Simg'}/>
                                </div>
                                <div style={{width: 70, height: 74}} onMouseOver={this.changeImage}>
                                    <img src={img} alt={'img'} className={'Simg'}/>
                                </div>
                                <div style={{width: 70, height: 74}} onMouseOver={this.changeImage}>
                                    <img src={img} alt={'img'} className={'Simg'}/>
                                </div>
                            </div>
                            <div style={{width: 445, height: 513}}>
                                {/*<img src={this.state.src} alt={'img'} className={'SFmain'} />*/}
                                <ReactImageMagnify  {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        isFluidWidth: true,
                                        src: img,
                                    },
                                    largeImage: {
                                        src: img,
                                        width: 1200,
                                        height: 1800,
                                    },
                                    shouldUsePositiveSpaceLens: true,
                                    imageClassName: 'SFmain',
                                    // enlargedImageContainerClassName: "test-cls-img"
                                    enlargedImageContainerClassName: 'Smain',
                                }} />

                            </div>
                        </div>
                        <div className={'Button'}>
                            <div className={'Btn'} style={{backgroundColor: '#ff9f00'}}>
                                <Icon type="shopping-cart" style={{fontSize: 20, color: '#ffffff'}}/>
                                <span>  ADD TO CART</span>
                            </div>
                            <div className={'Btn'} style={{backgroundColor: '#fb641b'}}>
                                <Icon type="thunderbolt" theme="filled"/>
                                <span> BUY NOW</span>
                            </div>
                        </div>
                    </div>
                    <div className={'Scontent'} style={{marginLeft: 20, marginRight: 20}}>
                        <Bounce>
                            <h1>{product}</h1>
                            <h1>{description}</h1>
                            <h1>{price}</h1>
                        </Bounce>

                    </div>
                    {/*<div className={'shadow-lg p-3 mb-5 rounded Smain'}>*/}

                    {/*</div>*/}
                </div>
            </div>

        )
    }
}

const mapActionToProps = dispatch => {
    const {getById} = product;
    return bindActionCreators({getById}, dispatch);

};
export default connect(null, mapActionToProps)(ProductDesc);