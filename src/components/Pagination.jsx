import styles from "@/styles/Pagination.module.css";

const Button = ({ className, children, ...restProps }) => {
  return (
    <button type="button" className={`${styles.pageButton} ${className}`} {...restProps}>
      {children}
    </button>
  );
};

const Pagination = ({ className, currentPage, totalPages, onPageChange, maxVisiblePages = 5 }) => {
  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`${styles.paginationContainer} ${className}`}>
      {/* 첫 페이지로 이동 */}
      <Button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        &laquo;
      </Button>
      {/* 이전 페이지로 이동 */}
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        &lsaquo;
      </Button>

      {/* 페이지 번호들 */}
      {pageNumbers.map((page) => (
        <Button
          key={page}
          className={currentPage === page ? styles.active : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {/* 다음 페이지로 이동 */}
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        &rsaquo;
      </Button>
      {/* 마지막 페이지로 이동 */}
      <Button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        &raquo;
      </Button>
    </div>
  );
};

export default Pagination;
