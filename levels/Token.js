const {
    TOKEN_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');

// you can get any address on blockchain
const randomAddress = '0x0000000000000000000000000000000000000001';

async function main(levelName = 'Token') {
    logStartingLevel(levelName);

    if (!TOKEN_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, TOKEN_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Token");
    const contract = factory.attach(TOKEN_INSTANCE_ADDRESS);

    const tx = await contract.transfer(randomAddress, 21);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
