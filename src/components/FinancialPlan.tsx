import React, { useState, useRef, useEffect } from 'react';
import { FinancialPlan as FinancialPlanType, DailyAction, PersonalizedSuggestion } from '../types';
import { SafeIcon } from '../utils/iconHelper';
import html2canvas from 'html2canvas';

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

// Helper component for daily actions
const DailyActionCard: React.FC<{ action: DailyAction }> = ({ action }) => {
  return (
    <div className="daily-action-card">
      <div className="action-day">Day {action.day}</div>
      <div className="action-emoji">{action.emoji}</div>
      <div className="action-task">{action.task}</div>
      <div className={`action-category ${action.category}`}>
        {action.category.charAt(0).toUpperCase() + action.category.slice(1)}
      </div>
    </div>
  );
};

// Helper component for personalized suggestions
const SuggestionCard: React.FC<{ suggestion: PersonalizedSuggestion }> = ({ suggestion }) => {
  // Helper function to determine the difficulty icon and color
  const getDifficultyIcon = () => {
    switch (suggestion.implementationDifficulty) {
      case 'easy':
        return <SafeIcon.Check className="suggestion-icon easy" />;
      case 'medium':
        return <SafeIcon.AlertTriangle className="suggestion-icon medium" />;
      case 'hard':
        return <SafeIcon.Target className="suggestion-icon hard" />;
      default:
        return <SafeIcon.Check className="suggestion-icon" />;
    }
  };

  // Helper function to determine timeframe icon
  const getTimeframeIcon = () => {
    switch (suggestion.timeFrame) {
      case 'immediate':
        return <SafeIcon.DollarSign className="suggestion-icon" />;
      case 'short-term':
        return <SafeIcon.Calendar className="suggestion-icon" />;
      case 'long-term':
        return <SafeIcon.TrendingUp className="suggestion-icon" />;
      default:
        return <SafeIcon.Calendar className="suggestion-icon" />;
    }
  };

  return (
    <div className="suggestion-card">
      <div className="suggestion-header">
        <h3>{suggestion.title}</h3>
        <div className="category-badge">{suggestion.category}</div>
      </div>
      <p className="suggestion-description">{suggestion.description}</p>
      <div className="suggestion-metrics">
        <div className="metric">
          <SafeIcon.Award className="suggestion-icon" />
          <span>Potential savings: ${Math.round(suggestion.potentialSavings)}</span>
        </div>
        <div className="metric">
          {getDifficultyIcon()}
          <span>Difficulty: {suggestion.implementationDifficulty}</span>
        </div>
        <div className="metric">
          {getTimeframeIcon()}
          <span>Timeframe: {suggestion.timeFrame}</span>
        </div>
      </div>
    </div>
  );
};

export const FinancialPlan: React.FC<Props> = ({ plan }) => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [fileName, setFileName] = useState('my-financial-plan');
  const savingsRatePercentage = plan.savingsRate * 100;
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'daily-plan' | 'personalized'>('personalized');
  
  // Force re-render of components when plan changes
  useEffect(() => {
    setActiveTab('personalized');
  }, [plan]);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Growing': return <SafeIcon.TrendingUp size={20} />;
      case 'Stuck': return <SafeIcon.Zap size={20} />;
      case 'Critical': return <SafeIcon.Award size={20} />;
      default: return <SafeIcon.Activity size={20} />;
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

  const handleDownloadCalendar = () => {
    if (calendarRef.current) {
      // Show a temporary success message
      const messageElement = document.createElement('div');
      messageElement.className = 'calendar-download-message';
      messageElement.textContent = 'Preparing calendar...';
      document.body.appendChild(messageElement);

      // Use dom-to-image library to convert DOM to image
      html2canvas(calendarRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg-primary')
      })
      .then(function (canvas) {
        const link = document.createElement('a');
        link.download = `${fileName}-calendar.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        // Update message
        messageElement.textContent = 'Calendar downloaded!';
        messageElement.classList.add('success');
        
        setTimeout(() => {
          messageElement.classList.add('fade-out');
          setTimeout(() => {
            document.body.removeChild(messageElement);
          }, 500);
        }, 2000);
      })
      .catch(function (error) {
        console.error('Error creating image:', error);
        messageElement.textContent = 'Error creating image';
        messageElement.classList.add('error');
        
        setTimeout(() => {
          messageElement.classList.add('fade-out');
          setTimeout(() => {
            document.body.removeChild(messageElement);
          }, 500);
        }, 2000);
      });
    }
  };

  return (
    <div className="financial-plan">
      <h2>Your Personalized Financial Improvement Plan</h2>
      
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

      <div className="plan-tabs">
        <button 
          className={`tab-button ${activeTab === 'personalized' ? 'active' : ''}`}
          onClick={() => setActiveTab('personalized')}
        >
          Personalized Suggestions
        </button>
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'daily-plan' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily-plan')}
        >
          30-Day Plan
        </button>
      </div>

      {activeTab === 'personalized' && (
        <div className="personalized-container plan-section">
          <h3>Personalized Savings Suggestions</h3>
          <div className="suggestions-list">
            {plan.personalizedSuggestions.map((suggestion, index) => (
              <SuggestionCard key={index} suggestion={suggestion} />
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'overview' && (
        <div className="plan-overview">
          <div className="plan-section">
            <h3><SafeIcon.DollarSign size={20} /> Monthly Targets</h3>
            <p>Additional Savings Target: ${plan.savingsTarget.toFixed(2)}</p>
            <p>Expense Reduction Target: ${plan.expenseReductionTarget.toFixed(2)}</p>
            <p>Projected Total Savings: ${plan.projectedSavings.toFixed(2)}</p>
          </div>

          <div className="plan-section">
            <h3><SafeIcon.Target size={20} /> Key Financial Tips</h3>
            <ul className="key-tips">
              {plan.dailyTips.map((tip, index) => (
                <li key={index}>
                  <SafeIcon.DollarSign size={18} className="tip-icon" />
                  <span className="tip-text">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'daily-plan' && (
        <div className="daily-plan-container">
          <div className="plan-section daily-plan-section">
            <div className="section-header">
              <h3><SafeIcon.Calendar size={20} /> Your 30-Day Action Plan</h3>
              <button 
                className="download-calendar-button" 
                onClick={handleDownloadCalendar}
                title="Download this calendar as an image"
              >
                <SafeIcon.Download size={16} /> Save as Image
              </button>
            </div>

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

            <div className="daily-tasks" ref={calendarRef}>
              <div className="calendar-header">
                <h4>Your 30-Day Financial Action Plan</h4>
                <p className="calendar-subtitle">Week {currentWeek} • {plan.category} Plan</p>
              </div>
              <div className="calendar-days">
                {weeks[currentWeek - 1].map((action) => (
                  <div key={action.day} className={`daily-task ${action.category}`}>
                    <div className="day-number">Day {action.day}</div>
                    <div className="task-emoji">
                      {action.category === 'awareness' && <SafeIcon.Activity size={20} />}
                      {action.category === 'habit' && <SafeIcon.Award size={20} />}
                      {action.category === 'action' && <SafeIcon.Zap size={20} />}
                    </div>
                    <div className="task-text">{action.task}</div>
                    <div className="task-category">{action.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="cards-section-title">All 30 Days at a Glance</h3>
          <div className="actions-grid">
            {plan.thirtyDayPlan.map(action => (
              <DailyActionCard key={action.day} action={action} />
            ))}
          </div>
        </div>
      )}

      <div className="download-section">
        <button 
          className="download-button"
          onClick={() => setShowDownloadModal(true)}
        >
          <SafeIcon.Download size={18} /> Download Financial Plan
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
                <SafeIcon.Edit size={16} className="edit-icon" />
              </div>
              <span className="file-extension">.csv</span>
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setShowDownloadModal(false)}>
                Cancel
              </button>
              <button className="download-confirm-button" onClick={handleDownload}>
                <SafeIcon.Download size={16} /> Download
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hidden download link */}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a 
        ref={downloadLinkRef} 
        style={{ display: 'none' }} 
        href="#" 
        aria-hidden="true"
      >
        Download
      </a>
    </div>
  );
};