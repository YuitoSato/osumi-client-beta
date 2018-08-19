import { FETCH_QUESTIONS_ERROR, FETCH_QUESTIONS_SUCCESS, LOAD_QUESTIONS } from '../actions/questionAction';

export const loadQuestions = (state = false, action) => {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return action.isLoading;
    default:
      return state;
  }
};

export const fetchQuestionsError = (state = false, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_ERROR:
      return action.hasError;
    default:
      return state;
  }
};

export const questions = (state = [], action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_SUCCESS:
      return action.questions;
    default:
      return state;
  }
};
