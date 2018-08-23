import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/es/styles/withStyles';
import { fetchQuestions } from '../actions/questionAction';
import { connect } from 'react-redux';
import Card from '@material-ui/core/es/Card/Card';
import CardHeader from '@material-ui/core/es/CardHeader/CardHeader';
import Avatar from '@material-ui/core/es/Avatar/Avatar';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Typography from '@material-ui/core/es/Typography/Typography';
import Person from '@material-ui/icons/es/Person';
import Button from '@material-ui/core/es/Button/Button';
import CardActions from '@material-ui/core/es/CardActions/CardActions';
import Create from '@material-ui/icons/es/Create';
import AnswerForm from './AnswerForm';
import Modal from '@material-ui/core/es/Modal/Modal';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  item: {
    'word-wrap': 'break-word',
  },
  card: {
    margin: '10px 10px 0px 10px',
    maxWidth: 400,
  },
  cardContent: {
    'padding-top': 0,
    'word-wrap': 'break-word'
  },
  cardHeader: {
    'word-break': 'break-all'
  }
});

class QuestionList extends Component {
  state = {
    modalOpen: false
  };

  openModal = () => {
    this.setState({modalOpen: true});
  };

  closeModal = () => {
    this.setState({modalOpen: false})
  };

  componentDidMount() {
    const {fetchQuestions, qaService} = this.props;
    fetchQuestions(qaService);
  }

  render() {
    const {classes, questions} = this.props;
    const {modalOpen} = this.state;
    return (
      <div className={classes.root}>
        {questions.map((question, i) => (
          <Card className={classes.card} key={i}>
            <CardHeader
              classes={{
                title: classes.cardHeader,
              }}
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  <Person />
                </Avatar>
              }
              title="user name"
              // subheader={question.owner}
            ></CardHeader>
            <CardContent className={classes.cardContent}>
              <Typography component="p">
                {question.text}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" type="submit" onClick={this.openModal}>
                <Create />
                回答する
              </Button>
            </CardActions>
          </Card>
        ))}

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalOpen}
          onClose={this.closeModal}
        >
          <div>
            <AnswerForm />
          </div>
        </Modal>
      </div>
    )
  }
}

QuestionList.propTypes = {
  qaService: PropTypes.any.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  questions: state.questions,
  hasError: state.fetchQuestionsError,
  isLoading: state.loadQuestions
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: (qaService) => dispatch(fetchQuestions(qaService))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(QuestionList));
