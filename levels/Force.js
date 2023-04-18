const {
    FORCE_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
} = require('./utils');

async function main(levelName) {
    logStartingLevel(levelName);

    if (!FORCE_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, FORCE_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Force");
    const contract = factory.attach(FORCE_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("ForceAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address, {value: 1});
    await attackerContract.deployed();

    logSuccessfullyLevel(levelName);
}

module.exports = main;
