import React, {Component} from 'react';
import upload from "../../assets/upload.png";
import {Col, Input, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import * as product from "../../actions/product/productAction";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import classnames from 'classnames';
import {url} from '../../axios-demo';

class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateId: null,
            oldImg: '',
            activeTab: '1',
            product: '',
            description: '',
            price: '',
            image: '',
            file: '',
            imageURL: '',
        }
    }

    componentWillMount() {
        const name = this.props.location.pathname;
        const path = name.split('/');
        this.props.getById(path[2])
            .then((res) => {
                console.log('data', res);
                this.setState({
                    updateId: res.id,
                    product: res.product,
                    description: res.description,
                    price: res.price,
                    image: res.image,
                    oldImg: res.image,
                });
            })
    }

    componentDidUpdate(prevProps, prevState) {
        const {image} = this.state;
        if (image !== prevState.image) {
            this.props.tab2({image});
        }
    }

    toggle(tab) {
        if(tab==='2'){
            this.handleNext();
        }else{
            if (this.state.activeTab !== tab) {
                this.setState({
                    activeTab: tab
                });
            }
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleNext = () => {
        const {product, description, price} = this.state;
        if (description && product && price) {
            this.props.tab1({product, description, price});
            alert('Data Saved Successfully..');
            this.setState({activeTab: '2'})

        } else {
            alert('Please,..Enter all Detail..')
        }
    };

    handleUpdateProduct = (e) => {
        e.preventDefault();
        debugger;
        const {tab1Data, tab2Data} = this.props;
        const finalData = Object.assign(tab1Data, tab2Data);
        const {updateId, image, oldImg} = this.state;
        this.props.tab2({image});
        let formData = new FormData();
        formData.set('product', finalData.product);
        formData.append('description', finalData.description);
        formData.append('price', finalData.price);
        if (image !== oldImg) {
            debugger
            formData.append('image', finalData.image);
        }
        debugger;
        this.props.updateProduct(formData, updateId)
            .then(res => {
                if (res) {
                    alert('Update Record Successfully..');
                }
            })
    };

    openDialogue = () => {
        let div = document.getElementById('file-upload');
        div.click();
    };

    handleFile = (e) => {
        if (e.target.files[0].name) {
            console.log(e.target.files[0].name);
            const filename = e.target.files[0].name;
            debugger
            this.setState({
                    file: filename,
                    imageURL: URL.createObjectURL(e.target.files[0]),
                    image: e.target.files[0]
                },
            );
        }
    };

    handleBack = () => {
        this.props.history.replace('/product');
    };

    render() {
        const {image, file, imageURL} = this.state;
        const img = (imageURL === '') ? `${url}/img/${image}` : imageURL;

        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '1'})}
                            onClick={() => {
                                this.toggle('1');
                            }}
                        >
                            <div style={{color: '#001529', fontWeight: 'bold'}}> PRODUCT DETAIL</div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '2'})}
                            onClick={() => {
                                this.toggle('2');
                            }}
                        >
                            <div style={{color: '#001529', fontWeight: 'bold'}}> PRODUCT</div>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                    width: '35%',
                    margin: 'auto'
                }}>
                    <TabPane tabId="1" className={'shadow-lg p-3 mb-5 bg-white rounded'}>
                        <Row>
                            <Col sm='12'>
                                <div className="input-group flex-nowrap">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="addon-wrapping">Product Name:</span>
                                    </div>
                                    <input type="text" name={'product'} value={this.state.product}
                                           onChange={this.handleChange} className="form-control"
                                           placeholder="Enter Product Name."/>
                                </div>
                            </Col>
                            <Col sm={'12'} style={{marginTop: 20}}>
                                <div className="input-group flex-nowrap">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="addon-wrapping">Description</span>
                                    </div>
                                    <input type="text" name={'description'} value={this.state.description}
                                           onChange={this.handleChange} className="form-control"
                                           placeholder="Enter Product Description."/>
                                </div>
                            </Col>
                            <Col sm={'12'} style={{marginTop: 20}}>
                                <div className="input-group flex-nowrap">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="addon-wrapping">Price</span>
                                    </div>
                                    <input type="number" name={'price'} value={this.state.price}
                                           onChange={this.handleChange} className="form-control"
                                           placeholder="Enter Product Price." min={1000}/>
                                </div>
                            </Col>
                        </Row>
                        <div onClick={this.handleNext}
                             className="d-flex btn btn-dark justify-content-center align-items-center "
                             onChange={this.handleChange} style={{marginTop: 20}}>
                            <div style={{fontWeight: 'bold', textAlign: 'center'}}>NEXT</div>
                        </div>
                    </TabPane>
                    <TabPane tabId="2" className={'shadow-lg p-3 mb-5 bg-white rounded'} style={{width: '200%'}}>
                        <Row>
                            <Col sm="12">

                                <div>
                                    <img src={img} id={'file'} className="rounded" alt="hi"
                                         style={{height: 200, width: 200, resize: 'both', overflow: 'hidden'}}/>
                                </div>

                            </Col>
                        </Row>
                        <Row style={{marginTop: 20}}>
                            <Col sm={'12'}>
                                <div>
                                    <input id={'file-upload'} type="file"
                                           style={{display: 'none'}}
                                           onChange={this.handleFile}
                                    />
                                    <Input type="text" value={file} onClick={this.openDialogue}
                                           placeholder={'Choose File'}/>
                                </div>
                            </Col>
                        </Row>
                        <div>
                            <div onClick={this.handleUpdateProduct}
                                 className="d-flex btn btn-dark justify-content-center align-items-center "
                                 style={{marginTop: 20}}>
                                <div style={{fontWeight: 'bold', textAlign: 'center'}}>UPDATE</div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <div onClick={this.handleBack}
                                 className="d-flex btn btn-dark justify-content-center align-items-center "
                                 style={{marginTop: 20, width: 150}}>
                                <div style={{fontWeight: 'bold', textAlign: 'center'}}>BACK</div>
                            </div>
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tab1Data: state.product.tab1,
        tab2Data: state.product.tab2,

    }
};

const mapDispatchToProps = dispatch => {
    const {tab1, tab2, getById, updateProduct,} = product;
    return bindActionCreators({tab1, tab2, getById, updateProduct}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);