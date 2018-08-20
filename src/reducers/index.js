import { combineReducers } from 'redux';
import { fetchQuestionsError, questions, loadQuestions, lastTransactionHash, createQuestionError, creatingQuestion  } from './questionReducer';
import { fetchingCoinbase, fetchCoinbaseError, coinbase } from './coinbaseReducer';

export default combineReducers({
  fetchQuestionsError,
  loadQuestions,
  questions,
  lastTransactionHash,
  creatingQuestion,
  createQuestionError,
  fetchingCoinbase,
  fetchCoinbaseError,
  coinbase
});
