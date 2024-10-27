export interface IPaginationProps {
  customPagination: number[];
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  changePage: (page: number) => void;
  previousPage: () => void;
}
