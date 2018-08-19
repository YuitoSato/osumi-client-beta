export const LOAD_QUESTIONS = 'LOAD_QUESTIONS';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR';

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

export const fetchQuestions = qaService => {
  return (dispatch) => {
    dispatch(loadQuestions(true));
    return qaService.methods.getQuestionIdsByOwnerId().call()
      .then(questionIds => {
        console.log(questionIds);
        const promises = questionIds.map(questionId => {
          return qaService.methods.getQuestionText(questionId).then(text => {
            console.log(text);
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

  // return (dispatch) => {
  //   dispatch(loadQuestions(true));
  //   return web3.eth.getQuestions()
  //     .then(addresses => {
  //       const promises = addresses.map(address => {
  //         return web3.eth.getBalance(address)
  //           .then((balance) => {
  //             return {
  //               address: address,
  //               balance: balance
  //             }
  //           });
  //       });
  //       return Promise.all(promises);
  //     })
  //     .then(questions => {
  //       dispatch(loadQuestions(false));
  //       dispatch(fetchQuestionsSuccess(questions));
  //       return questions;
  //     })
  //     .catch(() => dispatch(fetchQuestionsError(true)));
  // }
};
