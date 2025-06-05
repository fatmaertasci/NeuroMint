import { parseContractError } from './stellar';
import { 
  AssetMetadata, 
  ComplianceData, 
  Transaction,
  ContractMethods,
  ContractInfo,
  RWA_CONTRACT_ID
} from './types';

export class Contract implements ContractMethods {
  private contractId: string;
  private mockAssetMetadata: AssetMetadata = {
    name: 'AI Innovation Fund',
    symbol: 'AIIF',
    asset_type: 'fund',
    description: 'A tokenized fund investing in AI technology and innovation',
    valuation: '10000000000000', // $10M
    last_valuation_date: Date.now(),
    legal_doc_hash: 'QmXz7bQn6mBwQR5xPXz8LbQtdKfMVxC'
  };

  constructor(contractId: string = RWA_CONTRACT_ID) {
    this.contractId = contractId;
  }

  async queryBalance(address: string): Promise<string> {
    try {
      console.log(`Querying balance for ${address} on contract ${this.contractId}`);
      if (address.includes('admin')) return '1000000000000';
      if (address.includes('test')) return '100000000000';
      return '10000000000';
    } catch (error) {
      console.error('Error querying balance:', error);
      throw new Error(parseContractError(error));
    }
  }

  async getAssetMetadata(): Promise<AssetMetadata> {
    try {
      console.log(`Getting asset metadata for contract ${this.contractId}`);
      return this.mockAssetMetadata;
    } catch (error) {
      console.error('Error getting asset metadata:', error);
      throw new Error(parseContractError(error));
    }
  }

  async getComplianceData(address: string): Promise<ComplianceData> {
    try {
      console.log(`Getting compliance data for ${address}`);
      return {
        kyc_verified: true,
        accredited_investor: true,
        jurisdiction: 'GLOBAL',
        compliance_expiry: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
      };
    } catch (error) {
      console.error('Error getting compliance data:', error);
      throw new Error(parseContractError(error));
    }
  }

  async transfer(from: string, to: string, amount: string): Promise<boolean> {
    try {
      const balance = await this.queryBalance(from);
      if (BigInt(balance) < BigInt(amount)) {
        throw new Error('Insufficient balance');
      }
      
      console.log(`Transferring ${amount} tokens from ${from} to ${to}`);
      return true;
    } catch (error) {
      console.error('Error transferring tokens:', error);
      throw new Error(parseContractError(error));
    }
  }

  async getTransactionHistory(address: string): Promise<Transaction[]> {
    try {
      console.log(`Getting transaction history for ${address}`);
      return [
        {
          id: '1',
          type: 'transfer',
          from: address,
          to: 'GDZAG...XVU2',
          amount: '1000000000',
          timestamp: Date.now() - 86400000,
          status: 'success'
        }
      ];
    } catch (error) {
      console.error('Error getting transaction history:', error);
      throw new Error(parseContractError(error));
    }
  }

  async totalSupply(): Promise<string> {
    try {
      return '10000000000000'; // Mock total supply
    } catch (error) {
      throw new Error(parseContractError(error));
    }
  }

  async isPaused(): Promise<boolean> {
    try {
      return false; // Mock implementation
    } catch (error) {
      throw new Error(parseContractError(error));
    }
  }

  async getAdmin(): Promise<string> {
    try {
      return 'GADMIN...XYZ'; // Mock admin address
    } catch (error) {
      throw new Error(parseContractError(error));
    }
  }

  async isWhitelisted(address: string): Promise<boolean> {
    try {
      console.log(`Checking whitelist status for ${address}`);
      // Mock implementation - in production this would check against the contract
      return address.toLowerCase().includes('admin') || 
             address.toLowerCase().includes('test');
    } catch (error) {
      throw new Error(parseContractError(error));
    }
  }

  async addToWhitelist(address: string): Promise<boolean> {
    try {
      console.log(`Adding ${address} to whitelist`);
      return true;
    } catch (error) {
      throw new Error(parseContractError(error));
    }
  }

  balance = this.queryBalance;
}

// Contract factory function
export const createContract = (
  contractId: string = RWA_CONTRACT_ID
): ContractMethods => {
  return new Contract(contractId);
};

// Contract info helper
export const getContractInfo = async (
  contractId: string = RWA_CONTRACT_ID
): Promise<ContractInfo> => {
  const contract = new Contract(contractId);
  
  return {
    id: contractId,
    name: 'AI Innovation Fund',
    symbol: 'AIIF',
    totalSupply: await contract.totalSupply(),
    decimal: 7,
    owner: await contract.getAdmin()
  };
};