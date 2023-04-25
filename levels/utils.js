const BLOCK_EXPLORER_URL = process.env.SEPOLIA_BLOCK_EXPLORER_URL;

const logStartingLevel = (levelName) => {
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
    console.log(`${levelName} level`);
};

const logSuccessfullyLevel = (levelName) => {
    console.log('\x1b[32m%s\x1b[0m', `${levelName} level. Done !!!`);
    console.log('\x1b[33m%s\x1b[0m', '* * * * * * * * * * * * * * * ');
};

const logInstanceAddressIsNull = (levelName) => {
    console.log(`${levelName} instance address not found`);
};

const logInstanceAddress = (levelName, instanceAddress) => {
    console.log(`${levelName} instance address`, instanceAddress);
};

const logTransactionLink = (txHash) => {
    console.log(`Transaction hash : ${BLOCK_EXPLORER_URL}/${txHash}`);
};

const instanceAddresses = {
    HELLO_INSTANCE_ADDRESS: process.env.HELLO_INSTANCE_ADDRESS,
    FALLBACK_INSTANCE_ADDRESS: process.env.FALLBACK_INSTANCE_ADDRESS,
    FALLOUT_INSTANCE_ADDRESS: process.env.FALLOUT_INSTANCE_ADDRESS,
    COIN_FLIP_INSTANCE_ADDRESS: process.env.COIN_FLIP_INSTANCE_ADDRESS,
    TELEPHONE_INSTANCE_ADDRESS: process.env.TELEPHONE_INSTANCE_ADDRESS,
    TOKEN_INSTANCE_ADDRESS: process.env.TOKEN_INSTANCE_ADDRESS,
    DELEGATION_INSTANCE_ADDRESS: process.env.DELEGATION_INSTANCE_ADDRESS,
    FORCE_INSTANCE_ADDRESS: process.env.FORCE_INSTANCE_ADDRESS,
    VAULT_INSTANCE_ADDRESS: process.env.VAULT_INSTANCE_ADDRESS,
    KING_INSTANCE_ADDRESS: process.env.KING_INSTANCE_ADDRESS,
    REENTRANCE_INSTANCE_ADDRESS: process.env.REENTRANCE_INSTANCE_ADDRESS,
    ELEVATOR_INSTANCE_ADDRESS: process.env.ELEVATOR_INSTANCE_ADDRESS,
    PRIVACY_INSTANCE_ADDRESS: process.env.PRIVACY_INSTANCE_ADDRESS,
    GATEKEEPER_ONE_INSTANCE_ADDRESS: process.env.GATEKEEPER_ONE_INSTANCE_ADDRESS,
    GATEKEEPER_TWO_INSTANCE_ADDRESS: process.env.GATEKEEPER_TWO_INSTANCE_ADDRESS,
    NAUGHT_COIN_INSTANCE_ADDRESS: process.env.NAUGHT_COIN_INSTANCE_ADDRESS,
    RECOVERY_INSTANCE_ADDRESS: process.env.RECOVERY_INSTANCE_ADDRESS,
    MAGIC_NUMBER_INSTANCE_ADDRESS: process.env.MAGIC_NUMBER_INSTANCE_ADDRESS,
    PRESERVATION_INSTANCE_ADDRESS: process.env.PRESERVATION_INSTANCE_ADDRESS,
    ALIEN_CODEX_INSTANCE_ADDRESS: process.env.ALIEN_CODEX_INSTANCE_ADDRESS,
    DENIAL_INSTANCE_ADDRESS: process.env.DENIAL_INSTANCE_ADDRESS,
    SHOP_INSTANCE_ADDRESS: process.env.SHOP_INSTANCE_ADDRESS,
    DEX_INSTANCE_ADDRESS: process.env.DEX_INSTANCE_ADDRESS,
    DEX_TWO_INSTANCE_ADDRESS: process.env.DEX_TWO_INSTANCE_ADDRESS,
    DOUBLE_ENTRY_POINT_INSTANCE_ADDRESS: process.env.DOUBLE_ENTRY_POINT_INSTANCE_ADDRESS,
    GOOD_SAMARITAN_INSTANCE_ADDRESS: process.env.GOOD_SAMARITAN_INSTANCE_ADDRESS,
};

module.exports = {
    logTransactionLink,
    logInstanceAddress,
    logStartingLevel,
    logSuccessfullyLevel,
    logInstanceAddressIsNull,
    ...instanceAddresses
};