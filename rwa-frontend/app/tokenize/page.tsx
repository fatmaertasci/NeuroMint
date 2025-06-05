'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useWalletStore } from '@/stores/wallet';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Building2,
  FileText,
  Shield,
  Check,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type TokenizeFormType = {
  assetName: string;
  description: string;
  assetType: string;
  totalValue: string;
  tokenSupply: string;
  totalSupply: string;
  creatorAddress: string;
  location: string;
  tokenSymbol: string;
  minInvestment: string;
  fundingGoal: string;
  fundingDeadline: string;
  kycRequired: boolean;
  accreditedOnly: boolean;
  jurisdictionRestrictions: string;
};

type TokenizationStepProps = {
  step: number;
  currentStep: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

const TokenizationStep = ({ 
  step, 
  currentStep, 
  title, 
  description, 
  icon: Icon 
}: TokenizationStepProps) => {
  const isCompleted = currentStep > step;
  const isCurrent = currentStep === step;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg ${
      isCurrent ? 'bg-primary/10' : 'bg-background'
    }`}>
      <div className={`p-2 rounded-full ${
        isCompleted ? 'bg-green-500' :
        isCurrent ? 'bg-primary' :
        'bg-muted'
      }`}>
        {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const TOKENIZATION_STEPS = [
  {
    title: 'Asset Details',
    description: 'Basic information about your AI asset',
    icon: Building2
  },
  {
    title: 'Documentation',
    description: 'Upload required documents',
    icon: FileText
  },
  {
    title: 'Compliance',
    description: 'Set compliance rules',
    icon: Shield
  },
];

export default function TokenizePage() {
  const { address } = useWalletStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TokenizeFormType>({
    assetName: '',
    description: '',
    assetType: '',
    totalValue: '',
    tokenSupply: '',
    totalSupply: '',
    creatorAddress: address || '',
    location: '',
    tokenSymbol: '',
    minInvestment: '',
    fundingGoal: '',
    fundingDeadline: '',
    kycRequired: true,
    accreditedOnly: false,
    jurisdictionRestrictions: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      // Burada token oluşturma işlemi yapılacak
      toast.success('Asset tokenization initiated successfully!');
      // İşlem başarılı olduğunda marketplace sayfasına yönlendir
      window.location.href = '/marketplace';
    } catch (error) {
      toast.error('Failed to tokenize asset. Please try again.');
    }
  };

  const renderForm = () => {
    switch(currentStep) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="assetName">Asset Name</Label>
                <Input
                  id="assetName"
                  name="assetName"
                  value={formData.assetName}
                  onChange={handleInputChange}
                  placeholder="Enter asset name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your AI asset"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assetType">Asset Type</Label>
                <Input
                  id="assetType"
                  name="assetType"
                  value={formData.assetType}
                  onChange={handleInputChange}
                  placeholder="e.g. Language Model, Computer Vision Model"
                />
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="totalValue">Total Value (USD)</Label>
                <Input
                  id="totalValue"
                  name="totalValue"
                  value={formData.totalValue}
                  onChange={handleInputChange}
                  placeholder="Enter total value"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokenSupply">Token Supply</Label>
                <Input
                  id="tokenSupply"
                  name="tokenSupply"
                  value={formData.tokenSupply}
                  onChange={handleInputChange}
                  placeholder="Enter total token supply"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokenSymbol">Token Symbol</Label>
                <Input
                  id="tokenSymbol"
                  name="tokenSymbol"
                  value={formData.tokenSymbol}
                  onChange={handleInputChange}
                  placeholder="e.g. AI-USD"
                />
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="kycRequired"
                  name="kycRequired"
                  checked={formData.kycRequired}
                  onChange={handleInputChange}
                />
                <Label htmlFor="kycRequired">KYC Required</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="accreditedOnly"
                  name="accreditedOnly" 
                  checked={formData.accreditedOnly}
                  onChange={handleInputChange}
                />
                <Label htmlFor="accreditedOnly">Accredited Investors Only</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jurisdictionRestrictions">Jurisdiction Restrictions</Label>
                <Input
                  id="jurisdictionRestrictions"
                  name="jurisdictionRestrictions"
                  value={formData.jurisdictionRestrictions}
                  onChange={handleInputChange}
                  placeholder="Enter restricted jurisdictions"
                />
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/90 backdrop-blur">
            <div className="grid gap-8 mb-8">
              {TOKENIZATION_STEPS.map((step, index) => (
                <TokenizationStep
                  key={step.title}
                  step={index + 1}
                  currentStep={currentStep}
                  {...step}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              {renderForm()}
              
              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <Button type="button" onClick={handleBack}>
                    Back
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
}