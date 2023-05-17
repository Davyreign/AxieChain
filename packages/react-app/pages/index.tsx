import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import BridgeForm from "../components/BridgeForm";
import { AxelarQueryAPI, Environment } from '@axelar-network/axelarjs-sdk';
import { bscTestnet } from "wagmi/dist/chains";

const sdk = new AxelarQueryAPI({
  environment: Environment.TESTNET
});

export default function Home(): JSX.Element {
  return (
    <div>
      <BridgeForm />
    </div>
  );
}