import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './items.css';
import {Layout} from 'antd';

import I1 from '../../assets/SaleImages/1.jpg';
import I2 from '../../assets/SaleImages/2.jpg';
import I3 from '../../assets/SaleImages/3.jpg';
import II from '../../assets/I1.jpeg';
import SmallDeal from '../../assets/ref.jpg';

const {Header} = Layout;
class Items extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            index: 0,
            direction: null,
            images: [{photo: I1}, {photo: I2}, {photo: I3}]
        };
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }

    render() {
        const {index, direction} = this.state;
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
                        </div>
                        <div class="d-flex flex-row bd-highlight mb-3">
                            <div class="p-2 bd-highlight" className={'Offers'}>
                                <div class="d-flex flex-column bd-highlight mb-3">
                                    <div class="p-2 bd-highlight" className={'DealImage'}>
                                        <img src={II} class="img-fluid" alt="Responsive image"/>
                                    </div>
                                    <div class="p-2 bd-highlight" className={'DealName'}>Syska Powerbanks</div>
                                    <div class="p-2 bd-highlight" className={'DealPrice'}>Just 699</div>
                                    <div class="p-2 bd-highlight" className={'DealDes'}>1000 mAh</div>
                                </div>
                            </div>
                            <div class="p-2 bd-highlight" className={'Offers'}>
                                dffd
                            </div>
                        </div>
                    </div>
                    <div class="p-2 bd-highlight " className={'SmallDeal'}>
                        <img src={SmallDeal} class="img-fluid" className={'SmallDeal'}  alt="Responsive image"/>
                    </div>
                </div>
            {/*</div>*/}
            </div>
        )
    }
}

export default Items;