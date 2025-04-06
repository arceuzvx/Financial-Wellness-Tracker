import React, { useState, useRef, useEffect } from 'react';
import { FinancialPlan as FinancialPlanType, DailyAction, PersonalizedSuggestion } from '../types';

interface Props {
  plan: FinancialPlanType;
}

const ProgressMeter: React.FC<{ percentage: number }> = ({ percentage }) => {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 20) return 'var(--success-color)';
    if (percentage >= 10) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  return (
    <div className="progress-meter">
      <div className="progress-display" style={{ color: getProgressColor(percentage) }}>
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
};

// Helper component for daily actions
const DailyActionCard: React.FC<{ action: DailyAction }> = ({ action }) => {
  return (
    <div className="daily-action-card">
      <div className="action-day">Day {action.day}</div>
      <div className="action-emoji" aria-hidden="true">{action.emoji}</div>
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
        return <span className="suggestion-icon easy">✅</span>;
      case 'medium':
        return <span className="suggestion-icon medium">⚠️</span>;
      case 'hard':
        return <span className="suggestion-icon hard">🎯</span>;
      default:
        return <span className="suggestion-icon">✅</span>;
    }
  };

  // Helper function to determine timeframe icon
  const getTimeframeIcon = () => {
    switch (suggestion.timeFrame) {
      case 'immediate':
        return <span className="suggestion-icon">💰</span>;
      case 'short-term':
        return <span className="suggestion-icon">📅</span>;
      case 'long-term':
        return <span className="suggestion-icon">📈</span>;
      default:
        return <span className="suggestion-icon">📅</span>;
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
          <span className="suggestion-icon">🏆</span>
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
      case 'Growing': return '📈';
      case 'Stuck': return '⚡';
      case 'Critical': return '🏆';
      default: return '📊';
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

      try {
        // Create a temporary canvas
        const div = calendarRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const scale = window.devicePixelRatio || 2; // Use device pixel ratio for better quality on mobile
        
        // Set canvas dimensions to match the div (scaled up for better quality)
        canvas.width = div.offsetWidth * scale;
        canvas.height = div.offsetHeight * scale;
        
        if (ctx) {
          // Set background color with a marble-like texture
          ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--bg-primary') || '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Add a subtle marble pattern
          ctx.globalAlpha = 0.1;
          for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 50 + 10;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(240, 240, 240, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1.0;
          
          // Scale up for better resolution
          ctx.scale(scale, scale);
          
          // Draw title with a solid background to make it more visible
          ctx.fillStyle = 'rgba(108, 92, 231, 0.9)';
          ctx.fillRect(0, 0, div.offsetWidth, 80);
          
          // Draw header text
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 20px Inter, sans-serif';
          ctx.fillText('Your 30-Day Financial Action Plan', 20, 30);
          ctx.font = '16px Inter, sans-serif';
          ctx.fillText(`Week ${currentWeek} • ${plan.category} Plan`, 20, 60);
          
          // Draw each day's task
          const weekDays = weeks[currentWeek - 1];
          const startY = 100;
          const rowHeight = 80;
          
          weekDays.forEach((day, index) => {
            const y = startY + index * rowHeight;
            
            // Draw day background
            ctx.fillStyle = 'rgba(248, 249, 250, 0.8)';
            ctx.fillRect(20, y, div.offsetWidth - 40, rowHeight - 10);
            
            // Draw border on the left with category color
            let borderColor = '#a8e6cf'; // Default (awareness)
            if (day.category === 'habit') borderColor = '#ffd3b6';
            if (day.category === 'action') borderColor = '#ffaaa5';
            
            ctx.fillStyle = borderColor;
            ctx.fillRect(20, y, 8, rowHeight - 10);
            
            // Draw task text
            ctx.fillStyle = '#2d3436';
            ctx.font = 'bold 16px Inter, sans-serif';
            ctx.fillText(`Day ${day.day}`, 40, y + 25);
            
            ctx.font = '14px Inter, sans-serif';
            
            // Handle long text by wrapping
            const maxWidth = div.offsetWidth - 80;
            const words = day.task.split(' ');
            let line = '';
            let lineY = y + 50;
            
            words.forEach(word => {
              const testLine = line + word + ' ';
              const metrics = ctx.measureText(testLine);
              
              if (metrics.width > maxWidth) {
                ctx.fillText(line, 40, lineY);
                line = word + ' ';
                lineY += 20;
              } else {
                line = testLine;
              }
            });
            
            ctx.fillText(line, 40, lineY);
            
            // Draw category
            ctx.fillStyle = '#636e72';
            ctx.font = 'italic 12px Inter, sans-serif';
            ctx.fillText(day.category, div.offsetWidth - 80, y + rowHeight - 20);
          });
          
          // Create download link
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `${fileName}-calendar-week-${currentWeek}.png`;
          link.href = dataUrl;
          link.click();
          
          // Update message
          messageElement.textContent = 'Calendar downloaded!';
          messageElement.classList.add('success');
        } else {
          throw new Error('Could not get canvas context');
        }
      } catch (error) {
        console.error('Error creating image:', error);
        messageElement.textContent = 'Error creating image, using fallback text export';
        messageElement.classList.add('warning');
        
        // Fallback to text export
        const weekDays = weeks[currentWeek - 1];
        let content = `Your 30-Day Financial Action Plan - Week ${currentWeek}\n\n`;
        weekDays.forEach(day => {
          content += `Day ${day.day}: ${day.task} (${day.category})\n`;
        });
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${fileName}-calendar-week-${currentWeek}.txt`;
        link.href = url;
        link.click();
      }
      
      // Clean up message
      setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
          document.body.removeChild(messageElement);
        }, 500);
      }, 2000);
    }
  };

  return (
    <div className="financial-plan">
      <h2>Your Personalized Financial Improvement Plan</h2>
      
      <div className="plan-section category-section">
        <div className="progress-meter-container">
          <ProgressMeter percentage={savingsRatePercentage} />
          <p className="progress-caption">Based on your income minus expenses</p>
        </div>
        <div className="financial-goal-container">
          <div className={`category-badge ${plan.category.toLowerCase()}`}>
            <span>{getCategoryIcon(plan.category)}</span> {plan.category}
          </div>
          <p className="savings-rate">
            Current Savings Rate: {savingsRatePercentage.toFixed(1)}%
          </p>
          <p className="category-message">{plan.categoryMessage}</p>
        </div>
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
            <h3>💰 Monthly Targets</h3>
            <p>Additional Savings Target: ${plan.savingsTarget.toFixed(2)}</p>
            <p>Expense Reduction Target: ${plan.expenseReductionTarget.toFixed(2)}</p>
            <p>Projected Total Savings: ${plan.projectedSavings.toFixed(2)}</p>
          </div>

          <div className="plan-section">
            <h3>🎯 Key Financial Tips</h3>
            <ul className="key-tips">
              {plan.dailyTips.map((tip, index) => (
                <li key={index}>
                  <span className="tip-icon">💰</span>
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
              <h3>📅 Your 30-Day Action Plan</h3>
              <button 
                className="download-calendar-button" 
                onClick={handleDownloadCalendar}
                title="Download this calendar as an image"
              >
                <span>📥</span> Save as Image
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
                      {action.category === 'awareness' && '📊'}
                      {action.category === 'habit' && '🏆'}
                      {action.category === 'action' && '⚡'}
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
          <span>📥</span> Download Financial Plan
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
                <span className="edit-icon">✏️</span>
              </div>
              <span className="file-extension">.csv</span>
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setShowDownloadModal(false)}>
                Cancel
              </button>
              <button className="download-confirm-button" onClick={handleDownload}>
                <span>📥</span> Download
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