const {
    GATEKEEPER_TWO_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
} = require('./utils');

async function main(levelName = 'GatekeeperTwo') {
    logStartingLevel(levelName);

    if (!GATEKEEPER_TWO_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, GATEKEEPER_TWO_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("GatekeeperTwo");
    const contract = factory.attach(GATEKEEPER_TWO_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("GatekeeperTwoAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();

    logSuccessfullyLevel(levelName);
}

module.exports = main;
