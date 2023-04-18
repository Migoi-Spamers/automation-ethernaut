const {
    DEX_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');

async function main(levelName) {
    logStartingLevel(levelName);

    if (!DEX_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, DEX_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Dex");
    const contract = factory.attach(DEX_INSTANCE_ADDRESS);

    let tx;
    tx = await contract.approve(contract.address, 500);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    const t1 = await contract.token1();
    logTransactionLink(tx.hash);
    await tx.wait(1);

    const t2 = await contract.token2();
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await contract.swap(t1, t2, 10);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await contract.swap(t2, t1, 20);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await contract.swap(t1, t2, 24);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await contract.swap(t2, t1, 30);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await contract.swap(t1, t2, 41);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await contract.swap(t2, t1, 45);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
