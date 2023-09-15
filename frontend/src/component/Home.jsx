import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Home.css"

const Home = () => {

    const [allProduct, setAllProduct] = useState([]);
    // const [page, setPage] = useState(1);
    const [productData, setProductData] = useState("");
    const [order, setOrder] = useState(-1);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios.get(`http://localhost:8000/filter-product?search=${productData}&order=${order}&page=${page}`)
            if (response.data.success) {
                console.log(response.data,"18");
                setAllProduct(response.data.products)
                console.log(response.data.products,"20");
                setPageCount(response.data.pagination.pageCount)
            }
        }
        getProducts()
    }, [productData, order, page])

    const handlePrev = () => {
        setPage(() => {
            if (page === 1) return page;
            return page - 1
        })
    }

    const handleNext = () => {
        setPage(() => {
            if (page === pageCount) return page;
            return page + 1
        })
    }


    return (
        <div>
            <h1 className='App'>Home </h1>
            <div className='App'>
                <form>
                    <input type="search" name='searchField' onChange={(e) => setProductData(e.target.value)} />
                    <input type='submit' value="Search" />
                    <br />
                    <select onChange={(e)=>setOrder(e.target.value)}>
                        <option value={-1}>New</option>
                        <option value={1}>OLd</option>
                    </select>
                </form>
            </div>
            <div className='all-product-div'>
                {
                    allProduct?.length ? allProduct.map((product) => (
                        <div className='single-product-div'>
                            <div className='image-div'>
                               {product?.image =="uploads\\55edea08e4c5ef2579a2c7a3da8eb5cd" ? <img src={`http://localhost:8000/${product?.image}`} alt="" />:
                               <img src={product?.image} alt="" />}
                            </div>
                            <h3 className='App'>{product?.name}</h3>
                            <h4 className='App'>{product.price} Rs</h4>
                            <p className='para-align'>{product.description}</p>
                            <p>{product.date} time</p>
                        </div>
                    )) : <h3>All products allready shown</h3>
                }
            </div>
            <div className='App'><button onClick={() => handlePrev()}>prev</button> <button onClick={() => handleNext()}>next</button></div>
        </div>
    )
}

export default Home
