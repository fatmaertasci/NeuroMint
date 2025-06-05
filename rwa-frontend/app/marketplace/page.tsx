'use client';

import Header from '@/components/layout/Header';
import { formatCurrency, formatPercentage } from '@/lib/stellar';

interface AssetCardProps {
  name: string;
  symbol: string;
  status: string;
  price: string;
  performance: number;
}

function AssetCard({ name, symbol, status, price, performance }: AssetCardProps) {  return (
    <div className="p-6 rounded-lg border border-gray-200 hover:border-[#00FFFF] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-[#181A20]">{name}</h3>
          <p className="text-sm text-gray-600">{symbol}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${
          status === 'verified' ? 'bg-green-600' :
          status === 'stable' ? 'bg-blue-600' :
          'bg-yellow-600'
        }`}>
          {status}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[#6C7A89]">Price</span>
          <span className="text-xl font-bold text-[#00FFFF]">{formatCurrency(price)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#6C7A89]">Performance</span>
          <span className={`font-bold ${
            performance >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {formatPercentage(performance)}
          </span>
        </div>

        <button className="w-full px-4 py-2 bg-[#00FFFF] text-[#181A20] rounded-md font-semibold transition-all hover:bg-[#00B3B3]">
          View Details
        </button>
      </div>
    </div>
  );
}

export default function Marketplace() {
  const mockAssets = [
    {
      name: "GPT-4 Integration Model",
      symbol: "GPT4-IM",
      status: "verified",
      price: "50000",
      performance: 28.5
    },
    {
      name: "Computer Vision Dataset",
      symbol: "CV-DS",
      status: "stable",
      price: "25000",
      performance: 12.3
    },
    {
      name: "NLP Training Model",
      symbol: "NLP-TM",
      status: "experimental",
      price: "15000",
      performance: -5.2
    }
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAssets.map((asset, index) => (
            <div key={index} className="bg-white/90 backdrop-blur rounded-lg">
              <AssetCard {...asset} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}