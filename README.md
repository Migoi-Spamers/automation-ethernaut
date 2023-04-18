# Ethernaut Hardhat Project

This project will help you resolve challenges on https://ethernaut.openzeppelin.com

I split ethernaut to 3 stage:
- Create instance address: At the stage you need to click to `get new instance` button on the website. Because currently, I don't know using the openzeppelin library so you need manually handle this stage.
- Resolve challenge: Ok the stage I will help you resolve it.
- Submit challenge: You need manually handle this stage too.

### Deep to step by step

#### Setup
- First, you need to install `nodejs` on your pc or laptop. I recommended it should v18 version.
- Ok, now you had nodejs. Run this command to install dependencies:
```
npm install
```

#### Setup environment
- Can you see the `.env.example`.  Yes, this is the default env file.
- You need to create a `.env` file and copy the content of `.env.example` to it.
```
ALCHEMY_API_KEY=<you_need_to_create_a_project_on_alchemy_and_get_api_key_pass_to_here>
PRIVATE_KEY=<the_private_key_of_your_wallet>

```
The instance addresses will create after you create the instance level successfully.
```
FALLBACK_INSTANCE_ADDRESS=<fallback_instance_address>
...
```

#### Resolve levels
You can resolve a level by command `npx hardhat run <file_name> --network sepolia`.
Example:

```
npx hardhat run levels/Fallback.js --network sepolia
```

You can run all levels by command
```
npx hardhat run scripts/index.js --network sepolia
```

#### Submit levels
After you see log level is `Done`. You can go to website and submit it.

### Upgrade
- I will learn about openzeppelin library. So It can help me automation create instance addresses.
