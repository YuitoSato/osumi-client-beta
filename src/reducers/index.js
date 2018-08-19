import { combineReducers } from 'redux';
import { fetchQuestionsError, questions, loadQuestions  } from './questionReducer';

export default combineReducers({
  fetchQuestionsError,
  loadQuestions,
  questions,
});
