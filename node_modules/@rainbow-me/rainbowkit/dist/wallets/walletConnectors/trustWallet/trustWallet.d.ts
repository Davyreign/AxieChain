import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface TrustWalletOptions {
    chains: Chain[];
}
export declare const trustWallet: ({ chains, ...options }: TrustWalletOptions & InjectedConnectorOptions) => Wallet;
