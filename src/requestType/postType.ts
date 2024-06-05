export type Filters = {
  search: string;
  categories: string;
  sortby: string;
  status: string[];
  pageInfo: {
    page: number;
    size: number;
  };
};