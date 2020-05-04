# Getting Started with Ethereum Development

This tutorial teaches you how to get started with Ethereum development. While it explains certain features of the Solidity programming language, it does not go into it in depth. For that I recommend [CryptoZombies](https://cryptozombies.io/). This tutorial is more focused on setting up a development environment and getting a complete application deployed.

The directions in this tutorial assume you are using Linux (or possibly another modern variant of UNIX). If you are using Windows, [you can install Linux on top of that](https://ubuntu.com/tutorials/tutorial-ubuntu-on-windows#1-overview). 

## Set up the Environment

1. The software we use is based on `npm`, the [Node.js Package Manager](https://www.npmjs.com/). The command to do this on versions of Linux that are based on Debian, such as Ubuntu, is:
```
sudo apt install npm
```
2. Install [the truffle development environment](https://www.trufflesuite.com/docs/truffle/overview) and [the ganache blockchain simulator]. The `-g` parameter declares that this package is to be installed globally, for all users of this computer. That requires root privileges.
```
sudo npm install -g truffle ganache-cli
```

## Your First Contract

With the environment set up, you can create a contract.

### Create the Skeleton

Contracts require a somewhat complicated directory structure. The easiest way to create it is to copy a sample project and then delete the project-specific files.

1. Create a new directory and unbox the MetaCoin project
```
mkdir contract
truffle unbox metacoin
```
2. Delete the project-specific files.
```
rm contracts/MetaCoin.sol
rm migrations/2_deploy_contracts.js
```
3. Edit `truffle-config.js`. Uncomment the network definition and change the port to 8545 (the default port for `ganache-cli`). The edited file should include these lines. You can keep the test network or remove it.
```
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  }
};
```


### Write the Contract

Write the contract in the `contracts` directory. Here is a simple contract [(you can get the source code without comments here)](https://github.com/qbzzt/etherdocs/blob/master/startingout/Counter.sol). For the rest of the tutorial, I am going to assume this is the contract you're using.

This line specifies the acceptable versions of the Solidity programming language. In this case we only allow 0.5.x versions. 
```
pragma solidity >=0.5.0 <0.6.0;
```

Define a contract called `Counter`. A contract functions in many ways like [a class in Object Oriented Programming](https://en.wikipedia.org/wiki/Class_(computer_programming)). It contains variables, 
```
contract Counter {
```

This is a field variable. The type, `uint`, is a 256 bit unsigned integer. All the fields in a contract are effectively public. Ethereum code is executed by multiple computers in multiple locations, and can be verified by anybody. This would be impossible if some part of the contract state had been unreadable.
```
        uint value = 0;
```     

Contract methods that modify the blockchain (for example, by incrementing the counter) cannot return a value to the caller. Instead, they can emit a global event. The caller could listen to this event, and receive the response that way.
```
        event Asked4Value(uint, address);
```

The `increment` function does not take any parameters. It increments `value` and then emits an `Asked4Value` event with the new value and the identity of the caller to which it is responding (`msg.sender` means the sender of this message).

The `external` modifier means that this function can only be called from outside the contract. By default functions are internal, and are only accessible from within the contract. This function needs to be called from outside the contract.
```
        function increment() external {
                value++;
                emit Asked4Value(value, msg.sender);
        }
}
```


### Compile and Test the Contract

1. Run this command in a separate terminal to start the Ganache test network:
```
ganache-cli -v 
```
2. Compile the contract:
```
truffle compile
```
3. Connect to the Ganache network you are running locally:
```
truffle console --network development
```
4. Deploy the contract:
```
contract = await Counter.new()
```
5. Run the `increment` function:
```
contract.incremenet()
```
6. To view the last event from the contract, which gives us the counter's 
value, run this:
```
(await contract.getPastEvents())[0].returnValues[0]
```
7. Repeat the previous two steps several times to see the counter is
incremented correctly.

As you may have realized from the commands above, `truffle` executes JavaScript. The `await` keyword is used in JavaScript when a process can take a long time to avoid tying up the process ([you can read more about it here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)).

### Write Contract Tests

## Deploy to a Test Network

### MetaMask

### Kovan

### Deploy and Test

## Web User Interface

## Conclusion

