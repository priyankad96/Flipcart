import React, {Component} from 'react';
import {connect} from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import './items.css';
import {Layout} from 'antd';

import I1 from '../../assets/SaleImages/1.jpg';
import I2 from '../../assets/SaleImages/2.jpg';
import I3 from '../../assets/SaleImages/3.jpg';
import II from '../../assets/I1.jpeg';
import SmallDeal from '../../assets/ref.jpg';
import * as product from "../../actions/product/productAction";
import {bindActionCreators} from "redux";
import {url} from '../../axios-demo';

const {Header} = Layout;

class Items extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            index: 0,
            direction: null,
            product: [],
            images: [{photo: I1}, {photo: I2}, {photo: I3}]
        };
    }

    componentDidMount() {
        this.props.fetchProduct().then((res) => {
            this.setState({product: res.slice(0, 7)});
        })
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }

    handleView=()=>{
        this.props.history.push('/alldeal');
    }

    render() {
        const {index, direction, product} = this.state;
        return (
            <div>
                {/*<div className={'Items'}>*/}
                <div class="d-flex p-2 bd-highlight" className={'Flipcart'}>
                    <Carousel
                        activeIndex={index}
                        direction={direction}
                        onSelect={this.handleSelect}
                        indicators={false}
                        interval={1000}
                    >
                        {
                            this.state.images.map((img) => (
                                    <Carousel.Item>
                                        <img src={img.photo} class="img-fluid" alt="Responsive image" className={'Images'}/>
                                    </Carousel.Item>
                                )
                            )
                        }
                    </Carousel>
                </div>
                <div class="d-flex justify-content-between" className={'Deals'}>
                    <div class="d-flex flex-column bd-highlight mb-3" className={'BigDeal'}>
                        <div class="p-2 bd-highlight" className={'BTop'}>
                            <div>
                                <h3>Deals of the Day</h3>
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary" onClick={this.handleView}>VIEW ALL</button>
                            </div>
                        </div>
                        <div class="d-flex flex-row bd-highlight mb-3">
                            {
                                product.length ?
                                    (
                                        product.map((item, i) => (
                                                <div class="p-2 bd-highlight" className={'Offers'} key={i}>
                                                    <div className="d-flex flex-column bd-highlight mb-3">
                                                        <div class="p-2 bd-highlight" className={'DealImage'}>
                                                            <img src={`${url}/img/${item.image}`} class="img-fluid" className={'DealImage'}
                                                                 alt="Responsive image"/>
                                                        </div>
                                                        <div class="p-2 bd-highlight"
                                                             className={'DealName'}>{item.product}</div>
                                                        <div class="p-2 bd-highlight"
                                                             className={'DealPrice'}>Just {item.price}</div>
                                                        <div class="p-2 bd-highlight"
                                                             className={'DealDes'}>{item.description}</div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    )
                                    : null
                            }
                        </div>
                    </div>
                    {/*<div class="p-2 bd-highlight " className={'SmallDeal'}>*/}
                        {/*<img src={SmallDeal} class="img-fluid" className={'SmallDeal'} />*/}
                    {/*</div>*/}
                </div>
                {/*</div>*/}
            </div>
        )
    }
}


const mapActionToProps = dispatch => {
    const {fetchProduct} = product;
    return bindActionCreators({fetchProduct}, dispatch);

}

export default connect(null, mapActionToProps)(Items);