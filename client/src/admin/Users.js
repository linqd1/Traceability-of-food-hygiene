import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import User from './User';

function Users(props) {
  if (typeof props.users === 'undefined') {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
      </Table>
    );
  }
  return (
    <div>
      <h3>User list (1 - Producer; 2 - Shipper)</h3>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(c => <User key={c[2]} address={c[2]} name={c[1]} role={c[0].toNumber()} />)}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;