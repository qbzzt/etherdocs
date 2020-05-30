# What Can Ethereum Do?
### Ori Pomerantz qbzzt1@gmail.com 

In this essay I am going to attempt to explain [Ethereum](https://ethereum.org/) and why I think the general concept 
(blockchain verified computer programs) is going to be incredibly important for our economic future.

## Background: The Value of Trust

The basic of our economic system is trust. My employer trusts that even though I work from home with minimal supervision,
the work I'm assigned will get done. I trust that they'll deposit the agreed upon salary into my bank account, and that the
bank will not "disappear" that money. When I go to Target to buy food, I trust that the food is what the package promises. 
Target trusts me not to claim my debit card was stolen and attempt to reverse the charges, and the bank to transfer the correct
amount of money from my account to Target's.

Over time we evolved many mechanisms to verify and enforce this trust such as credit reports, regulatory bodies, and 
the courts. Ethereum is essentially another such mechanism, one that works in a distributed fashion without a central 
authority.


## Trust and Computer Protocols

Computer protocols work by transferring messages. Messages can be authenticated as having come from a specific identity,
a combination of a private key used to sign messages and a public key that is used to authenticate them. This is how you 
know, for example, that when connect to your bank's website for online banking you are connected to the correct site and not 
a fake. The login form is signed by the bank's private key, and your browser uses the bank's public key to verify that 
signature. The certificates you may have heard about are another level of this process, with a certificate authority
using its private key to sign that a particular public key does indeed match that bank's private key.

### Bad Checks and Double Spending

Unfortunately, protocols that use this process are still vulnerabe to some forms of abuse. One of the simplest is analogous
to passing bad checks:

1. I get a signed message from the bank saying I have $10 on deposit.
1. I give Alice a signed message stating that:
   - I have $10, as proved by the bank's message which I attach
   - I give them $7 from my deposit
1. In return for services rendered, I give you a signed message stating that:
   - I have $10, as proved by the bank's message which I attach
   - I give you $5 from my deposit
1. Alice's message gets to the bank first. They see that I signed a legitimate transfer and give Alice the $7.
1. When your message gets to the bank, the bank doesn't have the promised money in the account anymore and you can't get it.

This is the same as if I had given Alice a check for $7 and you a check for $5 drawn on the same bank account that only
has a balance of $10. Physical banks require proof of identity before they open a bank account, so it is well known
who passed the bad checks and they can be punished for it. However, in the digital world it is easy to create an extra
identity ([see here for instructions how to do it Ethereum to see how easy it is](https://github.com/qbzzt/etherdocs/tree/master/paper_wallet)) and therefore people can have as many throw away "identities"
as they could use.

This is called [the double spending problem](https://www.investopedia.com/terms/d/doublespending.asp). I have two dollars 
that I spent twice, once with Alice and once with you. But the basic vulnerability is the private nature of the messages.
If you had known I had already given Alice $7, you'd know I only had $3 and wouldn't trust me when I said I have $5 to pay
you. This is the problem that blockchains solve.

### Public Commitments and Blockchains






A blockchain is a way to tie messages together, so that to vouch for one of them being authentic (received at the stated time
and signed by the stated key) an entity has to vouch that all of them are authentic. This means that 


## 





## Blockchains
At its root, a blockchain is a mechanism to tie commitments together, in a way that makes it extremely difficult to 
pretend that a commitment does not exist, or to hide it. For example, bitcoin uses a blockchain for currency transactions. 
At any moment anybody can check my balance and see how many bitcoins (BTC) I have. If I have ten BTC and I commit that you get five 
of them, everybody sees that I now only have five left. If I then try to commit to give somebody else seven BTC, it will be 
immediately clear that this commitment is impossible. This is much safer commerce than giving you a $5 check and then somebody 
else a $7 check, where the first one to the bank gets the money and the second gets a bounced check. 

### Ethereum
Ethereum takes the blockchain concept a level further by allowing whole contracts to be written in a computer language 
and executed in a manner that anybody can verify on a blockchain. This means they are deterministic, and it is possible to 
know in advance what a contract will enforce given a set of inputs. There is no room for subjective interpretation, or even 
honest misunderstandings.
