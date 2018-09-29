import React, { Component } from 'react';
import LeanMeatContract from '../contracts/LeanMeat.json';
import getWeb3 from '../utils/getWeb3';
import truffleContract from 'truffle-contract';
// import Button from 'react-bootstrap/lib/Button';
import { Form, FormControl, FormGroup, ControlLabel, Col, Button, Tooltip, HelpBlock, Panel, PanelGroup } from 'react-bootstrap';
import Popup from '../utils/Popup';
import Products from '../product/Products';
import Users from '../admin/Users';
const producerAddress = '0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2';

class Producer extends Component {
  state = { showPopup: false, errorMessage: undefined, users: undefined, productId: undefined, selectedProducerAddress: undefined, newProductId: undefined, newProductCategory: 'select', newProductDescription: undefined };

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
      console.log(web3);
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
    const response = await contract.getUsers();
    const userAddresses = response;
    const users = [];
    for (let addr of userAddresses) {
      const user = await contract.getUser(addr);
      user[2] = addr;
      users.push(user);
    }
    this.setState({users});

    // Stores a given value, 5 by default.
    // await contract.set(5, { from: accounts[0] });
  };

  getProductIdValidationState = () => {
    const length = this.state.productId ? this.state.productId.length : 0;
    if (length == 0) return 'warning';
    return 'success';
  }

  getNewProductIdValidationState = () => {
    const length = this.state.newProductId ? this.state.newProductId.length : 0;
    if (length == 0) return 'warning';
    return 'success';
  }

  handleProductIdChange = (e) => {
     this.setState({productId: e.target.value});
  }

  handleSelectedProducerAddressChange = (e) => {
    this.setState({selectedProducerAddress: e.target.value});
  }

  handleNewProductIdChange = (e) => {
    this.setState({newProductId: e.target.value});
  }

  handleNewProductCategoryChange = (e) => {
    this.setState({newProductCategory: e.target.value});
  }

  handleNewProductDescriptionChange = (e) => {
    this.setState({newProductDescription: e.target.value});
  }

  /**
   * Hanlder for search product
   */
  searchProducts = async () => {
    let foundProducts = [];
    const contract = this.state.contract;
    let product = null;
    try { 
      product = await contract.getProduct(this.state.productId);
    } catch (err) {
      console.error('Error when fetch product', err);
    }
    if (product) {
      foundProducts.push(product);
    }
    this.setState({foundProducts});
  }

  packNewProduct = async () => {
    const selectedProducerAddress = this.state.selectedProducerAddress;
    const productId = this.state.newProductId;
    const productCategory = this.state.newProductCategory;
    const productDescription = this.state.newProductDescription;
    const contract = this.state.contract;

    try {
      await contract.productPacked(parseInt(productId, 10), productCategory, productDescription, {from: selectedProducerAddress});
    } catch (err) {
      this.setState({showPopup: true, errorMessage: 'Error when pack product!'});
      console.error('Error when pack product', err);
    }
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    if (!this.state || !this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <h2>Producer</h2>

        {this.state.showPopup ? 
          <Popup
            text={this.state.errorMessage}
            closePopup={this.togglePopup}
          />
          : null
        }
        <Users users={this.state.users} />
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Search Products</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <FormGroup controlId="productId" validationState={this.getProductIdValidationState()}>
              <ControlLabel>Product Code</ControlLabel>
              <FormControl
                name='productId'
                htmlFor='productId'
                type='text'
                label='Product Id'
                value={this.state.productId}
                placeholder='Enter productId'
                onChange={this.handleProductIdChange}
              />
            </FormGroup>
            <Button bsStyle='primary' onClick={this.searchProducts}>Search</Button>
            <Products products={this.state.foundProducts}/>
          </Panel.Body>
        </Panel>

        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Pack New Product</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <FormGroup controlId="selectedProducerAddress">
              <ControlLabel>Select A Producer</ControlLabel>
              <FormControl
                name='selectedProducerAddress'
                htmlFor='selectedProducerAddress'
                type='text'
                label='Product Address'
                value={this.state.selectedProducerAddress}
                placeholder='Enter producer address'
                onChange={this.handleSelectedProducerAddressChange}
              />
            </FormGroup>
            <FormGroup controlId="newProductId" validationState={this.getNewProductIdValidationState()}>
              <ControlLabel>Product Code</ControlLabel>
              <FormControl
                name='newProductId'
                htmlFor='newProductId'
                type='text'
                label='Product Id'
                value={this.state.newProductId}
                placeholder='Enter productId'
                onChange={this.handleNewProductIdChange}
              />
            </FormGroup>

            <FormGroup controlId="newProductCategory">
              <ControlLabel>Product Category</ControlLabel>
              <FormControl
                name='newProductCategory'
                htmlFor='newProductCategory'
                componentClass='select' placeholder='select'
                value={this.state.newProductCategory}
                onChange={this.handleNewProductCategoryChange}
              >
                <option value='0'>select</option>
                <option value='beef'>Beef</option>
                <option value='pork'>Pork</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId="newProductDescription">
              <ControlLabel>Product Description</ControlLabel>
              <FormControl
                name='newProductDescription'
                htmlFor='newProductDescription'
                componentClass="textarea"
                value={this.state.newProductDescription}
                placeholder='Enter Product Category'
                onChange={this.handleNewProductDescriptionChange}
              >
                
              </FormControl>
            </FormGroup>

            <Button bsStyle='primary' onClick={this.packNewProduct}>Pack</Button>
          </Panel.Body>
        </Panel>
        
      </div>
    );
  }
}

export default Producer;