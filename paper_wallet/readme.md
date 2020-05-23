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
1. 


## Conclusion
