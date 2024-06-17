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