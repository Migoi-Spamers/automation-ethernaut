const levelNames = [
    'Fallout',
    'Fallback',
    'CoinFlip',
    'Telephone',
    'Token',
    'Delegation',
    'Force',
    'Vault',
    'King',
    'Elevator',
    'Privacy',
    'GatekeeperOne',
    'GatekeeperTwo',
    'NaughtCoin',
    'MagicNumber',
    'Recovery',
    'Shop',
    'Dex',
    'GoodSamaritan',
].filter(Boolean);

const sleep = (sleepTime = 1000) => new Promise((resolve) => setTimeout(() => resolve(), sleepTime));

async function main() {
    for (let i = 0; i < levelNames.length; i++) {
        const levelName = levelNames[i];
        const path = `../levels/${levelName}`;
        const executeFunction = require(path);

        try {
            await executeFunction(levelName);
        } catch (error) {
            console.log(levelName, error);
        }

        await sleep();
    }
    return;
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
