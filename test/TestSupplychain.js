// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
let SupplyChain = artifacts.require('SupplyChain');

contract('SupplyChain', function (accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    let sku = 1;
    let upc = 1;
    const ownerID = accounts[0];
    const originFarmerID = accounts[1];
    const originFarmName = "John Doe";
    const originFarmInformation = "Yarray Valley";
    const originFarmLatitude = "-38.239770";
    const originFarmLongitude = "144.341490";
    let productID = sku + upc;
    const productNotes = "Best beans for Espresso";
    const productPrice = web3.toWei(1, "ether");
    let itemState = 0;
    const distributorID = accounts[2];
    const retailerID = accounts[3];
    const consumerID = accounts[4];
    const emptyAddress = '0x00000000000000000000000000000000000000';

// Available Accounts
// ==================
// (0) 0x51c31eff1759634431f634c0fb61d0bf7f51144b (~100 ETH)
// (1) 0xb8a975c017c16930ab633694df48993760c05f7a (~100 ETH)
// (2) 0xc4b6a13ef9996f7ee3662743745f22cd1f1a6649 (~100 ETH)
// (3) 0xa3d340eaa5493be0ec25db68fbbcf5675170ec8c (~100 ETH)
// (4) 0x9486669d5b65e64a40b71d05792ef98587466e32 (~100 ETH)
// (5) 0xdd713cad9f0be4ac08d18a6357cd0875a9bfef1f (~100 ETH)
// (6) 0xd52fe4a71b50366be713e393f590af7c7f071a0b (~100 ETH)
// (7) 0x172b454b2f4e87ffa383107d05a0748adb89e4aa (~100 ETH)
// (8) 0x92e2eec509ff80324ecef283d23771af513f800a (~100 ETH)
// (9) 0x411d7c105e47d374d2c6f3a80764c4fa63d52fa2 (~100 ETH)


    console.log("ganache-cli accounts used here...");
    console.log("Contract Owner: accounts[0] ", accounts[0]);
    console.log("Farmer: accounts[1] ", accounts[1]);
    console.log("Distributor: accounts[2] ", accounts[2]);
    console.log("Retailer: accounts[3] ", accounts[3]);
    console.log("Consumer: accounts[4] ", accounts[4]);

    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Watch the emitted event Harvested()
        let event = supplyChain.Harvested();
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Harvested by calling function harvestItem()
        await supplyChain.harvestItem(upc, originFarmerID, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, productNotes);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    });

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Watch the emitted event Processed()
        let event = supplyChain.Processed();
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Processed by calling function processItem()
        await supplyChain.processItem(upc, {from: originFarmerID});

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferTwo[5], 1, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    });

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Watch the emitted event Packed()
        let event = supplyChain.Packed();
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Packed by calling function packItem()
        await supplyChain.packItem(upc, {from: originFarmerID});

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferTwo[5], 2, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    });

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Watch the emitted event ForSale()
        let event = supplyChain.ForSale();
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as ForSale by calling function sellItem()
        await supplyChain.sellItem(upc, productPrice, {from: originFarmerID});

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Wrong productPrice');
        assert.equal(resultBufferTwo[5], 3, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    });

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Watch the emitted event Sold()
        let event = supplyChain.Sold();
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Sold by calling function buyItem()
        await supplyChain.buyItem(upc, {from: distributorID, value: productPrice});

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[2], distributorID, 'Error: Wrong ownerID');
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Wrong distributorID');
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Wrong Price');
        assert.equal(resultBufferTwo[5], 4, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    });

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Watch the emitted event Shipped()
        let event = supplyChain.Shipped();
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Shipped by calling function shipItem()
        await supplyChain.shipItem(upc, {from: distributorID});

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Wrong distributorID');
        assert.equal(resultBufferTwo[5], 5, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    });

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Watch the emitted event Received()
        let event = supplyChain.Received();
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Received by calling function receiveItem()
        await supplyChain.receiveItem(upc, {from: retailerID});

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[2], retailerID, 'Error: Wrong ownerID');
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Wrong retailerID');
        assert.equal(resultBufferTwo[5], 6, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    });

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Watch the emitted event Purchased()
        let event = supplyChain.Purchased();
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Sold by calling function purchaseItem()
        await supplyChain.purchaseItem(upc, {from: consumerID});

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[2], consumerID, 'Error: Wrong ownerID');
        assert.equal(resultBufferTwo[8], consumerID, 'Error: Wrong consumerID');
        assert.equal(resultBufferTwo[5], 7, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    });

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        // Verify the result set:
        assert.equal(resultBufferOne[0], sku, 'Error: Wrong sku');
        assert.equal(resultBufferOne[1], upc, 'Error: Wrong upc');
        assert.equal(resultBufferOne[2], consumerID, 'Error: Wrong ownerID');
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Wrong originFarmerID');
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Wrong originFarmName');
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Wrong originFarmInformation');
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Wrong originFarmLatitude');
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Wrong originFarmLongitude');
    });

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
        // Verify the result set:
        assert.equal(resultBufferTwo[0], sku, 'Error: Wrong sku');
        assert.equal(resultBufferTwo[1], upc, 'Error: Wrong upc');
        assert.equal(resultBufferTwo[2], productID, 'Error: Wrong productID');
        assert.equal(resultBufferTwo[3], productNotes, 'Error: Wrong productNotes');
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Wrong productPrice');
        assert.equal(resultBufferTwo[5], 7, 'Error: Wrong itemState');
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Wrong distributorID');
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Wrong retailerID');
        assert.equal(resultBufferTwo[8], consumerID, 'Error: Wrong consumerID');
    });

});