import axios from 'axios';
import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import CartItem from '../components/CartItem';

const API_PATH = process.env.REACT_APP_API_PATH;

function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [loadingItems, setLoadingItem] = useState([]);
  const [error, setError] = useState(null);

  const handleCartItem = async (action, id, item, quantity) => {
    setError(null);
    const api = `/v2/api/${API_PATH}/cart/${id}`;
    let res;
    try {
      if (action === 'remove') {
        res = await axios.delete(api);
      } else if (action === 'update') {
        const data = {
          data: {
            product_id: item.product_id,
            qty: quantity,
          },
        };
        setLoadingItem([...loadingItems, id]);
        res = await axios.put(api, data);
        setLoadingItem(loadingItems.filter((loadingObject) => loadingObject !== id));
      }
      console.log(res);
      getCart();
    } catch (error) {
      setError(error.message || 'Failed to update cart.');
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-white py-5 full-height">
          {error && <p>{error}</p>} {/* display error message */}
          {cartData?.carts?.length === 0 ? (
            <>
              <div className="alert alert-secondary">還沒有選擇餐點喔</div>
              <Link to="/products" className="btn btn-dark w-100 mt-4 rounded-0 py-3">
                選擇美味套餐
              </Link>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-between">
                <h2 className="mt-2">您的餐點</h2>
              </div>

              {cartData?.carts?.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleCartItem={handleCartItem}
                  loadingItems={loadingItems}
                />
              ))}

              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">總金額</p>
                <p className="mb-0 h4 fw-bold">NT${Number(cartData?.final_total?.toFixed(2))}</p>
              </div>
              <Link to="/checkout" className="btn btn-dark w-100 mt-4 rounded-0 py-3">
                確認餐點正確
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
