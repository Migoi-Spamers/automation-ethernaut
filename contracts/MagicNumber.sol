// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MagicNumber {
    address public solver;

    constructor() public {}

    function setSolver(address _solver) public {
        solver = _solver;
    }
}

contract MagicNumberAttacker {
    constructor() {
        assembly {
            mstore(0, 0x602a60005260206000f3)
            return(0x16, 0x0a)
        }
    }
}
