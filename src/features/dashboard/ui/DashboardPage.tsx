import React from 'react';
import { HeroBanner } from './components/HeroBanner';
import { StatCard } from './components/StatCard';
import { CreditCardWidget } from './components/CreditCardWidget';
import { CashflowSection } from './components/CashflowSection';
import { TransactionList } from './components/TransactionList';
import { QuickTransfer } from './components/QuickTransfer';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <HeroBanner />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Balance Total"
          amount={38450000}
          change={12.5}
          icon={Wallet}
          trend="up"
          description="Incremento del 12% este mes"
        />
        <StatCard
          title="Ingresos"
          amount={12800000}
          change={4.2}
          icon={TrendingUp}
          trend="up"
          description="Mayor que el mes pasado"
        />
        <StatCard
          title="Gastos"
          amount={5200000}
          change={-1.8}
          icon={TrendingDown}
          trend="down"
          description="Reducción de gastos lograda"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <CashflowSection />
          <TransactionList />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="flex flex-col gap-6">
          <CreditCardWidget />
          <QuickTransfer />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
