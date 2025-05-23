import { useEffect } from 'react';
import './App.css';
import PageContainer from './container/PageContainer';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';
import Loading from './components/Loading';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateBasket, setDrawer, removeFromBasket } from './redux/slices/basketSlice';

function App() {
  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, []);

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer className="drawer" onClose={() => dispatch(setDrawer())} anchor="right" open={drawer}>
          {
            products && products.map((product) => (
              <div key={product.id}>
                <div className="flex-row drawer-product">
                  <img className="drawer-img" src={product.image} />
                  <p className="drawer-title">{product.title} ({product.count})</p>
                  <p className="drawer-price">{product.price}TL</p>
                  <button
                    className="drawer-remove"
                    onClick={() => {
                      dispatch(removeFromBasket(product.id));
                      dispatch(calculateBasket());
                    }}
                  >
                    sil
                  </button>

                </div>
              </div>
            ))
          }
          <div>
            <p>Toplam tutar : {totalAmount} TL</p>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;
