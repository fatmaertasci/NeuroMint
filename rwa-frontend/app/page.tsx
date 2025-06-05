'use client';

import { useEffect } from 'react';
import { useWalletStore } from '@/stores/wallet';
import { useContractStore } from '@/stores/contract';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Building2, 
  TrendingUp, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const { isConnected, address, checkConnection } = useWalletStore();
  const { 
    fetchContractData,
    fetchUserData 
  } = useContractStore();

  useEffect(() => {
    checkConnection();
    fetchContractData();
  }, [checkConnection, fetchContractData]);

  useEffect(() => {
    if (isConnected && address) {
      fetchUserData(address);
    }
  }, [isConnected, address, fetchUserData]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/90 backdrop-blur">
            <div className="flex flex-col items-center text-center">
              <Building2 className="h-12 w-12 mb-4 text-[#181A20]" />
              <h2 className="text-xl font-semibold text-[#181A20] mb-2">
                Tokenized Assets
              </h2>
              <p className="text-sm text-gray-600">
                Invest in premium AI assets through blockchain tokens
              </p>
            </div>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 mb-4 text-green-600" />
              <h2 className="text-xl font-semibold text-[#181A20] mb-2">
                Compliant
              </h2>
              <p className="text-sm text-gray-600">
                KYC verification and regulatory compliance built into every transaction
              </p>
            </div>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur">
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="h-12 w-12 mb-4 text-blue-600" />
              <h2 className="text-xl font-semibold text-[#181A20] mb-2">
                High Yield
              </h2>
              <p className="text-sm text-gray-600">
                Earn passive income through asset appreciation
              </p>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
