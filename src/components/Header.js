import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/es/Typography/Typography';
import IconButton from '@material-ui/core/es/IconButton/IconButton';
import withStyles from '@material-ui/core/es/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/es/Modal/Modal';
import Card from '@material-ui/core/es/Card/Card';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Divider from '@material-ui/core/es/Divider/Divider';
import FormControl from '@material-ui/core/es/FormControl/FormControl';
import TextField from '@material-ui/core/es/TextField/TextField';
import Button from '@material-ui/core/es/Button/Button';
import CardActions from '@material-ui/core/es/CardActions/CardActions';

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

class Header extends Component {
  state = {
    open: false,
    questionText: '',
  };

  handleOpen = () => {
    console.log("lll");
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit(event) {
    event.preventDefault();
    const { questionText } = this.state;
    console.log(questionText);
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" className={classes.flex}>
              Osumi
            </Typography>
            <div>
              <IconButton color="inherit" aria-label="Menu">
                <AddIcon onClick={this.handleOpen}/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Card className={classes.modal}>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <CardContent>
              <Typography variant="title" id="modal-title">
                質問する
              </Typography>
              <Divider />
              <FormControl>
                <TextField
                  id="questionText"
                  label="質問"
                  value={this.state.questionText}
                  onChange={this.handleChange}
                  type="text"
                  InputProps={{
                    name: 'questionText'
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
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
