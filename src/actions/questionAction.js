export const LOAD_QUESTIONS = 'LOAD_QUESTIONS';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR';
export const CREATING_QUESTION = 'CREATING_QUESTION';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_ERROR = 'CREATE_QUESTION_ERROR';

export const loadQuestions = status => ({
  type: LOAD_QUESTIONS,
  isLoading: status
});

export const fetchQuestionsSuccess = questions => ({
  type: FETCH_QUESTIONS_SUCCESS,
  questions: questions
});

export const fetchQuestionsError = status => ({
  type: FETCH_QUESTIONS_ERROR,
  hasError: status
});

export const creatingQuestion = creating => ({
  type: CREATING_QUESTION,
  isCreating: creating
});

export const createQuestionSuccess = transactionHash => ({
  type: CREATE_QUESTION_SUCCESS,
  transactionHash: transactionHash
});

export const createQuestionError = hasError => ({
  type: CREATE_QUESTION_ERROR,
  hasError: hasError
});

export const fetchQuestions = qaService => {
  return (dispatch) => {
    dispatch(loadQuestions(true));
    return qaService.methods.getQuestionIdsByOwnerId().call()
      .then(questionIds => {
        const promises = questionIds.map(questionId => {
          return qaService.methods.getQuestionText(questionId).call().then(text => {
            return text;
          });
        });
        return Promise.all(promises);
      })
      .then(questions => {
        dispatch(loadQuestions(false));
        dispatch(fetchQuestionsSuccess(questions));
        return questions;
      })
      .catch(() => dispatch(fetchQuestionsError(true)));
  }
};

export const createQuestion = (qaService, coinbase, questionText) => {
  return (dispatch) => {
    dispatch(creatingQuestion(true));
    return qaService.methods.createQuestion(questionText).send(
      {
        from: coinbase,
        gas: 3000000
      })
      .then(transactionHash => {
        dispatch(creatingQuestion(false));
        dispatch(createQuestionSuccess(transactionHash));
        dispatch(fetchQuestions(qaService));
      })
      .catch(() => dispatch(createQuestionError(true)));
  }
};
