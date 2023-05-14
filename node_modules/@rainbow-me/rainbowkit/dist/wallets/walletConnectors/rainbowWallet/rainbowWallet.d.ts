import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface RainbowWalletOptions {
    chains: Chain[];
}
export declare const rainbowWallet: ({ chains, ...options }: RainbowWalletOptions & InjectedConnectorOptions) => Wallet;
