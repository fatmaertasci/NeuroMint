'use client';

import { useEffect } from 'react';
import { useWalletStore } from '@/stores/wallet';
import { useContractStore } from '@/stores/contract';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Coins, 
  TrendingUp, 
  Users,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { formatTokenAmount, formatCurrency, formatPercentage } from '@/lib/stellar';
import Link from 'next/link';

export default function Dashboard() {
  const { isConnected, address, checkConnection } = useWalletStore();
  const { 
    assetMetadata, 
    userBalance, 
    isWhitelisted, 
    compliance,
    isLoading,
    fetchContractData,
    fetchUserData 
  } = useContractStore();

  // Check wallet connection and fetch data on mount
  useEffect(() => {
    checkConnection();
    fetchContractData();
  }, [checkConnection, fetchContractData]);

  // Fetch user data when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      fetchUserData(address);
    }
  }, [isConnected, address, fetchUserData]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#181A20]">
        <Header />
        <main className="container mx-auto p-6">
          <h1 className="text-4xl font-bold text-[#00FFFF] mb-4">AIToken Innovation Fund</h1>
          <p className="text-[#F4F4F4] mb-8">Tokenize and trade AI models, datasets, and patents on the blockchain</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
            <Card className="text-center">
              <CardHeader>
                <Building2 className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="text-lg">Tokenized Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Invest in premium real estate and other assets through blockchain tokens
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 mx-auto text-green-600" />
                <CardTitle className="text-lg">Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  KYC verification and regulatory compliance built into every transaction
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 mx-auto text-blue-600" />
                <CardTitle className="text-lg">High Yield</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Earn passive income through rental yields and asset appreciation
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181A20]">
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-[#00FFFF]">AI Token Innovation Fund</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="AI Portfolio Value"
            value="$2.5M"
            icon="🤖"
          />
          <DashboardCard
            title="Active Models"
            value="12"
            icon="🧠"
          />
          <DashboardCard
            title="Total Investors"
            value="156"
            icon="💡"
          />
          <DashboardCard
            title="Verification Status"
            value="Verified"
            icon="✅"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Discover AI Assets"
            description="Browse available AI models and datasets"
            icon="🔍"
            href="/marketplace"
          />
          <QuickActionCard
            title="License Transfer"
            description="Transfer AI asset licenses"
            icon="🔄"
            href="/transfer"
          />
          <QuickActionCard
            title="Tokenize AI Asset"
            description="List your AI model or dataset"
            icon="📊"
            href="/tokenize"
          />
        </div>
      </main>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  icon: string;
}

function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <div className="p-6 bg-[#181A20] rounded-lg border border-[#6C7A89]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-[#F4F4F4]">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-[#00FFFF]">{value}</p>
    </div>
  )
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

function QuickActionCard({ title, description, icon, href }: QuickActionCardProps) {
  return (
    <a href={href} className="p-6 bg-[#181A20] rounded-lg border border-[#6C7A89] hover:border-[#00FFFF] transition-colors">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">{icon}</span>
        <h3 className="text-lg font-medium text-[#F4F4F4]">{title}</h3>
      </div>
      <p className="text-[#6C7A89]">{description}</p>
    </a>
  )
}
