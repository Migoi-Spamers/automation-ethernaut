const {BLOCK_EXPLORER_URL, MAGIC_NUMBER_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Magic Number level');

    if (!MAGIC_NUMBER_INSTANCE_ADDRESS) {
        console.log('Magic Number instance address not found');
        return;
    }

    console.log('Magic Number instance address', MAGIC_NUMBER_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("MagicNumber");
    const contract = factory.attach(MAGIC_NUMBER_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("MagicNumberAttacker");
    const attackerContract = await attackerFactory.deploy();
    await attackerContract.deployed();

    const tx = await contract.setSolver(attackerContract.address);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Magic Number level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
