import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <Button bsStyle='primary' onClick={this.props.closePopup}>Close</Button>
        </div>
      </div>
    );
  }
}

export default Popup;