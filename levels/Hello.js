const {
    HELLO_INSTANCE_ADDRESS
} = require('./utils');

async function main(levelName) {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Hello Ethernaut level');

    if (!HELLO_INSTANCE_ADDRESS) {
        console.log('Hello instance address not found');
        return;
    }

    console.log('Hello instance address', HELLO_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();
    const instance = await ethers.getContractAt("Instance", HELLO_INSTANCE_ADDRESS);

    const password = await instance.password();

    const tx = await instance.connect(attacker).authenticate(password);
    logTransactionLink(tx.hash);

    await tx.wait();

    console.log('\x1b[32m%s\x1b[0m', 'Hello Ethernaut level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
