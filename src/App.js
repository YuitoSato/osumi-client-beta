import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

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

    const OsumiQAService = new this.web3.eth.Contract(contractAbi, "0x1960ee7c78ede6fac9e8dcff7d7a2429f41e8ded");

    //qa.methods.createQuestion("what?").send({from: account, gas:3000000}).then(a => console.log(a))
    //
  }

  render() {
    return (
      <h1>HELLO WORLD!</h1>
    )
  }
}

export default App;
