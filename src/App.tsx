import React, { useState } from 'react';
import { Form } from './components/Form';
import { FinancialPlan } from './components/FinancialPlan';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';
import { generateFinancialPlan } from './utils/financialCalculations';
import { FinancialData, FinancialPlan as FinancialPlanType } from './types';
import { ThemeProvider } from './contexts/ThemeContext';
import { SafeIcon } from './utils/iconHelper';
import './styles/marble-theme.css';

function App() {
  const [plan, setPlan] = useState<FinancialPlanType | null>(null);
  const [showLoading, setShowLoading] = useState(false);

  const handleSubmit = (data: FinancialData) => {
    setShowLoading(true);
    
    // Simulate a brief loading period to give feedback to the user
    setTimeout(() => {
      const generatedPlan = generateFinancialPlan(data);
      setPlan(generatedPlan);
      setShowLoading(false);
      
      // Scroll to top when plan is generated
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  return (
    <ThemeProvider>
      <div className="app">
        <header>
          <div className="header-content">
            <h1>
              <SafeIcon.DollarSign size={24} />
              Financial Wellness Buddy
            </h1>
            <ThemeToggle />
          </div>
        </header>
        
        <main>
          {!plan ? (
            <>
              <p className="intro">
                <SafeIcon.TrendingUp size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                Enter your financial information below to receive a personalized 30-day improvement plan.
              </p>
              {showLoading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Generating your personalized financial plan...</p>
                </div>
              ) : (
                <Form onSubmit={handleSubmit} />
              )}
            </>
          ) : (
            <FinancialPlan plan={plan} />
          )}
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;