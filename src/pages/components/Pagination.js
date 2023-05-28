function Pagination({ pagination, onPageChange }) {
  if (pagination.total_pages <= 1) return null; // don't render pagination when total_pages is less or equal to 1

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${pagination.has_pre ? '' : 'disabled'}`}>
          <button
            type="button"
            aria-label="Previous"
            className="page-link"
            onClick={() => {
              if (pagination.has_pre) {
                onPageChange(pagination.current_page - 1);
              }
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {[...new Array(pagination.total_pages)].map((_, i) => (
          <li className={`page-item ${i + 1 === pagination.current_page ? 'active' : ''}`} key={i}>
            <button type="button" className="page-link" onClick={() => onPageChange(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${pagination.has_next ? '' : 'disabled'}`}>
          <button
            type="button"
            aria-label="Next"
            className="page-link"
            onClick={() => {
              if (pagination.has_next) {
                onPageChange(pagination.current_page + 1);
              }
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
