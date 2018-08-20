import { FETCH_COINBASE_ERROR, FETCH_COINBASE_SUCCESS, FETCHING_COINBASE } from '../actions/coinbaseAction';

export const fetchingCoinbase = (state = false, action) => {
  switch (action.type) {
    case FETCHING_COINBASE:
      return action.isFetching;
    default:
      return state;
  }
};

export const fetchCoinbaseError = (state = false, action) => {
  switch (action.type) {
    case FETCH_COINBASE_ERROR:
      return action.isFetching;
    default:
      return state;
  }
};

export const coinbase = (state = '', action) => {
  switch (action.type) {
    case FETCH_COINBASE_SUCCESS:
      return action.coinbase;
    default:
      return state;
  }
};
