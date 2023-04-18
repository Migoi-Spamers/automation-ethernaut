const {ethers} = require('hardhat');
const {GATEKEEPER_TWO_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Gatekeeper Two level');

    if (!GATEKEEPER_TWO_INSTANCE_ADDRESS) {
        console.log('Gatekeeper Two instance address not found');
        return;
    }

    console.log('Gatekeeper Two instance address', GATEKEEPER_TWO_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("GatekeeperTwo");
    const contract = factory.attach(GATEKEEPER_TWO_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("GatekeeperTwoAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();

    console.log('\x1b[32m%s\x1b[0m', 'Gatekeeper Two level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
