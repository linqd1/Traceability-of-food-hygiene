import React from 'react';
import PropTypes from 'prop-types';
import ProductTimePoints from './ProductTimePoints'

function Product(props) {
  return (
    <tr>
      <td></td>
      <td>{props.id}</td>
      <td>{props.category}</td>
      <td>{props.description}</td>
      <td><ProductTimePoints timePoints={props.timePoints}/></td>
    </tr>
  );
}

Product.propTypes = {
  id: PropTypes.number.isRequired
};

export default Product;