var HDWalletProvider = require("truffle-hdwallet-provider");
var MNEMONIC = "muffin fix icon pelican finish alcohol puzzle farm scheme topple wish jewel";
var ENDPOINT = "https://rinkeby.infura.io/v3/77d78289a4554db2ab64121d7d09548c";

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Match any network id
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(MNEMONIC, ENDPOINT)
            },
            network_id: 4,
            gas: 4500000,
            gasPrice: 10000000000,
        }
    }
};
