const executeHelloLevel = require('../levels/Hello');
const executeFalloutLevel = require('../levels/Fallout');
const executeFallbackLevel = require('../levels/Fallback');
const executeCoinFlipLevel = require('../levels/CoinFlip');
const executeTelephoneLevel = require('../levels/Telephone');
const executeTokenLevel = require('../levels/Token');
const executeDelegationLevel = require('../levels/Delegation');
const executeForceLevel = require('../levels/Force');
const executeVaultLevel = require('../levels/Vault');
const executeKingLevel = require('../levels/King');
const executeElevatorLevel = require('../levels/Elevator');
const executePrivacyLevel = require('../levels/Privacy');
const executeGatekeeperOneLevel = require('../levels/GatekeeperOne');
const executeGatekeeperTwoLevel = require('../levels/GatekeeperTwo');
const executeNaughtCoinTwoLevel = require('../levels/NaughtCoin');
const executePreservationLevel = require('../levels/Preservation');
const executeShopLevel = require('../levels/Shop');
const executeDexLevel = require('../levels/Dex');
const executeGoodSamaritanLevel = require('../levels/GoodSamaritan');
const executeRecoveryLevel = require('../levels/Recovery');
const executeMagicNumberLevel = require('../levels/MagicNumber');

const sleep = (sleepTime = 2000) => new Promise((resolve, reject) => setTimeout(() => resolve(), sleepTime));

async function main() {
    try {
        // await executeHelloLevel();
    } catch (error) {
        console.log('Hello Ethernaut: ', error);
    }

    try {
        await executeFallbackLevel();
    } catch (error) {
        console.log('Fallback: ', error);
    }
    sleep();

    try {
        await executeFalloutLevel();
    } catch (error) {
        console.log('Fallout: ', error);
    }
    sleep();

    try {
        await executeCoinFlipLevel();
    } catch (error) {
        console.log('Coin Flip: ', error);
    }
    sleep();

    try {
        await executeTelephoneLevel();
    } catch (error) {
        console.log('Telephone: ', error);
    }
    sleep();

    try {
        await executeTokenLevel();
    } catch (error) {
        console.log('Token: ', error);
    }
    sleep();

    try {
        await executeDelegationLevel();
    } catch (error) {
        console.log('Delegation: ', error);
    }
    sleep();

    try {
        await executeForceLevel();
    } catch (error) {
        console.log('Token: ', error);
    }
    sleep();

    try {
        await executeVaultLevel();
    } catch (error) {
        console.log('Vault: ', error);
    }
    sleep();

    try {
        await executeKingLevel();
    } catch (error) {
        console.log('King: ', error);
    }
    sleep();

    try {
        await executeElevatorLevel();
    } catch (error) {
        console.log('Elevator: ', error);
    }
    sleep();

    try {
        await executePrivacyLevel();
    } catch (error) {
        console.log('Privacy: ', error);
    }
    sleep();

    try {
        await executeGatekeeperOneLevel();
    } catch (error) {
        console.log('Gatekeeper One: ', error);
    }
    sleep();

    try {
        await executeGatekeeperTwoLevel();
    } catch (error) {
        console.log('Gatekeeper Two: ', error);
    }
    sleep();

    try {
        await executeNaughtCoinTwoLevel();
    } catch (error) {
        console.log('Naught Coin: ', error);
    }
    sleep();

    try {
        await executeRecoveryLevel();
    } catch (error) {
        console.log('Recovery: ', error);
    }
    sleep();

    try {
        await executeMagicNumberLevel();
    } catch (error) {
        console.log('Magic Number: ', error);
    }
    sleep();
    
    try {
        // this level doesn't crack
        //await executePreservationLevel();
    } catch (error) {
        console.log('Preservation: ', error);
    }
    sleep();

    try {
        await executeShopLevel();
    } catch (error) {
        console.log('Shop: ', error);
    }
    sleep();

    try {
        await executeDexLevel();
    } catch (error) {
        console.log('Dex: ', error);
    }
    sleep();

    try {
        await executeGoodSamaritanLevel();
    } catch (error) {
        console.log('Good Samaritan: ', error);
    }
    sleep();

    console.log('----END----');
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
