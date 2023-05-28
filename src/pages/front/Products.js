import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';

const initialState = {
  products: [],
  pagination: {},
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_PRODUCTS_BEGIN':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        pagination: action.payload.pagination,
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        products: [],
        pagination: {},
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Products() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async (page = 1) => {
    dispatch({ type: 'FETCH_PRODUCTS_BEGIN' });
    try {
      const response = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
      );
      dispatch({
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: { products: response.data.products, pagination: response.data.pagination },
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_PRODUCTS_FAILURE',
        payload: { error: error.message || 'Failed to fetch products.' },
      });
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const { products, pagination, isLoading, error } = state;

  return (
    <div className="container mt-md-5 mt-3 mb-7 full-height">
      <Loading isLoading={isLoading} />
      {error && <p>{error}</p>}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3" key={product.id}>
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src={product.imageUrl}
                className="card-img-top rounded-0 object-cover"
                height={250}
                alt="..."
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-2">
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
                </h4>
                <p className="text-muted mt-1">NT$ {product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav className="d-flex justify-content-center">
        <Pagination pagination={pagination} onPageChange={fetchProducts} />
      </nav>
    </div>
  );
}

export default Products;
