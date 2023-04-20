const {
    HELLO_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink
} = require('./utils');

async function main(levelName = 'Hello Ethernaut') {
    logStartingLevel(levelName);

    if (!HELLO_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, HELLO_INSTANCE_ADDRESS);

    let contract, tx;
    const [attacker] = await ethers.getSigners();

    const infoAbi = ["function info() pure returns (string)"];
    contract = new ethers.Contract(HELLO_INSTANCE_ADDRESS, infoAbi, attacker);
    tx = await contract.info();

    const info1Abi = ["function info1() pure returns (string)"];
    contract = new ethers.Contract(HELLO_INSTANCE_ADDRESS, info1Abi, attacker);
    tx = await contract.info1();

    const info2Abi = ["function info2(string) pure returns (string)"];
    contract = new ethers.Contract(HELLO_INSTANCE_ADDRESS, info2Abi, attacker);
    tx = await contract.info2("hello");

    const infoNumAbi = ["function infoNum() pure returns (uint)"];
    contract = new ethers.Contract(HELLO_INSTANCE_ADDRESS, infoNumAbi, attacker);
    tx = await contract.infoNum();

    const info42Abi = ["function info42() pure returns (string)"];
    contract = new ethers.Contract(HELLO_INSTANCE_ADDRESS, info42Abi, attacker);
    tx = await contract.info42();

    const theMethodNameAbi = ["function theMethodName() pure returns (string)"];
    contract = new ethers.Contract(HELLO_INSTANCE_ADDRESS, theMethodNameAbi, attacker);
    tx = await contract.theMethodName();

    const method7123949Abi = ["function method7123949() pure returns (string)"];
    contract = new ethers.Contract(HELLO_INSTANCE_ADDRESS, method7123949Abi, attacker);
    tx = await contract.method7123949();

    const passwordAbi = ["function password() pure returns (string)"];
    contract = new ethers.Contract(HELLO_INSTANCE_ADDRESS, passwordAbi, attacker);
    const password = await contract.password();

    const authenticateAbi = ["function authenticate(string)"];
    contract = new ethers.Contract(HELLO_INSTANCE_ADDRESS, authenticateAbi, attacker);
    tx = await contract.authenticate(password);
    logTransactionLink(tx.hash);
    tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
