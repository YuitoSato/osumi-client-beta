export const FETCHING_COINBASE = 'FETCHING_COINBASE';
export const FETCH_COINBASE_SUCCESS = 'FETCH_COINBASE_SUCCESS';
export const FETCH_COINBASE_ERROR = 'FETCH_COINBASE_ERROR';

export const fetchingCoinbase = status => ({
  type: FETCHING_COINBASE,
  isFetching: status
});

export const fetchCoinbaseSuccess = coinbase => ({
  type: FETCH_COINBASE_SUCCESS,
  coinbase: coinbase
});

export const fetchCoinbaseError = status => ({
  type: FETCH_COINBASE_ERROR,
  hasError: status
});

export const fetchCoinbase = web3 => {
  return (dispatch) => {
    dispatch(fetchingCoinbase(true));
    return web3.eth.getCoinbase()
      .then(coinbase => {
        dispatch(fetchingCoinbase(true));
        dispatch(fetchCoinbaseSuccess(coinbase));
        return coinbase;
      })
      .catch(() => dispatch(fetchCoinbaseError(true)));
  }
};
