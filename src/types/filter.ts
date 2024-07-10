export type CategoriesStatus = 'question' | 'free';

export type SortByStatus = 'latest' | 'oldest';

export type PostStatus = 'wait' | 'finish' | '';

export type Filters = {
  search: string;
  categories: CategoriesStatus;
  sortBy: SortByStatus;
  status: PostStatus;
  pageInfo: {
    page: number;
    size: number;
    offset?: number;
  };
};

export type RequestFilters = {
  search: string;
  categories: CategoriesStatus;
  sortBy: SortByStatus;
  status: PostStatus;
  pageInfo: {
    page: number;
    size: number;
    offset?: number;
  };
};

export type BoardControlType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};
