import React from "react";
import PropTypes from "prop-types";

function User(props) {
  return (
    <tr>
      <td></td>
      <td>{props.address}</td>
      <td>{props.name}</td>
      <td>{props.role}</td>
    </tr>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired
};

export default User;