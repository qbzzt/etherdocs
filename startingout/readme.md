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

With the environment set up, you can create a contract. Contract 

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

### Write the Contract

Write the contract in the `contracts` directory. Here is a simple contract (you can read the full source code here):



### Compile and test the Contract

## Deploy to a Test Network

### MetaMask

### Kovan

### Deploy and Test

## Web User Interface

## Conclusion

