import React, { useState } from 'react';
import { FinancialPlan as FinancialPlanType } from '../types';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Target, 
  Zap, 
  Award,
  Activity
} from 'react-feather';

interface Props {
  plan: FinancialPlanType;
}

const ProgressMeter: React.FC<{ percentage: number }> = ({ percentage }) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 20) return 'var(--success-color)';
    if (percentage >= 10) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  return (
    <div className="progress-meter">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          className="progress-circle-bg"
          cx="100"
          cy="100"
          r={radius}
        />
        <circle
          className="progress-circle-path"
          cx="100"
          cy="100"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ stroke: getProgressColor(percentage) }}
        />
        <text
          x="100"
          y="100"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="bold"
          fill={getProgressColor(percentage)}
        >
          {percentage.toFixed(1)}%
        </text>
      </svg>
    </div>
  );
};

export const FinancialPlan: React.FC<Props> = ({ plan }) => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const savingsRatePercentage = plan.savingsRate * 100;
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Growing': return <TrendingUp size={20} />;
      case 'Stuck': return <Zap size={20} />;
      case 'Critical': return <Award size={20} />;
      default: return <Activity size={20} />;
    }
  };

  const weeks = [
    plan.thirtyDayPlan.slice(0, 7),
    plan.thirtyDayPlan.slice(7, 14),
    plan.thirtyDayPlan.slice(14, 21),
    plan.thirtyDayPlan.slice(21, 28),
    plan.thirtyDayPlan.slice(28, 30),
  ];

  return (
    <div className="financial-plan">
      <h2>Your 30-Day Financial Improvement Plan</h2>
      
      <div className="plan-section category-section">
        <ProgressMeter percentage={savingsRatePercentage} />
        <div className={`category-badge ${plan.category.toLowerCase()}`}>
          {getCategoryIcon(plan.category)} {plan.category}
        </div>
        <p className="savings-rate">
          Current Savings Rate: {savingsRatePercentage.toFixed(1)}%
        </p>
        <p className="category-message">{plan.categoryMessage}</p>
      </div>
      
      <div className="plan-section">
        <h3><DollarSign size={20} /> Monthly Targets</h3>
        <p>Additional Savings Target: ${plan.savingsTarget.toFixed(2)}</p>
        <p>Expense Reduction Target: ${plan.expenseReductionTarget.toFixed(2)}</p>
        <p>Projected Total Savings: ${plan.projectedSavings.toFixed(2)}</p>
      </div>

      <div className="plan-section daily-plan-section">
        <h3><Calendar size={20} /> Your 30-Day Action Plan</h3>
        <div className="week-selector">
          {[1, 2, 3, 4, 5].map((week) => (
            <button
              key={week}
              className={`week-button ${currentWeek === week ? 'active' : ''}`}
              onClick={() => setCurrentWeek(week)}
            >
              Week {week}
            </button>
          ))}
        </div>
        <div className="daily-tasks">
          {weeks[currentWeek - 1].map((action) => (
            <div key={action.day} className={`daily-task ${action.category}`}>
              <div className="day-number">Day {action.day}</div>
              <div className="task-emoji">
                {action.category === 'awareness' && <Activity size={20} />}
                {action.category === 'habit' && <Award size={20} />}
                {action.category === 'action' && <Zap size={20} />}
              </div>
              <div className="task-text">{action.task}</div>
              <div className="task-category">{action.category}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="plan-section">
        <h3><Target size={20} /> Key Financial Tips</h3>
        <ul className="key-tips">
          {plan.dailyTips.map((tip, index) => (
            <li key={index}>
              <DollarSign size={18} className="tip-icon" />
              <span className="tip-text">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};