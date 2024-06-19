export type Filters = {
  search: string;
  categories: string;
  sortBy: string;
  status: string[];
  pageInfo: {
    page: number;
    size: number;
  };
};

export type RequestFilters = {
  search: string;
  categories: string;
  sortBy: string;
  status: string;
  pageInfo: {
    page: number;
    size: number;
  };
};