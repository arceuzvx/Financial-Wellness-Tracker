import React, { useState, useRef } from 'react';
import { FinancialPlan as FinancialPlanType } from '../types';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Target, 
  Zap, 
  Award,
  Activity,
  Download,
  Edit
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
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [fileName, setFileName] = useState('my-financial-plan');
  const savingsRatePercentage = plan.savingsRate * 100;
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  
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

  const generateCSV = () => {
    // Header row
    let csvContent = "Day,Category,Task\n";
    
    // Add daily plan data
    plan.thirtyDayPlan.forEach(day => {
      csvContent += `${day.day},"${day.category}","${day.task}"\n`;
    });
    
    // Add summary data
    csvContent += "\nSUMMARY INFORMATION\n";
    csvContent += `Category,${plan.category}\n`;
    csvContent += `Savings Rate,${savingsRatePercentage.toFixed(1)}%\n`;
    csvContent += `Additional Savings Target,$${plan.savingsTarget.toFixed(2)}\n`;
    csvContent += `Expense Reduction Target,$${plan.expenseReductionTarget.toFixed(2)}\n`;
    csvContent += `Projected Total Savings,$${plan.projectedSavings.toFixed(2)}\n\n`;
    
    // Add tips
    csvContent += "FINANCIAL TIPS\n";
    plan.dailyTips.forEach((tip, index) => {
      csvContent += `${index + 1},"${tip}"\n`;
    });
    
    return csvContent;
  };

  const handleDownload = () => {
    const csv = generateCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    if (downloadLinkRef.current) {
      downloadLinkRef.current.setAttribute('href', url);
      downloadLinkRef.current.setAttribute('download', `${fileName}.csv`);
      downloadLinkRef.current.click();
    }
    
    setShowDownloadModal(false);
  };

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

      <div className="download-section">
        <button 
          className="download-button"
          onClick={() => setShowDownloadModal(true)}
        >
          <Download size={18} /> Download Financial Plan
        </button>
      </div>

      {showDownloadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Download Your Financial Plan</h3>
            <div className="filename-input">
              <label htmlFor="fileName">File Name:</label>
              <div className="filename-edit-container">
                <input
                  type="text"
                  id="fileName"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter file name"
                />
                <Edit size={16} className="edit-icon" />
              </div>
              <span className="file-extension">.csv</span>
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setShowDownloadModal(false)}>
                Cancel
              </button>
              <button className="download-confirm-button" onClick={handleDownload}>
                <Download size={16} /> Download
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hidden download link */}
      <a ref={downloadLinkRef} style={{ display: 'none' }}></a>
    </div>
  );
};