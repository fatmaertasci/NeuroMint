'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useWalletStore } from '@/stores/wallet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Wallet, 
  Network, 
  Settings, 
  LogOut,
  ExternalLink,
  Copy,
  ChevronDown 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { truncateAddress, getExplorerUrl } from '@/lib/stellar';
import { toast } from 'sonner';

export default function Header() {
  const {
    isConnected,
    address,
    balance,
    network,
    isLoading,
    connect,
    disconnect,
    switchNetwork,
    checkConnection
  } = useWalletStore();

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Wallet connected successfully');
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info('Wallet disconnected');
  };

  const handleNetworkSwitch = async (newNetwork: 'testnet' | 'mainnet') => {
    if (newNetwork === network) return;
    
    try {
      await switchNetwork(newNetwork);
      toast.success(`Switched to ${newNetwork}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Failed to switch to ${newNetwork}`;
      
      // Check if this is a manual switch required error
      if (errorMessage.includes('Please switch to')) {
        toast.error(errorMessage, {
          duration: 6000, // Show longer for important instructions
        });
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    }
  };

  const openInExplorer = () => {
    if (address) {
      window.open(getExplorerUrl(address, 'account', network), '_blank');
    }
  };

  return (
    <header className="border-b border-[#6C7A89] bg-[#181A20]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-[#00FFFF] font-bold text-xl flex items-center">
              🤖 AIToken
            </a>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-[#F4F4F4] hover:text-[#00FFFF] transition-colors">
                Dashboard
              </a>
              <a href="/marketplace" className="text-[#F4F4F4] hover:text-[#00FFFF] transition-colors">
                AI Marketplace
              </a>
              <a href="/tokenize" className="text-[#F4F4F4] hover:text-[#00FFFF] transition-colors">
                Tokenize Asset
              </a>
              <a href="/transfer" className="text-[#F4F4F4] hover:text-[#00FFFF] transition-colors">
                License Transfer
              </a>
            </nav>
          </div>

          {/* Wallet connection button is handled by existing wallet component */}
        </div>
      </div>
    </header>
  )
}