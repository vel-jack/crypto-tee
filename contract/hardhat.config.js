require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: `${process.env.ALCHEMY_URL}`,
      accounts: [`${process.env.ROPSTEN_PKEY}`],
    },
  },
};
