pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/LeanMeat.sol";

contract TestLeanMeat {
  LeanMeat leanMeat = LeanMeat(DeployedAddresses.LeanMeat());

  function testNoUserWhenInit() public {
    // leanMeat.getUsers();
    uint expected = 0;
    Assert.equal(leanMeat.getUserCount(), expected, "User empty");
  }

  function testGetUsers() public {
    address expected = this;
    address[] memory users = leanMeat.getUsers();
    Assert.equal(users[0], expected);
  }

}
