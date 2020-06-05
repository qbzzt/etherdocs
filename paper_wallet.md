# Creating a Paper Wallet Address

## Ori Pomerantz (qbzzt1@gmail.com)

In this tutorial you learn about a number of HTML "calculators" you can use for an Ethereum Paper Wallet setup. 
A ***Paper Wallet*** is an Ethereum address where you provide the public address to various entities 
that pay you, but keep the twelve word mnemonic that generated it (and therefore the private key that you
would use to withdraw from the account at that address) a secret on a piece of paper.
Your account is as safe as that piece of paper until you are ready to withdraw the funds. Only then do you need 
to put the mmnemonic on an Internet connected device and trust to the security of that device. The window of 
opportunity to attack you is much shorter, making your funds a lot more secure.

The calculations required to create a safe twelve word mnemonic, and from it a publicly accessible address, require 
a computer. At the same time, the whole point of using a paper wallet is not to have any private information 
anywhere on the Internet. The solution I chose is to download an HTML from the Internet (along with associated 
files, such as the JavaScript libraries), disconnect from the Internet, do the calculations, and then reboot. 
I think this is reasonably safe, *although not perfect*.

## Disclaimer

I am not a cryptographer, nor have I gone over all the library code to verify it is implemented correctly. Even if the tools
are 100% secure and bug free, there are still ways in which this paper wallet could fail. Therefore,
while I hope it is a useful tool, there is no warranty, express or implied. *Use at your own risk*.

Here is a partial list of failure modes.

* **Lost mnemomic**. Those twelve words are the only way to transfer funds out of the account. If you lose them, you can
still gaze longingly upon the balance in your account, but you will not be able to get the funds.

* **Disclosed mnemonic**. This is the mirror image of the previous failure mode. *Anybody* with the mnemonic can
get your funds. If you think it may have been disclosed, it is best to create a new one and address 
and immediately transfer everything.

* **Forced disclosure**. For example, if you try to use this to avoid paying income taxes, the
tax authorities can prosecute you for tax evasion and throw you in jail until you pay them what they think you owe. Remember
that the people who pay you know your address, and that anybody with that knowledge can go to 
`https://etherscan.io/address/ <address>` and see the balance it holds.

* **Malware disclosure**. It is recommended to reboot the device to clear the RAM after you use the calculators. 
However, if the device has malware, that malware might record your keystrokes or screen to disk and then send it to whoever 
controls it when an Internet connection is available. In theory, it would be better to destroy the device instead of
using it after a reboot. However, in most cases that the cost is too high compared to the risk to justify this wanton
destruction.
  
* **Stealth disclosure**. Even a computer that isn't connected to any network 
[sends off radio frequency signals](https://www.cl.cam.ac.uk/~mgk25/pet2004-fpd.pdf). If somebody receives those signals,
they can decode what you see on your screen when you generate the mnemonic and address. If you are tring to keep a secret
from the NSA, you probably need to [get a special computer](https://en.wikipedia.org/wiki/Tempest_(codename)). 



## Usage

1. Download the HTML calculator (and associated software) from the Internet.
1. Disconnect the device from the Network (switch to airplane mode).
1. Put in your information to get the result:
   * If you are using the [Paper Wallet](https://qbzzt.github.io/ethereum/paper_wallet.html) to craete a new address,
     click the button thirty two times to create the necessary [entropy](https://en.wikipedia.org/wiki/Entropy_(computing)).
     Write down the mnemonic and store the address on a file on the device to share it.
   * If you are using the [Address Verifier](https://qbzzt.github.io/ethereum/verify_address.html) to retrieve or verify
     a public address, type the mnemonic and see the resulting address. 
1. Reboot to clear the RAM.
1. Continue to use the device.
  
You can give the public address to anybody who wants to pay you or from whom you are going to transfer cryptocurrency 
(such as [Coinbase](https://coinbase.com/)). When you are ready to use the account, you can use a wallet such as 
[MetaMask](https://metamask.io/). Log out of the existing account if you have one (and have a backup of the twelve words
for that account) and import a new account using your mnemonic, also called the seed phrase. Then you can use it.

When you are done and want to become secure again, create a new paper wallet and send the remaining funds there.

### Why the Clicking? Can't you Automate the Entropy?

Computers are deterministic. If you and I run the same program and give it the same input, we should receive the same results.
This is almost always the desired behavior. However, if you are creating a private key that I shouldn't know (for example, the
mnemonic here) the last thing you want is for me to go through the same process and get the same result. Therefore, you need 
some kind of random value I would not be able to guess.

Every time you click the button the page takes the current time (in milliseconds since a fixed point, which is the standard
JavaScript method of storing time), divides it by sixteen, and takes the reminder. This number (zero to fifteen) is random
because humans don't have the ability to time their clicks that accurately. Each click gives us four bits of randomness.

The calculation we use to figure out the mnemonic and address requires at least 128 bits of randomness, so we need thirty two
clicks. 


### Warning: Don't Just Choose a Memorable Phrase

It is tempting to select eleven words from 
[the list of mnemonic words](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)
to create a memorable phrase, and then just add seven random bits to create the last word (the last four bits are a checksum). 
For example, you could select this phrase: The **zoo**'s **zebra** **drink**s **sweet** **water** and **wet** **alcohol** with 
his **family**: **father**, **mother**, and **brother**. 

***This is a bad idea***. Phrases that you find memorable, such as **zoo zebra** and **sweet water**, are likely to be 
memorable, and therefore easy to guess, for other people as well. The are <a href=
"https://www.codecogs.com/eqnedit.php?latex=2^{11}&space;=&space;2048" target="_blank"><img 
src="https://latex.codecogs.com/gif.latex?2^{11}&space;=&space;2048" title="2^{11} = 2048" /></a> words in the word list, so
there are <a href="https://www.codecogs.com/eqnedit.php?latex=2048^{11}\approx&space;2&space;\times&space;10^{36}" target="_blank">
<img src="https://latex.codecogs.com/gif.latex?2048^{11}\approx&space;2&space;\times&space;10^{36}" 
title="2048^{11}\approx 2 \times 10^{36}" /></a> choices for a random eleven word phrase. However, only 
<a href="https://www.codecogs.com/eqnedit.php?latex=10\times2048^{9}\approx&space;6&space;\times&space;10^{30}" target="_blank">
<img src="https://latex.codecogs.com/gif.latex?10\times2048^{9}\approx&space;6&space;\times&space;10^{30}" title="10\times2048^{9}\approx 
6 \times 10^{30}" /></a> have the phrase **sweet water** in them. Out of those, only <a href=
"https://www.codecogs.com/eqnedit.php?latex=10\times9\times2048^{7}\approx10^{25}" target="_blank"><img
src="https://latex.codecogs.com/gif.latex?10\times9\times2048^{7}\approx10^{25}" title="10\times9\times2048^{7}\approx10^{25}" /></a>
also have **zoo zebra**. Just two memorable two word phrases and we already reduced the key space by a factor of approximately
<a href="https://www.codecogs.com/eqnedit.php?latex=2\times10^{11}" target="_blank">
<img src="https://latex.codecogs.com/gif.latex?2\times10^{11}" title="2\times10^{11}" /> </a>.



## A Programmer's View

This section explains how the web pages work. If you are not a programmer, you can skip it.

### The Tools

In addition to the standard HTML and Javascript, the web page uses these tools:

1. [Bootstrap](https://www.w3schools.com/bootstrap/default.asp) for the look and feel.
1. [Angular](https://www.w3schools.com/angular/default.asp) for interaction between Javascript code and the user.
1. [Ethers.js](https://docs.ethers.io/ethers.js/html/) for Ethereum functionalty.

The first two are mainstream and well known, so my explanations will focus on Ethers.js.


### The Code

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

However, because the same tree can be used for multiple blockchains, we don't use the root node for our private and
public keys. Instead, in Ethereum we use the `m/44'/60'/0'/0/0` branch for the first address. This is explained
[here](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki). The 
[`derivePath`](https://docs.ethers.io/ethers.js/html/api-advanced.html#deriving-child-and-neutered-nodes) function 
moves from the root node of the tree to that node. This node contains various fields, one of which is the address 
that corresponds to the mnemonic.

```
	$scope.getAddr = () => $scope.entropyLeft() == 0 ? 
		ethers.utils.HDNode.fromMnemonic(
			ethers.utils.HDNode.entropyToMnemonic($scope.entropy)
		).derivePath("m/44'/60'/0'/0/0").address : "";
```



## Conclusion

I hope that this tutorial helped you understand the purpose of paper wallets and how to create them. 
Hopefully it also demystified a bit the blockchain logic used to create addresses in Ethereum.
