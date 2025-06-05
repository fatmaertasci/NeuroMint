import { create } from 'zustand';
import { AssetMetadata, ComplianceData, RWA_CONTRACT_ID } from '@/lib/types';
import { createContract, getContractInfo } from '@/lib/contract';

interface ContractStore {
  // Contract information
  contractId: string;
  assetMetadata: AssetMetadata | null;
  totalSupply: string;
  isPaused: boolean;
  admin: string | null;

  // User-specific data
  userBalance: string;
  isWhitelisted: boolean;
  compliance: ComplianceData | null;

  // UI state
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;

  // Actions
  fetchContractData: () => Promise<void>;
  fetchUserData: (address: string) => Promise<void>;
  refreshBalance: (address: string) => Promise<void>;
  transfer: (from: string, to: string, amount: string) => Promise<boolean>;
  clearError: () => void;
  setContractId: (contractId: string) => void;
}

export const useContractStore = create<ContractStore>((set, get) => ({
  // Initial state
  contractId: RWA_CONTRACT_ID,
  assetMetadata: null,
  totalSupply: '0',
  isPaused: false,
  admin: null,
  userBalance: '0',
  isWhitelisted: false,
  compliance: null,
  isLoading: false,
  error: null,
  lastUpdated: null,

  // Actions
  fetchContractData: async () => {
    const { contractId } = get();
    set({ isLoading: true, error: null });

    try {
      const client = createContract(contractId);
      const info = await getContractInfo(contractId);

      set({
        assetMetadata: await client.getAssetMetadata(),
        totalSupply: info.totalSupply,
        isPaused: await client.isPaused(),
        admin: info.owner,
        lastUpdated: Date.now()
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch contract data' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserData: async (address: string) => {
    const { contractId } = get();
    set({ isLoading: true, error: null });

    try {
      const client = createContract(contractId);

      const [balance, isWhitelisted, compliance] = await Promise.all([
        client.queryBalance(address),
        client.isWhitelisted(address),
        client.getComplianceData(address)
      ]);

      set({
        userBalance: balance,
        isWhitelisted,
        compliance,
        lastUpdated: Date.now()
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch user data' });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshBalance: async (address: string) => {
    const { contractId } = get();
    set({ isLoading: true, error: null });

    try {
      const client = createContract(contractId);
      const balance = await client.queryBalance(address);
      set({ userBalance: balance, lastUpdated: Date.now() });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to refresh balance' });
    } finally {
      set({ isLoading: false });
    }
  },

  transfer: async (from: string, to: string, amount: string) => {
    const { contractId } = get();
    set({ isLoading: true, error: null });

    try {
      const client = createContract(contractId);
      return await client.transfer(from, to, amount);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Transfer failed' });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
  setContractId: (contractId: string) => set({ contractId })
}));