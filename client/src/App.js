import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Provider } from 'react-redux';
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import LeanMeatContract from "./contracts/LeanMeat.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import Admin from './admin/Admin';
import Producer from './producer/Producer';
import Shipper from './shipper/Shipper';
import Buyer from './buyer/Buyer';

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    // try {
    //   // Get network provider and web3 instance.
    //   const web3 = await getWeb3();
    //   // Use web3 to get the user's accounts.
    //   const accounts = await web3.eth.getAccounts();
    //   // Get the contract instance.
    //   const Contract = truffleContract(LeanMeatContract);
    //   Contract.setProvider(web3.currentProvider);
    //   const instance = await Contract.deployed();
    //   // Set web3, accounts, and contract to the state, and then proceed with an
    //   // example of interacting with the contract's methods.
    //   this.setState({ web3, accounts, contract: instance }, this.runExample);
    //   console.log(this.state);
    // } catch (error) {
    //   // Catch any errors for any of the above operations.
    //   alert(
    //     `Failed to load web3, accounts, or contract. Check console for details.`
    //   );
    //   console.log(error);
    // }
  };

  runExample = async () => {
    // const { accounts, contract } = this.state;
    // // Stores a given value, 5 by default.
    // // await contract.set(5, { from: accounts[0] });
    // let response = await contract.getUserCount();
    // const userCount = response.toNumber();
    // response = await contract.getUsers();
    // const users = response;
    // // console.log(userCount);
    // // console.log(users);
    // // Get the value from the contract to prove it worked.
    // // const response = await contract.get();

    // // Update state with the result.
    // this.setState({ userCount: userCount, users: users });
  };

  render() {
    return (
      <div className="App">
        <h1>LeanMeat Demo</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <Router>
          <div>
            <Route exact path="/admin" component={Admin} />
            <Route path="/producer" component={Producer} />
            <Route path="/shipper" component={Shipper} />
            <Route path="/buyer" component={Buyer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
