import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/es/Modal/Modal';
import Card from '@material-ui/core/es/Card/Card';
import withStyles from '@material-ui/core/es/styles/withStyles';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Typography from '@material-ui/core/es/Typography/Typography';
import Divider from '@material-ui/core/es/Divider/Divider';
import FormControl from '@material-ui/core/es/FormControl/FormControl';
import TextField from '@material-ui/core/es/TextField/TextField';
import CardActions from '@material-ui/core/es/CardActions/CardActions';
import Button from '@material-ui/core/es/Button/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  modal: {
    width: '100%',
    position: 'absolute',
    // width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    // padding: theme.spacing.unit * 4,
    top: '10vh',
    'border-radius': '5px',
  },
});

class AnswerForm extends Component {
  state = {
    answerText: ''
  };

  handleSubmit(event) {
    event.preventDefault();
    const { answerText } = this.state;
    console.log(answerText);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const { classes } = this.props;

    return (
        <Card className={classes.modal}>
          <form onSubmit={this.handleSubmit.bind(this)}>
          <CardContent>
            <Typography variant="title" id="modal-title">
              回答する
            </Typography>
            <Divider />
            <FormControl>
              <TextField
                id="answerText"
                label="回答"
                value={this.state.answerText}
                onChange={this.handleChange}
                type="text"
                InputProps={{
                  name: 'answerText'
                }}
                margin="normal"
              >
              </TextField>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button size="small" type="submit">
              SUBMIT
            </Button>
          </CardActions>
          </form>
        </Card>
    );
  }
}

export default withStyles(styles)(AnswerForm)
