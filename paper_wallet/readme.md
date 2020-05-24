# Creating a Paper Wallet Address

## Ori Pomerantz (qbzzt1@gmail.com)

[This HTML file](https://qbzzt.github.io/ethereum/paper_wallet.html) lets you
create an Ethereum address offline on a device not connected to the Internet. If you then store the mnemonic 
(the twelve words) in a safe place, on a piece of paper, you can receive paymennts to the corresponding address. 
Your account is as safe as that piece of paper, without any risk of your funds being stolen, until you are ready to 
withdraw the funds. Only then do you need to put the private key on an Internet connected device and trust to the 
security of that device. The window of opportunity to attack you is much shorter, making your funds a lot more secure.

This tutorial explains how the key generator works and why I *think* it is sufficiently secure for normal use.

## Disclaimer

I am not a cryptographer, nor have I gone over all the library code to verify it is implemented correctly. Even if the tools
are 100% secure and bug free, there are still ways in which this paper wallet could fail. Therefore,
while I hope it is a useful tool, there is no warranty, express or implied. *Use at your own risk*.

Here is a partial list of failure modes.

1. **Lost mnemomic**. Those twelve words are the only way to transfer funds out of the account. If you lose them, you can
still gaze upon the balance in your account, but you will not be able to get to it.
1. **Disclosed mnemonic**. This is the mirror image of the previous failure mode. **Anybody** with the mnemonic can
get your funds. If you think it may have been disclosed, it is best to create a new one and address 
and immediately transfer everything.
1. **Forced disclosure**. For example, if you try to use this to avoid paying income taxes, the
tax authorities can prosecute you for tax evasion and throw you in jail until you pay them what they think you owe. Remember
that the people who pay you know your address, and that anybody with that knowledge can go to 
`https://etherscan.io/address/ <address>` and see the balance it holds.
1. **Stealth disclosure**. Even a computer that isn't connected to any network 
[sends off radio frequency signals](https://www.cl.cam.ac.uk/~mgk25/pet2004-fpd.pdf). If somebody receives those signals,
they can decode what you see on your screen when you generate the mnemonic and address. If you are tring to keep a secret
from the NSA, you probbly need to [get special computers](https://en.wikipedia.org/wiki/Tempest_(codename)). 

## The Tools

In addition to the standard HTML and Javascript, the web page uses these tools:

1. [Bootstrap](https://www.w3schools.com/bootstrap/default.asp) for the look and feel.
1. [Angular](https://www.w3schools.com/angular/default.asp) for interaction between Javascript code and the user.
1. [Ethers.js](https://docs.ethers.io/ethers.js/html/) for Ethereum functionalty.

The first two are well known and mainstream, so my explanations will focus on Ethers.js.


## Usage

Click the button multiple times to collect [entropy](https://en.wikipedia.org/wiki/Entropy_(computing)). Once you have clicked
it 31 times there is enough randomness to produce the mnemonic, and from it the public address (as well as the private key 
and other required information). These values are automatically displayed for you once they are available.

### Why the Clicking? Can't you Automate That?

Computers are deterministic. If you and I run the same program and give it the same input, we should receive the same results.
This is almost always the desired behavior. However, if you are creating a private key that I shouldn't know (for example, the
mnemonic here) the last thing you want is for me to go through the same process and get the same result. Therefore, you need 
some kind of random value I would not be able to guess.

Every time you click the button the page takes the current time (in milliseconds since a fixed point, which is the standard
JavaScript method of storing time), divides it by sixteen, and takes the reminder. This number (zero to fifteen) is random
because humans don't have the ability to time their clicks that accurately. Each click gives us four bits of randomness.

The calculation we use to figure out the mnemonic and address requires at least 128 bits of randomness, so we need thirty two
clicks. 

## The Code

This is the code that does the actual work:

First we initialize the entropy to be empty. The entropy is an [hexadecimal number](https://en.wikipedia.org/wiki/Hexadecimal),
so by convention it starts by `0x`. 

```
	$scope.entropy = '0x';
```

The function `$scope.addHex` adds a hexadecimal digit to `$scope.entropy`. 
```
	$scope.getHex = () => "0123456789abcdef"[Date.now() % 16]
 	$scope.addHex = () => $scope.entropy += $scope.getHex();
```

For us to have enough entropy, we need thirty two hexadecimal digits. That string is thirty four characters long 
with the `0x` prefix.
```
	$scope.entropyLeft = () => 34-$scope.entropy.length;
```

Once we have enough entropy we can use 
[`ethers.utils.HDNode.entropyToMnemonic`](https://docs.ethers.io/ethers.js/html/api-advanced.html#static-methods) 
to create the mnemonic. The process is explained
[here](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).
```
	$scope.getMnemonic = () => $scope.entropyLeft() == 0 ? 
		ethers.utils.HDNode.entropyToMnemonic($scope.entropy) : "";
```

In Ethereum (and most other blockchain projects) we use a 
[Hierarchical Deterministic Wallet](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) to 
produce keys and addresses. This lets us create as many keys as we need out of a single source of enthropy,
organized as a tree. The 
[`ethers.utils.HDNode.fromMnemonic`](https://docs.ethers.io/ethers.js/html/api-advanced.html#static-methods)
function creates the root of the tree from the mnemonic. 

```
	$scope.getAddr = () => $scope.entropyLeft() == 0 ? 
		ethers.utils.HDNode.fromMnemonic(
			ethers.utils.HDNode.entropyToMnemonic($scope.entropy)
		).derivePath("m/44'/60'/0'/0/0").address : "";
```


## Conclusion
