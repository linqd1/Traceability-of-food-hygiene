import React, { Component } from 'react';
import LeanMeatContract from '../contracts/LeanMeat.json';
import getWeb3 from '../utils/getWeb3';
import truffleContract from 'truffle-contract';
// import Button from 'react-bootstrap/lib/Button';
import { Form, FormControl, FormGroup, ControlLabel, Col, Button, Tooltip, HelpBlock } from 'react-bootstrap';
import Users from './Users';

// const Admin = () => (
//   <div>
//     <h2>Admin</h2>
//     <div>
//       <h3>Users</h3>
//     </div>
//   </div>
// );

class Admin extends Component {
  state = { showAddUser: false, userAddress: '', userName: '', userRole: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const Contract = truffleContract(LeanMeatContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  }

  runExample = async () => {

    const { accounts, contract } = this.state;
    // Stores a given value, 5 by default.
    // await contract.set(5, { from: accounts[0] });
    await this.loadUsers(contract);
  };

  loadUsers = async (contract) => {
    let response = await contract.getUserCount();
    const userCount = response.toNumber();
    response = await contract.getUsers();
    const userAddresses = response;
    const users = [];
    for (let addr of userAddresses) {
      const user = await contract.getUser(addr);
      user[2] = addr;
      users.push(user);
    }
    // Get the value from the contract to prove it worked.
    // const response = await contract.get();

    // Update state with the result.
    this.setState({ userCount: userCount, users: users });
  }

  showAddUserForm = () => {
    this.setState({showAddUser: true});
  }

  getValidationState = () => {
    const length = this.state.userName.length;
    if (length > 0) {
      return 'success';
    }
    return 'error';
  }

  handleNameChange = (e) => {
    this.setState({ userName: e.target.value });
  }

  handleAddressChange = (e) => {
    this.setState({ userAddress: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const address = data.get('address');
    const name = data.get('name');
    const role = data.get('role');
    const contract = this.state.contract;
    // if (!this.validate()) {
      const web3 = this.state.web3;
      const accounts = await web3.eth.getAccounts();
      const a = await contract.addUser(address, role, name, {from: accounts[0]});

      await this.loadUsers(contract);
      return false;
    // } 
  } 


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <h2>Admin</h2>

        <Button bsStyle='primary' onClick={this.showAddUserForm}>Add User</Button>
        <Users users={this.state.users} />
        <div>The stored value is: {this.state.userCount}</div>
        <div>The stored value is: {this.state.userAddresses}</div>
        {
          this.state.showAddUser &&
          <form ref='form' onSubmit={this.handleSubmit}>
            <FormGroup
              controlId="address"
              >
              <ControlLabel>Address</ControlLabel>
              <FormControl
                name='address'
                htmlFor='address'
                type='text'
                label='Address'
                value={this.state.userAddress}
                placeholder='Enter address'
                onChange={this.handleAddressChange}
              />
            </FormGroup>
            <FormGroup
              controlId="name"
              validationState={this.getValidationState()}>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                name='name'
                htmlFor='name'
                type='text'
                label='Name'
                value={this.state.userName}
                placeholder='Enter name'
                onChange={this.handleNameChange}
              />
            </FormGroup>
            <FormGroup
               controlId='role'
             >
             <ControlLabel>Role</ControlLabel>
             <FormControl htmlFor='role' name='role' componentClass='select' placeholder='select'>
               <option value='0'>select</option>
               <option value='1'>Producer</option>
               <option value='2'>Shipper</option>
             </FormControl>
             <Button type='submit'>Submit</Button>
            </FormGroup>
          </form>
        }
      </div>
    );
  }

}

export default Admin;