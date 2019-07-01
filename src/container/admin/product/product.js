import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,Input } from 'reactstrap';
import {Icon} from 'antd';
import * as product from '../../../actions/product/productAction';
import {url} from '../../../axios-demo';

class Product extends Component {

    constructor() {
        super();
        this.state = {
            check: false,
            disable: false,
            selectedIndex: [],
            selectedProduct: [],
            visibleView: false,
            products: [],
            dropdownOpen: false,
            isSearch:false,
            sProducts:[]
        }
    }

    componentDidMount() {
        this.props.fetchProduct().then(() => {
            this.setState({products: this.props.products});
        })
    };

    toggle=()=>  {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    update = (id) => {
        this.props.history.push(`/editproduct/${id}`);
    };

    delete=(id)=>{
        this.props.deleteProduct(id).then((res)=>{
            if(res){
               // alert('Delete Product Successfully..');
                this.setState({products: this.props.products});
            }
        })
    }

    toggleCheckbox = (e) => {
        const {check, selectedIndex, products} = this.state;
        const check1 = check;
        if (check) {
            this.props.products.map((product) => {
                const el = document.getElementById(product.id);
                el.checked = false;
            })
            selectedIndex.splice(0, selectedIndex.length);
            this.setState({check: !check1});
            console.log(selectedIndex);
        } else {
            this.props.products.map((product) => {
                const el = document.getElementById(product.id);
                el.checked = true;
                const num = selectedIndex.includes(product.id);
                if (!num) {
                    selectedIndex.push(product.id);
                }
            });
            this.setState({check: !check1});
            console.log(selectedIndex);
        }
    };

    handleDisable = (e) => {
        const {check, selectedIndex} = this.state;
        console.log(e.target.id);
        const id = (+e.target.id);
        const bool = selectedIndex.includes(id);
        console.log(bool);
        if (!bool) {
            selectedIndex.push(id);
            e.target.checked = true;
        } else {
            const did = selectedIndex.indexOf(id)
            selectedIndex.splice(did, 1);
            e.target.checked = false;
        }
        console.log(selectedIndex);
        if (selectedIndex.length === 0) {
            this.setState({check: false});
            this.setState({disable: false})
        }
        const len = selectedIndex.length;
        const plen = this.props.products.length;
        if (len) {
            console.log('1hi')
            this.setState({disable: true})
        }
        if (plen === len) {
            this.setState({disable: false})
            this.setState({check: true})
        }
    };

    handleAddToCart = () => {
        const {selectedIndex, selectedProduct} = this.state;
        if (selectedIndex.length) {
            this.props.products.map(product => {
                const pid = selectedIndex.includes(Number(product.id));
                if (pid) {
                    if (!selectedProduct.includes(product)) {
                        selectedProduct.push(product)
                    }
                }
            })
            alert('Added product successfully..');
            this.setState({visibleView: true}, () => {
                this.props.addTocartProduct(selectedProduct)
            })
        } else {
            alert('Please select product..');
        }
        // console.log(selectedProduct);

    };

    handleViewProduct = (e) => {
        const len = this.state.selectedProduct.length;
        //console.log(len);
        if (!len) {
            alert('Please add product to cart..');
        } else {
            this.props.history.push('/addtocart')
        }

    };

    handleAddProduct = () => {
        console.log(this.props);
        this.props.history.push('/addproduct');
    };

    sortByProductPrice = (order) => {
        const {products} = this.props;
        const sortproduct = products;
        sortproduct.sort(function (a, b) {
            return a.price - b.price;
        });
        if(order==='REV'){
            sortproduct.reverse();
        }
        this.setState({products: sortproduct});
    };

    sortByProductName = (order) => {
        const {products} = this.props;
        const sortProduct = products;
        sortProduct.sort(function (a, b) {
            var nameA = a.product.toUpperCase(); // ignore upper and lowercase
            var nameB = b.product.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
        if(order==='REV'){
            sortProduct.reverse();
        }
        this.setState({products: sortProduct});
    };

    searchProduct=(e)=>{
        const {products,isSearch}=this.state;
        this.setState({isSearch:true});
        let key=e.target.value;
        let tmp=[];
        let value=`style={{color:'red}}`;
        products.map((item)=>{
            if(key!=='')
            {
                if(item.product.includes(key)){
                    // const el=document.getElementsByName(item.id);
                    // console.log('**',el[0]);
                    // if(el[0])
                    //     el[0].style.color ='red';
                    // console.log('**',el[0]);
                    tmp.push(item);
                }
            }
            if(key==='')
                window.location.reload();

        });
        this.setState({sProducts:tmp});
    };

    render() {
        debugger
        const {check, disable, products,search,sProducts,isSearch} = this.state;
        const displayProd = isSearch ? sProducts : products;
        return (
            <div style={{margin:40}}>
                <div style={{textAlign: 'center', marginTop: 10}} onClick={this.handleAddProduct}>
                    <button type="button" className="btn btn-dark">ADD PRODUCT</button>
                </div>
                <hr/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 10
                }}>
                    <div>
                        <input type="checkbox"  checked={check} onChange={this.toggleCheckbox} disabled={disable}/>
                        <span>&nbsp;<strong> Select All</strong>  </span>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                        <div>
                        <Icon type={'search'} style={{ fontSize: 25, color: '#001529' }} theme="outlined"/>
                        </div>
                        <div>
                            <Input type={'type'} value={search} placeholder={'Search Product Here'} onChange={this.searchProduct}/>
                        </div>&nbsp;  &nbsp;
                        <div style={{marginRight:50}}>
                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                               Filter By
                            </DropdownToggle>
                            <DropdownMenu>
                                <div onClick={()=>this.sortByProductName('A')}><DropdownItem>Product Ascending</DropdownItem></div>
                                <DropdownItem divider />
                                <div onClick={()=>this.sortByProductName('REV')}><DropdownItem>Product Descending</DropdownItem></div>
                                <DropdownItem divider />
                                <div  onClick={()=>this.sortByProductPrice('A')}><DropdownItem>Price Low to High</DropdownItem></div>
                                <DropdownItem divider />
                                <div onClick={()=>this.sortByProductPrice('REV')}><DropdownItem>Price High to Low</DropdownItem></div>
                            </DropdownMenu>
                        </ButtonDropdown>
                        </div>
                    </div>
                </div>
                <hr/>
                {
                    displayProd &&
                        <table className=" table table-striped  ">
                            <thead className=" thead-dark">
                            <tr>
                                <th scope=" col">#</th>
                                <th scope=" col">Id</th>
                                <th scope=" col">
                                    <div>ProductName</div>
                                </th>
                                <th scope=" col">Description</th>
                                <th scope=" col">Image</th>
                                <th scope=" col">
                                    <div>Price</div>
                                </th>
                                <th scope=" col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                displayProd.map((item, i) => (
                                    <tr key={i} >
                                        <td><input type="checkbox" id={item.id} onChange={this.handleDisable}/></td>
                                        <th scope=" row">{i + 1}</th>
                                        <td name={item.id} >{item.product}</td>
                                        <td>{item.description}</td>
                                        {/*<td>{item.image}</td>*/}
                                        <td><img src={`${url}/img/${item.image}`} width={60} height={60}/></td>
                                        <td>{item.price}</td>
                                        <td>
                                            <button type=" button" id={item.id} className=" btn btn-success"
                                                    onClick={() => {
                                                        this.update(item.id)
                                                    }}>Update
                                            </button>
                                            {' '}
                                            <button type=" button" id={item.id} className=" btn btn-danger"
                                                    onClick={()=>{this.delete(item.id)}}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                }
                {
                    isSearch && displayProd.length<1 &&
                    <div className=" d-flex justify-content-center">
                        {/*<div className=" spinner-border text-dark" role=" status">*/}
                            {/*<span className=" sr-only">Loading...</span>*/}
                        {/*</div>*/}
                        <h1>No such products exist</h1>
                    </div>
                }
                <hr/>
                <div style={{textAlign: 'right'}}>
                    <button type="button" className="btn btn-dark" onClick={this.handleAddToCart}>ADD TO CART</button>
                    {' '}&nbsp;
                    {
                        this.state.visibleView ?
                            <button type=" button" name={'btnView'} show={false} className=" btn btn-success"
                                    onClick={this.handleViewProduct}>VIEW PRODUCT</button>
                            : null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.product.product,
        selectedProduct: state.product.selectedProduct,
    }
};

const mapActionToProps = dispatch => {
    const {fetchProduct, addTocartProduct,deleteProduct} = product;
    return bindActionCreators({fetchProduct, addTocartProduct,deleteProduct}, dispatch);
    // return {
    //     action: {
    //         fetchProduct: bindActionCreators(product.fetchProduct, dispatch),
    //         addToCart: bindActionCreators(product.addTocartProduct, dispatch),
    //     }
    // }
}

export default connect(mapStateToProps, mapActionToProps)(Product);