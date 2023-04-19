require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-web3");

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",
    networks: {
        sepolia: {
            url: `https://sepolia.infura.io/v3/${ALCHEMY_API_KEY}`,
            accounts: [PRIVATE_KEY],
        }
    },
    solidity: {
        compilers: [
            {
                version: "0.6.6",
            },
            {
                version: "0.8.8",
            },
        ],
    },
};