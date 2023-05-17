require("dotenv").config();
const { providers, Contract, ethers } = require("ethers");
const { abi } = require("../../../TokenBNBchainABI.json");
const bscGateWayAddress = "0x4D147dCb984e6affEEC47e44293DA442580A3Ec0"; // Locate the Axelar Gateway contract on binance chain

async function getBscGateWayAddress() {
  const bscContractABI = abi;
  let bscContract;
  try {
    const { ethereum } = window;
    console.log(ethereum.chainId);
    if (ethereum.chainId === "0x61") {
      console.log("got here");
      const provider = new providers.Web3Provider(ethereum);
      console.log("provider", provider);
      const signer = provider.getSigner();
      console.log(abi)
      bscContract = new Contract(bscGateWayAddress, bscContractABI, signer);
    } else {
      throw new Error("Please connect to the BNB chain network");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  console.log(bscContract);
  return bscContract;
}

async function start(amount, destinationChain, destinationAddress, symbol) {
  const contract = await getBscGateWayAddress();
  console.log("bridge", contract);
  const approveERC20 = (spender, amount) =>
    ERC20Contract.methods
      .approve(spender, amount)
      .send({ from: destinationAddress });
  console.log(await approveERC20);
  const tx = contract.sendToken(
    destinationChain,
    destinationAddress,
    symbol,
    amount
  );
  console.log(await tx);
  tx.then((receipt) => {
    console.log("Transaction receipt:", receipt);
  });
  return tx;
}

module.exports = { getBscGateWayAddress, start };
