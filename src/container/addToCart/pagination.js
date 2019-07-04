import React, {Component} from 'react';
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";
import {url} from '../../axios-demo';

class ViewProduct extends Component {
    constructor() {
        super();
        this.state = {
            limit: 4,
            currentPage: 0,
            startIndex: 0,
            endIndex: 3,
            pageArr: [],
            arr: [],
            totalPage: 0,
        }
    }

    componentWillMount() {
        console.log('hi');
        debugger
        const {selectedProduct} = this.props;
        const {limit} = this.state;
        const len = selectedProduct.length;
        const d = Math.ceil(len / limit);
        const larr = [];
        for (let i = 0; i < d; i++) {
            larr.push(i);
        }
        this.setState({arr: larr});
        this.setState({totalPage: larr.length});
        const arr = selectedProduct.slice(0, limit);
        this.setState({pageArr: arr});
        this.setState({currentPage: 1})
    }


    handlePage = (e) => {
        const {limit} = this.state;
        const {selectedProduct} = this.props;
        const pg = Number(e.target.id);
        this.setState({currentPage: pg})
        if (pg === 1) {
            const el = document.getElementById('previous');
            el.disable = true;
        }
        const start = (limit * pg) - limit;
        const last = (limit * pg);
        const arr = selectedProduct.slice(start, last);
        this.setState({pageArr: arr})
    };

    handlePrevious = (e) => {
        const {limit, currentPage} = this.state;
        const {selectedProduct} = this.props;
        const pg = Number(currentPage) - 1;
        if(pg!==0){
            const start = (limit * (pg)) - limit;
            const last = (limit * pg);
            const arr = selectedProduct.slice(start, last);
            this.setState({pageArr: arr})
            this.setState({currentPage: pg})
        }
    };

    handleNext = (e) => {
        const {limit, currentPage, totalPage} = this.state;
        const {selectedProduct} = this.props;
        const pg = Number(currentPage) + 1;
        if(pg<=totalPage){
            const start = (limit * (pg)) - limit;
            const last = (limit * pg);
            const arr = selectedProduct.slice(start, last);
            this.setState({pageArr: arr})
            this.setState({currentPage: pg})
        }
    };

    handleFirst = () => {
        const {limit} = this.state;
        const {selectedProduct} = this.props;
        const start = (limit * 1) - limit;
        const last = (limit * 1);
        const arr = selectedProduct.slice(start, last);
        this.setState({pageArr: arr})
    };

    handleLast = () => {
        const {limit, totalPage} = this.state;
        const {selectedProduct} = this.props;
        const start = (limit * totalPage) - limit;
        const last = (limit * totalPage);
        const arr = selectedProduct.slice(start, last);
        this.setState({pageArr: arr})
    };

    render() {
        const {selectedProduct} = this.props;
        const {pageArr, arr} = this.state;
        return (
            <div>
                {
                    selectedProduct ?
                        <table className=" table table-striped  ">
                            <thead className=" thead-dark">
                            <tr>
                                <th scope=" col"></th>
                                <th scope=" col">Id</th>
                                <th scope=" col">ProductName</th>
                                <th scope=" col">Description</th>
                                <th scope=" col">Image</th>
                                <th scope=" col">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                pageArr.map((item, i) => (
                                    <tr key={i}>
                                        <td></td>
                                        <th scope=" row">{item.id}</th>
                                        <td>{item.product}</td>
                                        <td>{item.description}</td>
                                        <td><img src={`${url}/img/${item.image}`} height={60} width={60} alt={'responsive-img'}/></td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        :
                        <div className=" d-flex justify-content-center">
                            <div className=" spinner-border text-dark" >
                                <span className=" sr-only">Loading...</span>
                            </div>
                        </div>
                }
                <hr/>
                    <div style={{textAlign: 'right', alignItems: 'center', justifyContent: 'flex-end', display: 'flex'}}>
                    <Pagination size="lg" aria-label="Page navigation example">
                        <div onClick={this.handleFirst}>
                            <PaginationItem>
                                <PaginationLink first href="#"/>
                            </PaginationItem>
                        </div>
                        <div id={'previous'} onClick={this.handlePrevious}>
                            <PaginationItem>
                                <PaginationLink previous href="#"/>
                            </PaginationItem>
                        </div>
                        {
                            arr.map((v, i) => {
                               //    console.log("v=" + v + ' i=' + i);
                                return (
                                    <div key={i} className={'page-item'} onClick={this.handlePage}>
                                        <button id={i + 1} className={'page-link'}>
                                            {i + 1}
                                        </button>
                                    </div>
                                )
                            })

                        }
                        <div id={'next'} onClick={this.handleNext}>
                            <PaginationItem>
                                <PaginationLink next />
                            </PaginationItem>
                        </div>
                        <div onClick={this.handleLast}>
                            <PaginationItem>
                                <PaginationLink last/>
                            </PaginationItem>
                        </div>
                    </Pagination>
                </div>
            </div>
        )
    }
}

export default ViewProduct;
