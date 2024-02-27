export interface Subscriber {
  SubscriberId: string;
  Name: string;
  Email: string;
}

export interface SubscribersState {
  totalResults: any;
  pageSize: any;
  subscribers: Subscriber[];
  loading: boolean;
  error: string | null;
  pageIndex: number;
  searchTerm: string;
}

export enum ActionTypes {
  SET_SEARCH_TERM = 'subscribers/setSearchTerm',
  SET_PAGE_INDEX = 'subscribers/setPageIndex',
}

export enum AsyncActionTypes {
  SEARCH_SUBSCRIBERS_PENDING = 'subscribers/searchSubscribers/pending',
  SEARCH_SUBSCRIBERS_FULFILLED = 'subscribers/searchSubscribers/fulfilled',
  SEARCH_SUBSCRIBERS_REJECTED = 'subscribers/searchSubscribers/rejected',
}