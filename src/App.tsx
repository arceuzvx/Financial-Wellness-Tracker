import React, { useState } from 'react';
import { Form } from './components/Form';
import { FinancialPlan } from './components/FinancialPlan';
import { ThemeToggle } from './components/ThemeToggle';
import { generateFinancialPlan } from './utils/financialCalculations';
import { FinancialData, FinancialPlan as FinancialPlanType } from './types';
import { ThemeProvider } from './contexts/ThemeContext';
import { DollarSign, TrendingUp } from 'react-feather';
import './styles/marble-theme.css';

function App() {
  const [plan, setPlan] = useState<FinancialPlanType | null>(null);

  const handleSubmit = (data: FinancialData) => {
    const generatedPlan = generateFinancialPlan(data);
    setPlan(generatedPlan);
  };

  return (
    <ThemeProvider>
      <div className="app">
        <header>
          <div className="header-content">
            <h1>
              <DollarSign size={24} />
              Financial Wellness Buddy
            </h1>
            <ThemeToggle />
          </div>
        </header>
        
        <main>
          {!plan ? (
            <>
              <p className="intro">
                <TrendingUp size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                Enter your financial information below to receive a personalized 30-day improvement plan.
              </p>
              <Form onSubmit={handleSubmit} />
            </>
          ) : (
            <FinancialPlan plan={plan} />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;