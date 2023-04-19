const {BLOCK_EXPLORER_URL, VAULT_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Vault level');

    if (!VAULT_INSTANCE_ADDRESS) {
        console.log('Vault instance address not found');
        return;
    }

    console.log('Vault instance address', VAULT_INSTANCE_ADDRESS);

    const factory = await ethers.getContractFactory("Vault");
    const contract = factory.attach(VAULT_INSTANCE_ADDRESS);
    const password = await ethers.provider.getStorageAt(contract.address, 1);

    const tx = await contract.unlock(password);
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Vault level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
