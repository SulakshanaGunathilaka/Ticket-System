import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className={classNames('p-2 rounded-md', { 'bg-gray-200': isFirstPage })}
        disabled={isFirstPage}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>{currentPage}</span>
      <button
        className={classNames('p-2 rounded-md', { 'bg-gray-200': isLastPage })}
        disabled={isLastPage}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;