import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';
import '../css/ProductDetails.css';

function ProductDetails() {
    const { id } = useParams();
    const { products, selectedProduct } = useSelector((store) => store.product)

    const { price, image, title, description } = selectedProduct;

    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count
        }
        dispatch(addToBasket(payload))
        dispatch(calculateBasket());
    }

    useEffect(() => {
        getProductById();
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product));
            }
        })
    }

    return (
        <div className="pd-wrapper">
            <div className="pd-image-box">
                <img src={image} width={300} height={500} alt="" />
            </div>
            <div>
                <h1 className="pd-title">{title}</h1>
                <p className="pd-description">{description}</p>
                <h1 className="pd-price">{price}₺</h1>

                <div className="pd-quantity-box">
                    <CiCirclePlus onClick={increment} className="pd-icon" />
                    <span className="pd-count">{count}</span>
                    <CiCircleMinus onClick={decrement} className="pd-icon" />
                </div>
                <div>
                    <button onClick={addBasket} className="pd-button">Sepete Ekle</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
