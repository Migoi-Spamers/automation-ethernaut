const {
    DOUBLE_ENTRY_POINT_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');

async function main(levelName = 'DoubleEntryPoint') {
    logStartingLevel(levelName);

    if (!DOUBLE_ENTRY_POINT_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, DOUBLE_ENTRY_POINT_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("DoubleEntryPoint");
    const contract = factory.attach(DOUBLE_ENTRY_POINT_INSTANCE_ADDRESS);

    const fortaAddress = await contract.forta();
    const fortaFactory = await ethers.getContractFactory("Forta");
    const forta = fortaFactory.attach(fortaAddress);

    const detectionBotFactory = await ethers.getContractFactory("DetectionBot");
    const detectionBot = await detectionBotFactory.deploy(forta.address);
    await detectionBot.deployed();

    const tx = await forta.setDetectionBot(detectionBot.address);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
