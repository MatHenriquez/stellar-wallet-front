import React from 'react';
import styles from '../styles/Pagination.module.css';

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPage: number;
};

const Pagination = ({ page, setPage, totalPage }: PaginationProps) => {
  const handlePageChange = (newPage: number) => {
    const isInvalidPage = newPage < 1 || newPage > totalPage;
    if (isInvalidPage) return;
    setPage(newPage);
  };

  return (
    <div className={styles.container} data-cy='balances-pagination'>
      <button
        className={styles.prevNextButton}
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        data-cy='prev-button'
      >
        «
      </button>
      <button
        className={styles.currentPage}
        data-cy='current-page'
      >{`Page ${page} of ${totalPage}`}</button>
      <button
        className={styles.prevNextButton}
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPage}
        data-cy='next-button'
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
