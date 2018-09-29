import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Product from './Product';

function Products(props) {
  if (typeof props.products === 'undefined') {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Category</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
      </Table>
    );
  }
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Category</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.products.map(c => <Product key={c[0].toNumber()} id={c[0].toNumber()} category={c[1]} description={c[2]} timePoints={c[3]} />)}
      </tbody>
    </Table>
  );
}

export default Products;