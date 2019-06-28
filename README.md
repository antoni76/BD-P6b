# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

The DApp User Interface when running should look like...


## Getting Started

This repository containts an Ethereum DApp that demonstrates a Coffee Supply Chain flow between a Seller, Distributor, Retailer and Buyer.

The user story is similar to any  used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

##UML Diagrams

![](https://i.imgur.com/HkUVXJ4.png)

![](https://i.imgur.com/efgHohO.png)

![](https://i.imgur.com/OAHguwc.png)

![](https://i.imgur.com/qTPW5n9.png)

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

```
MetaMask 6.0.1 https://metamask.io/ examples 
node v8.12.0 https://nodejs.org/en/download/
ganache-cli v6.3.0 (ganache-core: 2.4.0) https://www.truffleframework.com/docs/ganache/quickstart
Truffle v4.1.15 https://www.truffleframework.com/docs/truffle/getting-started/installation
(to be clarified)
```

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/antoni76/BD-P6b
```

Change directory to ```project-6``` folder and install all requisite npm packages (as listed in ```package.json```):

```
npm install
```

Launch Ganache:

```
ganache-cli -m "muffin fix icon pelican finish alcohol puzzle farm scheme topple wish jewel"
```

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

✓ Testing smart contract function harvestItem() that allows a farmer to harvest coffee (187ms)
✓ Testing smart contract function processItem() that allows a farmer to process coffee (84ms)
✓ Testing smart contract function packItem() that allows a farmer to pack coffee (69ms)
✓ Testing smart contract function sellItem() that allows a farmer to sell coffee (73ms)
✓ Testing smart contract function buyItem() that allows a distributor to buy coffee (95ms)
✓ Testing smart contract function shipItem() that allows a distributor to ship coffee (73ms)
✓ Testing smart contract function receiveItem() that allows a retailer to mark coffee received (103ms)
✓ Testing smart contract function purchaseItem() that allows a consumer to purchase coffee (91ms)
✓ Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain
✓ Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain


  10 passing (904ms)

In a separate terminal window, launch the DApp:

```
truffle migrate --network rinkeby
```

In a separate terminal window, launch the DApp:

```
npm run dev
```

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x57a7ade7b706b3cef3e0876e39387bf2eabc323c5e3e9b45c8986ad18d22041e
  Migrations: 0xdafb1cd922f9da37b0f1c9bab1c40ddadff7af29
Saving successful migration to network...
  ... 0xebead9f4f8779175cc8149854411938358ebe20ad014800e05e3d57febcc1e49
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying FarmerRole...
  ... 0x63494e4c73722a0a542c9463fa8f7d21c10add08eccc2fef8421e0a97b73aed2
  FarmerRole: 0x127cc6f897b69c96fdd493b317d6d0df8f25cb9b
  Deploying DistributorRole...
  ... 0x07d99ced805f88163012573569a711081fad865985d4f39182280590e16d2fd5
  DistributorRole: 0xc0d088069627c6c787e8e855222013a21e5fcf87
  Deploying RetailerRole...
  ... 0xf225e55dfb16c09b739930581fd6dc92f40391ded9c7c08194a20d60e200a156
  RetailerRole: 0x93190f7c0d292768d051a8cf5b55b64d6f229ff1
  Deploying ConsumerRole...
  ... 0x8c8f159a7380557fb65ce9cca8705c4c76584b68d95a3cdac4f30135e251dea6
  ConsumerRole: 0xe5e901e074c15eda1900ff92a8d39092248c33cf
  Deploying SupplyChain...
  ... 0x1f6e85ac6736fe074c994a55bfd087906c1015c3bec456b48b7fc7185d5247e0
  SupplyChain: 0x1aa02751fec43c0579fbac69d7bb41e3a947f93d
Saving successful migration to network...
  ... 0x11068d8723afbffe4e7c21617f3dba77152bf9e00199a8c5eb13ea461e6dae85
Saving artifacts...

###Deployment in Rinkeby

https://rinkeby.etherscan.io/tx/0x0b04781688fac56af0b02e660672dc407a959524fa85e2ae0125e85eb2cc5619

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.


## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* IPFS
