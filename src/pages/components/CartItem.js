function CartItem({ item, handleCartItem, loadingItems }) {
  const removeItem = () => handleCartItem('remove', item.id);
  const updateItem = (e) => handleCartItem('update', item.id, item, e.target.value * 1);

  return (
    <div className="d-flex mt-4 bg-light">
      <img
        src={item.product.imageUrl}
        alt=""
        className="object-cover"
        style={{
          width: '120px',
        }}
      />
      <div className="w-100 p-3 position-relative">
        <button
          type="button"
          className="position-absolute btn"
          style={{ top: '10px', right: '10px' }}
          onClick={removeItem}
        >
          <i className="bi bi-x-lg"></i>
        </button>
        <p className="mb-0 fw-bold">{item.product.title}</p>
        <p className="mb-1 text-muted" style={{ fontSize: '14px' }}>
          {item.product.content}
        </p>
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="input-group w-50 align-items-center">
            <select
              name=""
              className="form-select"
              id=""
              value={item.qty}
              disabled={loadingItems.includes(item.id)}
              onChange={updateItem}
            >
              {[...new Array(20)].map((_, num) => (
                <option value={num + 1} key={num}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
          <p className="mb-0 ms-auto">NT${Number(item?.final_total?.toFixed(2))}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
