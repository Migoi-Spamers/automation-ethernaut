const {BLOCK_EXPLORER_URL, TOKEN_INSTANCE_ADDRESS} = require('./utils');

// you can get any address on blockchain
const randomAddress = '0x0000000000000000000000000000000000000001';

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Token level');

    if (!TOKEN_INSTANCE_ADDRESS) {
        console.log('Token instance address not found');
        return;
    }

    console.log('Token instance address', TOKEN_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Token");
    const contract = factory.attach(TOKEN_INSTANCE_ADDRESS);

    const tx = await contract.transfer(randomAddress, 21);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Token level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
