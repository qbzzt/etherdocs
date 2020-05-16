# Getting Started with Ethereum Development
### Ori Pomerantz (qbzzt1@gmail.com)

This tutorial teaches you how to get started with Ethereum development. While it explains certain features 
of the Solidity programming language, it does not go into it in depth. For that I recommend 
[CryptoZombies](https://cryptozombies.io/). This tutorial is more focused on setting up a development environment 
and getting a complete application deployed.

The directions in this tutorial assume you are using Linux (or possibly another modern variant of UNIX). If 
you are using Windows, 
[you can install Linux on top of that](https://ubuntu.com/tutorials/tutorial-ubuntu-on-windows#1-overview). 

## Set up the Environment

1. The software we use is based on `npm` (the [Node.js Package Manager](https://www.npmjs.com/)) and Node.js.
You can [download them from here](https://nodejs.org/en/download/package-manager/). 

2. Install [the truffle development environment](https://www.trufflesuite.com/docs/truffle/overview) and 
[the ganache blockchain simulator](https://www.trufflesuite.com/ganache). The `-g` parameter declares that this 
package is to be installed globally, for all users of this computer. That requires root privileges.
```
sudo npm install -g truffle ganache-cli
```

## Your First Contract

With the environment set up, you can create a contract.

### Create the Skeleton

Contracts require a somewhat complicated directory structure. The easiest way to create it is to use
`truffle init`.

1. Create a new directory and initialize truffle. You also need to install `@truffle/hdwallet-provider`,
which you will use later to deploy the contract to a test network.
```
mkdir workdir
cd workdir
truffle init
npm install @truffle/hdwallet-provider
```
2. Edit `truffle-config.js`. Make sure the edited file includes these lines:
```javascript
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

Write the contract in the `contracts` directory. Here is a simple contract [(you can get the source code without the 
explanatory text here)](https://raw.githubusercontent.com/qbzzt/etherdocs/master/startingout/Counter.sol). For the rest of the 
tutorial, I am going to assume this is the contract you're using, and that it is stored in `contracts/Counter.sol`.

This line specifies the acceptable versions of the Solidity programming language. In this case we only allow 
0.5.x versions. 
```solidity
pragma solidity >=0.5.0 <0.6.0;
```

Define a contract called `Counter`. A contract functions in many ways like 
[a class in Object Oriented Programming](https://en.wikipedia.org/wiki/Class_(computer_programming)). 
It contains variables and methods.
```solidity
contract Counter {
```

This is a field variable. The type, `uint`, is a 256 bit unsigned integer. All the fields in a contract are 
effectively public. Ethereum code is executed by multiple computers in multiple locations, and can be verified 
by anybody. This would be impossible if some part of the contract state had been unreadable.
```solidity
        uint value = 0;
```     

Contract methods that modify the blockchain (for example, by incrementing the counter) cannot return a 
value to the caller. Instead, they can emit a global event. The caller could listen to this event, and 
receive the response that way.
```solidity
        event Asked4Value(uint, address);
```

The `increment` function does not take any parameters. It increments `value` and then emits 
an `Asked4Value` event with the new value and the identity of the caller to which it is responding
(`msg.sender` means the sender of this message).

The `external` modifier means that this function can only be called from outside the contract. By default 
functions are internal, and are only accessible from within the contract. This function needs to be called 
from outside the contract.
```solidity
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
3. Connect to the Ganache network you are running locally. The `development` network is the default, so 
`--network development` is optional.
```
truffle console --network development
```
4. Deploy the contract:
```javascript
contract = await Counter.new()
```
5. Run the `increment` function:
```javascript
contract.incremenet()
```
6. To view the last event from the contract, which gives us the counter's 
value, run this:
```javascript
(await contract.getPastEvents())[0].returnValues[0]
```
7. Repeat the previous two steps several times to see the counter is
incremented correctly. Then type `.exit` to return to the command line.

As you may have realized from the commands above, `truffle` executes JavaScript. The `await` keyword is used in
JavaScript when a process can take a long time to avoid tying up the process 
([you can read more about it here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)).

### Write Contract Tests

It is important to have automated tests to make sure your program acts as it is supposed to. This is particularly
important in a dapp, because once a contract is deployed it is immutable. It cannot be fixed, it is going to stay in the 
blockchain forever.

The tests are based on [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/). For additional information 
beyond the very basic tests here, 
[see the Truffle documentation](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript). 

Tests are supposed to go in the `test` directory, and are typically written in JavaScript (you can also write them in Solidity, 
[see here](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-solidity)). This is `test/counter.js`, 
which contains a number of tests for the `Counter` contract. To get just the file without the comments, 
[click here](https://github.com/qbzzt/etherdocs/blob/master/startingout/counter.js).


We need information about the contract to test it.

```javascript
const Counter = artifacts.require("Counter");
```


Here we declare the contract we are going to test, and provide the testing function. The testing function receives
a list of accounts it can use.
```javascript
contract("Counter", async accounts => {
```

One way to separate tests is to put them in `it` clauses. Each such clause contains a string
for what should happen, and a function that actually tests it.

```javascript
        it('should return one after incrementing once', async () => {
```

Deploy an instance of the contract, and wait until it is deployed before you continue. Then, call
the `increment` method and wait for it to be done.

```javascript
                var counter = await Counter.new();
                await counter.increment();
```

This is how you get a record of the events emitted by a contract.

```javascript
                const events = await counter.getPastEvents();
```              

When a contract emits just one event for a transaction, that event is available in `events[0]`. The information 
emitted is in an array called `returnValues`. 

```javascript
                const retVal = events[0].returnValues[0];
                assert.equal(retVal, 1, 
			"The first increment didn't return one");
        });   // it should return one after incrementing once
```

This is a second test, which increments ten times and then verifies that the last event 
is the correct number.

```javascript
        it('should return n after incrementing n times', async () => {
                var counter = await Counter.new();
                var arr = [];
                const n = 10;

                for(var i=0; i<n; i++)
                        arr.push(counter.increment());
```

[`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 
only returns when all the Promises in an array have been resolved. In this case, after all ten transaction
have been processed. Using `Promise.all` lets the transactions be processed in parallel, instead of having 
to wait until a transaction is done before starting up the next one.

```javascript
                await Promise.all(arr);

                retVal = (await counter.getPastEvents())[0].returnValues[0];
                assert.equal(retVal, n, 
			`${n} increments didn't return ${n}`);
        });   // it should return n after incrementing n times

});
```

Use this command to actually run the tests:
```
truffle test
```

## Deploy to a Test Network

After you write and debug a contract locally, the next step is to deploy it to a test network. There are several test networks,
but for the purpose of this tutorial I chose to use the [Kovan network](https://kovan-testnet.github.io/website/).

### MetaMask

To interact with a network you an account (a public/private key pair). The easiest way to set one up is to use a wallet such as
the [MetaMask](https://metamask.io/) browser extension for Chrome. It takes you through the process of creating an account.

Note that this is a testing account. You may use the twelve word mnemonic for this account in your source code,
source code you may commit to a public repository. Do **not** use the same account to hold actual assets. 

### Kovan

Click on the MetaMask fox icon to open it. At the top of the popup you see your current network, by 
default the Main Ethereum Network. Click it and select **Kovan Test Network**. Now you're connected 
to the test network.

#### Ether

To deploy a contract you need gas, which you need to buy with ether. Luckily, the Kovan network lets you get ether for free:
1. Get your account address. It appears in MetaMask under the network you're using. Click it to copy to the clipboard.
1. [Click here](https://faucet.kovan.network/), log on using your GitHub account, and paste your address. 
If you do not have a GitHub account, [get one here](https://github.com/join). 

#### Truffle Configuration

Edit the project's truffle configuration file (by default `truffle-config.js`, although it can also be `truffle.js`).

At the top of the file configure the package you use to communicate, the Kovan URL, and the twelve word mnemonic that lets
truffle know your private key:

```javascript
var Provider = require('@truffle/hdwallet-provider');
var mnemonic = '<your value goes here>';
var kovanUrl = "https://kovan.infura.io/v3/c3422181d0594697a38defe7706a1e5b";
```

Within the `networks` definition add another network (and remember to add a comma between network definitions):

```javascript
    kovan: {
      provider: () => new Provider(mnemonic, kovanUrl),
      network_id: 42
    }
```

### Deploy and Test

Deploying to Kovan takes a lot longer, because everything has to be properly written into the blockchain. 
Also, we don't want to redeploy each time, so we make a note of the address to which the contract is deployed.

1. Start the console to connect to Kovan.
```bash
truffle console --network kovan
```

2. Deploy to Kovan and make note of the address to which the contract is deployed.
```javascript
contract = await Counter.new()
contract.address
```


**Note:** If you know an existing contract's address, and you have the compiled version for it, you can use the contract 
from truffle's console mode. For example, I created an instance of `Counter` and deployed it to the address `0xB2086099f3b764a167B923A670bf8A7FbD46A1c6`. Here is how you can get to the contract for that deployment and then
increment it:

```javascript
contract = await Counter.at(
	'0xB2086099f3b764a167B923A670bf8A7FbD46A1c6')
await contract.increment()
```



3. To increment the counter and get the result you run this code in the truffle console. Calling the blockchain
is a slow process that requires `await`.
```javascript
results = await contract.increment()
results.logs[0].args[0].toString()
```

4. If you want to run your automated tests on Kovan you can do that, but it is slow and expensive, and tests could
fail due to a timeout. The tests in `counter.js` cost me 0.0153 Ether (which luckily is free on Kovan) and about
52 seconds.
```bash
truffle test --network kovan
```


## Web User Interface

Solidity contracts are backend constructs. For users to be able to use [a decentralized application (dapp)](https://www.coindesk.com/learn/ethereum-101/what-is-a-decentralized-application-dapp) they need a front end they could access,
typically provided by a web server. 

### Contract Information

To access the contract we need two pieces of information:

1. The address, which you already know how to retrieve.
1. The ABI (application binary interface). You can get this information from `build/contracts/<contract>.json`.
For example, here is the ABI for `Counter`:

```json
 [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "Asked4Value",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "increment",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
```

### Write the User Interface

The easiest way to write the user interface is to use JavaScript and HTML. This lets you create a static file so
you won't have to do anything on the server side. This is important because you do not want your users to worry
you might be trying to steal information from them.

You can [see the full HTML file here](https://github.com/qbzzt/etherdocs/blob/master/startingout/counter.html). 
I am only going to explain the parts that are Ethereum specific.

Note that for security reasons you cannot access MetaMask when you open a file locally, so you'll need to 
browse to it off of a web server.

#### Setup

There are several libraries that handle most of the communication details for you. I chose to use 
[ethers.js](https://docs.ethers.io/ethers.js/html/).

```html
<script src="https://cdn.ethers.io/scripts/ethers-v4.min.js"
        charset="utf-8" type="text/javascript">
</script>
```

This is the information we need about the contract, as explained above.

```javascript
const counterData = {
   address: '0xB2086099f3b764a167B923A670bf8A7FbD46A1c6',
   abi: [
      .
      .
      .
  ] // the ABI from Counter.json
};  // counterData
```

To interact with Ethereum we use a provider. The standard is for the wallet software (such as MetaMask) to expose a
`Web3Provider` object in `window.ethereum`. The ethers.js library uses a different provider object, so we create an 
ethers.js provider out of the one we got from the wallet.

```javascript
const provider = new ethers.providers.Web3Provider(window.ethereum);
```

#### Send a Transaction


This function calls the contract to increment the stored value. It is called from a button in the HTML.

```javascript
const increment = async () => {
```

This call asks the wallet to get permission from the user to provide account information to the JavaScript code.
The user can then select what account and network to use.

```javascript
	await window.ethereum.enable();
```


This `Contract` object is used to communicate with the contract on the blockchain. The address and ABI fields are the 
contract information.

```javascript
	const contract = await new ethers.Contract(
		counterData.address, counterData.abi,
		
```

To send messages to the contract you need to have an identity with [ether](https://ethereum.org/eth/#what-is-ether-eth) to pay
for processing and sign the transaction. Use `provider.getSigner()` to get the current signer identity from the wallet (MetaMask
or any other crypto wallet). 

```javascript
		provider.getSigner()
	);
```

Create and send the transaction that goes on the ethereum network. The wallet is going to ask the user for confirmation,
because transactions cost ether and on the real network that would be real money.

```javascript
	const transaction = await contract.increment();
	const sentTime = Date.now();
	const hash = transaction.hash;
	writeToDiv("increment", `Transaction hash: ${hash}`);
```

Wait for the transaction to actually happen on the blockchain. This can take 30 seconds on Kovan. Once the transaction happens,
write the block number and the time it took.

```javascript
	const receipt = await provider.waitForTransaction(hash);
	writeToDiv("increment", `Mined in block: ${receipt.blockNumber}`);
	writeToDiv("increment", 
		`Transaction time: ${(Date.now()-sentTime)/1000} seconds`);
};   // increment
```

#### Listen to Events

This function listens to `Asked4Value` events. It is not as slow as `increment` above, but it still has some slow processes,
so it is also asynchronous. It is called by the script itself, so it is run during the page load process.

```javascript
const getUpdates = async () => {
	const dataLengthBits = 256;
	const dataLengthHex = dataLengthBits/4;
```

We also need a `Contract` object to listen to events. However, read-only actions, such as listening to events, are free. There
is no need for a signer, so we can just use the `Provider` object (we could have also used the signer we used in the
previous function).

```javascript
	const contract = await new ethers.Contract(
		counterData.address, counterData.abi,
		provider
	);
```

The `contract.on` function take two parameters: a filter, and a function to call every time an event that matches the 
filter happens. In `contract.interface.events` you can find filters for all the events in the ABI.

```javascript
	contract.on(contract.interface.events.Asked4Value,
		evt => {
```

This is the increment value at the time the event is received. It may or may not match the value when the transaction
was sent.
```javascript
			writeToDiv("events", 
				`Increment #${incrementInvoked}`);
```

The information we know about the event come from `evt`, 
[an `Event` object](https://docs.ethers.io/ethers.js/html/api-contract.html#event-object). 

```javascript
			writeToDiv("events", 
				`Got an event: ${JSON.stringify(evt)}`);
```

The `evt` variable contains a field, `data`, with the parameters to the event. Those parameters are a `uint` (a 256
bit unsigned integer) and an `address`. To get only the first parameter (and the `0x` prefix that marks the number
as hexadecimal), we look only at the first few characters. The `parseInt` function then turns the string into a 
number we can display as a decimal.

```javascript
			writeToDiv("events", 
			`Counter value: ${
				parseInt(evt.data.substring(0, 
					dataLengthHex+2))}`);
		}
	);   // contract.on
};   // getUpdates

getUpdates();
```




## Conclusion

Hopefully at this point you know enough to get started with decentralized applications (dapps) and where to search
for additional information.


