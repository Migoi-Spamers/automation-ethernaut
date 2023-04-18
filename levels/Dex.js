const {BLOCK_EXPLORER_URL, DEX_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Dex level');

    if (!DEX_INSTANCE_ADDRESS) {
        console.log('Dex instance address not found');
        return;
    }

    console.log('Dex instance address', DEX_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Dex");
    const contract = factory.attach(DEX_INSTANCE_ADDRESS);

    let tx;
    tx = await contract.approve(contract.address, 500);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    const t1 = await contract.token1();
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    const t2 = await contract.token2();
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    tx = await contract.swap(t1, t2, 10);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    tx = await contract.swap(t2, t1, 20);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    tx = await contract.swap(t1, t2, 24);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    tx = await contract.swap(t2, t1, 30);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    tx = await contract.swap(t1, t2, 41);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    tx = await contract.swap(t2, t1, 45);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Dex level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
