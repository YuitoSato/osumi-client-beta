import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Web3 from 'web3';
import Header from './components/Header';
import createMuiTheme from '@material-ui/core/es/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import cyan from '@material-ui/core/es/colors/cyan';
import orange from '@material-ui/core/es/colors/orange';
import QuestionList from './components/QuestionList';
import { BrowserRouter, Route } from 'react-router-dom'
import { fetchCoinbase } from './actions/coinbaseAction';
import connect from 'react-redux/es/connect/connect';

const theme = createMuiTheme({
  palette: {
    primary: { main: cyan[500] }, // Purple and green play nicely together.
    secondary: { main: orange[500] }, // This is just green.A700 as hex.
  },
});

class App extends Component {
  componentWillMount() {
    const { fetchCoinbase } = this.props;
    fetchCoinbase(this.web3);
  }

  constructor(props) {
    super(props);
    this.web3 = new Web3();
    this.web3.setProvider(new this.web3.providers.HttpProvider("http://localhost:7545"));

    if (window.web3) {
      window.web3 = this.web3;
    }

    const contractAbi = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "_text",
            "type": "string"
          }
        ],
        "name": "createQuestion",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getQuestionIdsByOwnerId",
        "outputs": [
          {
            "name": "",
            "type": "uint256[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_questionId",
            "type": "uint256"
          }
        ],
        "name": "getQuestionText",
        "outputs": [
          {
            "name": "questionId",
            "type": "uint256"
          },
          {
            "name": "owner",
            "type": "address"
          },
          {
            "name": "text",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ];

    this.qaService = new this.web3.eth.Contract(contractAbi, "0x4bb5fa8c45449d546c96e0f7225dbd5ab2eff32b");

  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header qaService={this.qaService} />
        <BrowserRouter>
          <Route exact path='/' render={ props => <QuestionList qaService={this.qaService} /> } />
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  fetchCoinbase: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
  coinbase: state.coinbase,
});

const mapDispatchToProps = dispatch => ({
  fetchCoinbase: (web3) => dispatch(fetchCoinbase(web3))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

