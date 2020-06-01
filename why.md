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

Unfortunately, protocols that use this process are still vulnerabe to some forms of abuse. Here is a very simple one:

1. I get a signed message from the bank saying I have $10 on deposit.
1. I give Alice a signed message stating that:
   - I have $10, as proved by the bank's message which I attach
   - I give her $7 from my deposit
1. In return for services rendered, I give you a signed message stating that:
   - I have $10, as proved by the bank's message which I attach
   - I give you $5 from my deposit
1. Alice's message gets to the bank first. They see that I signed a legitimate transfer and give Alice the $7.
1. When your message gets to the bank, the bank doesn't have the promised money in the account anymore and you can't get it.

This is the same as if I had given Alice a check for $7 and you a check for $5 drawn on the same bank account that only
has a balance of $10. Physical banks require proof of identity before they open a bank account, so it is well known
who passed the bad checks and they can be punished for it. However, in the digital world it is easy to create an extra
identity ([see here for instructions on how to create a new Ethereum identity to see how easy it 
is](https://github.com/qbzzt/etherdocs/tree/master/paper_wallet)) and therefore people can have as many 
throw away "identities" as they want.

This is called [the double spending problem](https://www.investopedia.com/terms/d/doublespending.asp). I have two dollars 
that I spent twice, once with Alice and once with you. The basic vulnerability is the private nature of the messages.
If you had known I had already given Alice $7, you'd know I only had $3 and wouldn't trust me when I said I have $5 to pay
you. This is the problem that blockchains solve.


### Public Messages and Blockchains

There is a very simple solution to the double spending problem. Send all money transfer messages to a central repository,
and only count the money as having been transfered after the central repository approves that money transfer. This is what 
we do with bank accounts when we use debit cards. We tell the bank "pay $x to Y", and wait for an acknowledgement
that the transfer took place. This solves the double spending problem, because the central authority knows exactly how much 
each identity has at any point.

The problem is that this process requires complete trust in the central authority. As a society we currently use a
[long and expensive licensing process](https://www.federalreserve.gov/faqs/banking_12779.htm) to establish this trust, and
[regular complex
audits](https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/internal-external-audits/pub-ch-audits.pdf) 
to maintain it.

Blockchains deal with the trust problem in a different way. Instead of private messages (for example, between you
and the bank), messages are broadcast and tied together in a way that makes it extremely difficult to remove or
modify one of them without invalidating subsequent messages. This means that anybody who relies on subsequent messages
on the blockchain has a vested interest in preserving your message accurately. This has several important effects:

* Instead of trusting a single central authority, you trust that the majority of the blockchain's nodes are honest. 
  As I am writing this [there are over 7000 Ethereum nodes](https://www.ethernodes.org/). Subverting enough nodes to 
  subvert the entire network would be a very difficult task.
* There is no point subverting a small number of nodes, so the likelihood of attack on any specific node, and 
  therefore the effort required to secure it, is a lot smaller. This makes it a lot easier to run nodes, which 
  increases their number and further decreases the value of subverting any individual node.
  

## Ethereum

Ethereum takes the blockchain concept a level further by allowing whole contracts to be written in a computer language 
and executed in a manner that anybody can verify on a blockchain. This means they are public and deterministed. Anybody can 
read the contract's current state and check what it will enforce in the future given various inputs. Removing ambiguity 
in this manner removes some of the causes for expensive and inefficient litigation.

For example, take real estate ownership. Typically, there are several entities involved in the ownership:

1. **The owner**
1. **The mortgage lender**
1. **The property tax authority** 
1. **The assessor** 
1. **The appeal board**
1. **The court** 

Under certain predefined conditions either the mortgage lender or the property tax authority is allowed to 
foreclose and take the property. Right now, this process is  
[very expensive](http://www.mortgagenewsdaily.com/622008_Foreclosure_Costs.asp). 


