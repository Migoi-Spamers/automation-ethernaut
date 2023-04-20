const {
    VAULT_INSTANCE_ADDRESS,
    logInstanceAddress,
    logInstanceAddressIsNull,
    logStartingLevel,
    logSuccessfullyLevel,
    logTransactionLink,
} = require('./utils');

async function main(levelName = 'Vault') {
    logStartingLevel(levelName);

    if (!VAULT_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, VAULT_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Vault");
    const contract = factory.attach(VAULT_INSTANCE_ADDRESS);
    const password = await ethers.provider.getStorageAt(contract.address, 1);

    const tx = await contract.unlock(password);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
