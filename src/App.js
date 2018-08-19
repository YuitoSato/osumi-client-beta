import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Header from './components/Header';
import createMuiTheme from '@material-ui/core/es/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import cyan from '@material-ui/core/es/colors/cyan';
import orange from '@material-ui/core/es/colors/orange';
import QuestionList from './components/QuestionList';

const theme = createMuiTheme({
  palette: {
    primary: { main: cyan[500] }, // Purple and green play nicely together.
    secondary: { main: orange[500] }, // This is just green.A700 as hex.
  },
});

class App extends Component {
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
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ];

    this.qaService = new this.web3.eth.Contract(contractAbi, "0x67ca2a66ecef7784e3d2325cdab79dd5e77a30c3");



    //qa.methods.createQuestion("what?").send({from: account, gas:3000000}).then(a => console.log(a))
    //
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header/>
        <QuestionList qaService={this.qaService}/>
      </MuiThemeProvider>
    )
  }
}

export default App;


// qaService.methods.createQuestion("what?").send({from: account, gas:3000000}).then(a => console.log(a))
// qa.methods.createQuestion("what?").send({from: account, gas:3000000}).then(a => console.log(a))

