import React, { useState } from 'react';
import { FinancialPlan as FinancialPlanType } from '../types';

interface Props {
  plan: FinancialPlanType;
}

const ProgressMeter: React.FC<{ percentage: number }> = ({ percentage }) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 20) return '#a8e6cf';
    if (percentage >= 10) return '#ffd3b6';
    return '#ffaaa5';
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
  
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'Growing': return <span role="img" aria-label="rocket">🚀</span>;
      case 'Stuck': return <span role="img" aria-label="lightning">⚡</span>;
      case 'Critical': return <span role="img" aria-label="flexed biceps">💪</span>;
      default: return <span role="img" aria-label="sparkles">✨</span>;
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
          {getCategoryEmoji(plan.category)} {plan.category}
        </div>
        <p className="savings-rate">
          Current Savings Rate: {savingsRatePercentage.toFixed(1)}%
        </p>
        <p className="category-message">{plan.categoryMessage}</p>
      </div>
      
      <div className="plan-section">
        <h3><span role="img" aria-label="money bag">💰</span> Monthly Targets</h3>
        <p>Additional Savings Target: ${plan.savingsTarget.toFixed(2)}</p>
        <p>Expense Reduction Target: ${plan.expenseReductionTarget.toFixed(2)}</p>
        <p>Projected Total Savings: ${plan.projectedSavings.toFixed(2)}</p>
      </div>

      <div className="plan-section daily-plan-section">
        <h3><span role="img" aria-label="calendar">📅</span> Your 30-Day Action Plan</h3>
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
              <div className="task-emoji">{action.emoji}</div>
              <div className="task-text">{action.task}</div>
              <div className="task-category">{action.category}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="plan-section">
        <h3><span role="img" aria-label="target">🎯</span> Key Financial Tips</h3>
        <ul>
          {plan.dailyTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};