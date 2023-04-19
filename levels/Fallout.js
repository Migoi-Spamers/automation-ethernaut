const {
    FALLOUT_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');

async function main(levelName) {
    logStartingLevel(levelName);

    if (!FALLOUT_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, FALLOUT_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Fallout");
    const contract = factory.attach(FALLOUT_INSTANCE_ADDRESS);

    const tx = await contract.Fal1out();
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
