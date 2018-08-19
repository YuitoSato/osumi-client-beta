import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/es/List/List';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import Divider from '@material-ui/core/es/Divider/Divider';
import withStyles from '@material-ui/core/es/styles/withStyles';
import { fetchQuestions } from '../actions/questionAction';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
});

class QuestionList extends Component {
  componentDidMount() {
    const { fetchQuestions, qaService } = this.props;
    fetchQuestions(qaService);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <Divider />
          <ListItem button component="a">
            <ListItemText primary="Spam" />
          </ListItem>
          <Divider />
        </List>
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
