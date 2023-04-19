const {
    MAGIC_NUMBER_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink
} = require('./utils');

async function main(levelName) {
    logStartingLevel(levelName);

    if (!MAGIC_NUMBER_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, MAGIC_NUMBER_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("MagicNumber");
    const contract = factory.attach(MAGIC_NUMBER_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("MagicNumberAttacker");
    const attackerContract = await attackerFactory.deploy();
    await attackerContract.deployed();

    const tx = await contract.setSolver(attackerContract.address);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
