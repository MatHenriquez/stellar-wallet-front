import React from 'react';
import { IPaginationProps } from '../interfaces/pagination';

const Pagination = ({
  customPagination,
  currentPage,
  totalPages,
  nextPage,
  changePage,
  previousPage,
}: IPaginationProps) => {
  return (
    <div
      className='mt-1.5 flex w-full flex-col items-center justify-center gap-5 px-1 sm:flex-row sm:justify-between'
      data-cy='pagination'
    >
      <div className='flex w-full justify-end'>
        <nav className='z-30 flex items-center justify-center gap-x-[10px]' aria-label='Pagination'>
          <button
            className={`prev-btn disabled] flex h-[36px] w-[36px] items-center justify-center rounded-[6px] border-[1px] border-solid border-[#E4E4EB] ${
              currentPage == 1 ? 'pointer-events-none bg-[#cccccc]' : 'cursor-pointer'
            } `}
            onClick={previousPage}
            aria-label='Previous Page'
            disabled={currentPage == 1}
            data-cy='previous-page-button'
          >
            <img
              src='https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg'
              alt='Previous'
              data-cy='previous-page-image'
            />
          </button>
          {customPagination?.map((data, index) => (
            <button
              className={`flex h-[34px] w-[36px] cursor-pointer items-center justify-center rounded-[6px] border-[2px] border-solid bg-[#FFFFFF] text-main-blue-950 ${
                currentPage == index + 1
                  ? 'border-main-blue-950 text-main-blue-950'
                  : 'border-[#E4E4EB]'
              }`}
              onClick={() => changePage(index + 1)}
              key={data + index}
              aria-label={`Page ${index + 1}`}
              data-cy={`page-button-${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`flex h-[36px] w-[36px] items-center justify-center rounded-[6px] border-[1px] border-solid border-[#E4E4EB] ${
              currentPage == totalPages ? 'pointer-events-none bg-[#cccccc]' : 'cursor-pointer'
            }`}
            onClick={nextPage}
            aria-label='Next Page'
            disabled={currentPage == totalPages}
            data-cy='next-page-button'
          >
            <img
              src='https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg'
              alt='Next'
              data-cy='next-page-image'
            />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
