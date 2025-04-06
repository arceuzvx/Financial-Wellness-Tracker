import React, { useState } from 'react';
import { Form } from './components/Form';
import { FinancialPlan } from './components/FinancialPlan';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';
import { generateFinancialPlan } from './utils/financialCalculations';
import { FinancialData, FinancialPlan as FinancialPlanType } from './types';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/App.css';

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
        {/* Add cosmic dust particles for galaxy effect */}
        <div className="galaxy-dust">
          <div className="dust-particle"></div>
          <div className="dust-particle"></div>
          <div className="dust-particle"></div>
          <div className="dust-particle"></div>
          <div className="dust-particle"></div>
        </div>
        
        <header>
          <div className="header-content">
            <h1>
              <span className="app-icon">💰</span>
              Financial Wellness Buddy
            </h1>
            <ThemeToggle />
          </div>
        </header>
        
        <main>
          {!plan ? (
            <>
              <p className="intro">
                <span className="intro-icon">📈</span>
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