export const FILTERS_CATEGORIES_LIST = {
  QUESTION: 'question',
  FREE: 'free',
} as const;

export const FILTERS_SORT_LIST = {
  LATEST: 'latest',
  OLDEST: 'oldest',
} as const;

export const FILTERS_POST_LIST = {
  WAIT: 'wait',
  FINISH: 'finish',
  ALL: '',
} as const;

export const INITIAL_QUESTION_FILTERS = {
  search: '',
  categories: FILTERS_CATEGORIES_LIST.QUESTION,
  sortBy: FILTERS_SORT_LIST.LATEST,
  status: FILTERS_POST_LIST.ALL,
  pageInfo: {
    page: 0,
    size: 15,
  },
} as const;

export const INITIAL_FREE_FILTERS = {
  search: '',
  categories: FILTERS_CATEGORIES_LIST.FREE,
  sortBy: FILTERS_SORT_LIST.LATEST,
  status: FILTERS_POST_LIST.ALL,
  pageInfo: {
    page: 0,
    size: 15,
  },
} as const;
