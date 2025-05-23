import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlice';
import Product from './Product';

function ProductList() {
  const dispatch = useDispatch();

  // Hem ürün listesi hem arama kelimesi alınır
  const { products, searchTerm } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Eğer arama kutusu boşsa tüm ürünleri göster, doluysa filtre uygula
  const displayedProducts = searchTerm
    ? products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : products;

  return (
    <div className="flex-row" style={{ flexWrap: 'wrap', marginTop: '25px' }}>
      {
        displayedProducts && displayedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))
      }
    </div>
  );
}

export default ProductList;
