import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { start } from "../../hardhat/scripts/wrapper";
import { AxelarQueryAPI, Environment } from "@axelar-network/axelarjs-sdk";
import Alert from "../components/Alert";

const api = new AxelarQueryAPI({
  environment: Environment.TESTNET,
});

const BridgeForm = () => {
  const [amount, setAmount] = useState("");
  const [bridgeLoading, setBridgeLoading] = useState(false);
  const [bridgeSuccess, setBridgeSuccess] = useState(false);
  const [bridgeError, setBridgeError] = useState("");

  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [chains, setChains] = useState<string[]>([]);

  const [dependentItems, setDependentItems] = useState([]);

  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchChains = async () => {
      const activeChains = await api.getActiveChains();
      setChains(activeChains);
    };

    fetchChains();
  }, []);

  const compareGasPrices = async () => {
    try {
      const gasInfo = await api.getGasInfo(fromCurrency, toCurrency, "BNB");
      setLoading(true);
      console.log(fromCurrency);
      console.log(toCurrency);
      console.log(gasInfo);
      setSuccess(true);
      setLoading(false);
      setMessage("This is the gas price you will spend in gwei");
      alert(JSON.stringify(gasInfo, null, 2));
      return gasInfo;
    } catch (error) {
      console.error("Failed to compare gas prices:", error);
    }
  };

  const handleFromCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setToCurrency(event.target.value);
  };

  const handleBridge = async () => {
    try {
      try {
        let txn = await start(amount);
        setBridgeLoading(true);
        console.log("Loading...", txn.hash);
        await txn.wait();
        console.log("Finalized -- ", txn.hash);
        setBridgeSuccess(true);
        setBridgeLoading(false);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log(error);
      setBridgeError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      {loading && (
        <Alert
          alertType={"loading"}
          alertBody={"Please wait"}
          triggerAlert={true}
          color={"white"}
        />
      )}
      {success && (
        <Alert
          alertType={"success"}
          alertBody={message}
          triggerAlert={true}
          color={"palegreen"}
        />
      )}
      {success === false && (
        <Alert
          alertType={"failed"}
          alertBody={message}
          triggerAlert={true}
          color={"palevioletred"}
        />
      )}
      <h2 className="text-3xl font-bold mb-8">Axiechain Swap</h2>

      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2">
        <div>
          <label htmlFor="fromCurrency" className="text-sm font-medium">
            From
          </label>
          <div className="relative">
            <select
              id="fromCurrency"
              name="fromCurrency"
              className="block w-full mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm text-gray-700 text-sm"
              defaultValue=""
              onChange={handleFromCurrencyChange}
            >
              {chains.map((chain: string) => (
                <option key={chain}>{chain}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="toCurrency" className="text-sm font-medium">
            To
          </label>
          <div className="relative">
            <select
              id="fromCurrency"
              name="fromCurrency"
              className="block w-full mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm text-gray-700 text-sm"
              defaultValue=""
              onChange={handleToCurrencyChange}
            >
              {chains.map((chain: string) => (
                <option key={chain}>{chain}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* <div className="mb-8">
        <label htmlFor="amount" className="text-sm font-medium">
          You send
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm"></span>
          </div>
          <input
            type="text"
            name="amount"
            id="amount"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <input
            type="text"
            name="amount"
            id="amount"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          </div>
        </div>
      </div> */}
      <div className="mb-8 flex">
        <div className="mr-2">
          <label htmlFor="sendAmount" className="text-sm font-medium">
            You send
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="sendAmount"
              id="sendAmount"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="receiveAmount" className="text-sm font-medium">
            You get
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="receiveAmount"
              id="receiveAmount"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        onClick={compareGasPrices}
        className="w-full py-3 px-6 rounded-md text-base font-medium text-white bg-gradient-to-br from-blue-500 to-purple-500 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600"
      >
        Check Gas Price First
      </button>
      <button
        type="button"
        className="w-full py-3 px-6 rounded-md text-base font-medium text-white bg-gradient-to-br from-blue-500 to-purple-500 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 mt-5"
        onClick={handleBridge}
      >
        Proceed
      </button>
      {bridgeLoading && <p className="text-red-500 mt-4 text-sm">Loading...</p>}
      {bridgeSuccess && (
        <p className="text-green-500 mt-4 text-sm">
          Bridging successful! Check your Alfajores wallet
        </p>
      )}
      {bridgeError && (
        <p className="text-red-500 mt-4 text-sm">{bridgeError}</p>
      )}
    </div>
  );
};

export default BridgeForm;
