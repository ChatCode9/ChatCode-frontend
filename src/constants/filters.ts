export const FILTERS_LIST = {
  WAIT: 'wait',
  FINISH: 'finish',
  ALL: '',
} as const;

export const INITIAL_FILTERS = {
  search: '',
  categories: 'question',
  sortBy: 'latest',
  status: FILTERS_LIST.ALL,
  pageInfo: {
    page: 0,
    size: 15,
  },
} as const;
