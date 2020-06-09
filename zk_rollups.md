# Zero Knowledge Rollups in Ethereum
### Ori Pomerantz qbzzt1@gmail.com 

In this article you learn about the scaling problem in Ethereum, and how zero knowledge rollups can
solve it.

## Background: Consensus and Scaling

Rather than relying on a trusted central authority, blockchains rely on consensus. The problem is
that consensus doesn't scale very well. This problem is especially bad in Ethereum, because nodes don't 
just relay data, they have to actually execute the software that is embedded in contracts. In December
2019, [Ethereum averaged 12-15 transactions per 
second](https://blog.bybit.com/research-and-analysis/ethereum-blockchain-performance-and-scalability/).
This is enough to develop the technology and ecosystem, but not nearly enough for mass market adoption.


### Is This Really Necessary?

If we examine the problem, it's not really necessary for all the nodes to run the program for a 
transaction. At least one node has to actually run the program to get from the input state of the
contract to the output state, but other nodes can get the proposed output state and just verify
that it is correct. Surprisingly, this second task can be accomplished much more easily using a 
field of cryptography called [Zero Knowledge Proofs](https://en.wikipedia.org/wiki/Zero-knowledge_proof).


## Mathematical Building Blocks

To explain how it is possible to verify a program's output without running it requires several 
mathematical building blocks beyond those of basic cryptography (hash functions, private/public key
pairs, and so on).



## Plonk

https://vitalik.ca/general/2019/09/22/plonk.html
