import React, { useState } from 'react';
import { FinancialData } from '../types';

interface FormProps {
  onSubmit: (data: FinancialData) => void;
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FinancialData>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlySavings: 0,
    financialGoal: 0,
    occupation: '',
    housingType: '',
    topExpenseCategories: [],
    diningOutFrequency: '',
    subscriptionServices: [],
    commutingMethod: '',
    hobbies: [],
    financialPriorities: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isExpenseDropdownOpen, setIsExpenseDropdownOpen] = useState(false);
  const [isHobbyDropdownOpen, setIsHobbyDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [customExpense, setCustomExpense] = useState("");
  const [customHobby, setCustomHobby] = useState("");
  const [customSubscription, setCustomSubscription] = useState("");
  const [calculatedSavings, setCalculatedSavings] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      monthlySavings: calculatedSavings
    });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIncomeExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value) || 0;
    
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [name]: numValue
      };
      
      const newIncome = name === 'monthlyIncome' ? numValue : prev.monthlyIncome;
      const newExpenses = name === 'monthlyExpenses' ? numValue : prev.monthlyExpenses;
      const newSavings = Math.max(0, newIncome - newExpenses);
      setCalculatedSavings(newSavings);
      
      return updatedData;
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (
    category: 'topExpenseCategories' | 'subscriptionServices' | 'hobbies' | 'financialPriorities',
    value: string,
    checked: boolean
  ) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [category]: [...prev[category], value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [category]: prev[category].filter(item => item !== value)
      }));
    }
  };

  const addCustomItem = (
    category: 'topExpenseCategories' | 'subscriptionServices' | 'hobbies',
    value: string,
    setValueFn: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.trim() !== "") {
      setFormData(prev => ({
        ...prev,
        [category]: [...prev[category], value.trim()]
      }));
      setValueFn("");
    }
  };

  const expenseCategories = [
    'Groceries', 'Dining Out', 'Housing', 'Utilities', 'Transportation', 
    'Entertainment', 'Shopping', 'Healthcare', 'Education', 'Travel'
  ];

  const subscriptionTypes = [
    'Streaming (Netflix, Hulu, etc.)', 'Music (Spotify, Apple Music, etc.)', 
    'News/Magazines', 'Gaming', 'Software/Apps', 'Meal Kits', 
    'Fitness/Wellness', 'Beauty/Fashion Boxes'
  ];

  const hobbyOptions = [
    'Reading', 'Cooking', 'Gaming', 'Sports', 'Fitness', 'Art/Crafting', 
    'Music', 'Traveling', 'Photography', 'Collecting', 'Gardening', 'Shopping'
  ];

  const priorityOptions = [
    'debt payment', 'emergency fund', 'retirement', 'home purchase', 
    'travel', 'education', 'other'
  ];

  return (
    <form onSubmit={handleSubmit} className="financial-form multi-step-form">
      {currentStep === 1 && (
        <div className="form-step">
          <h2 className="form-step-title">Basic Financial Information</h2>
          <p className="form-step-description">
            Let's start with your basic financial numbers to get a clear picture of your current situation.
          </p>

          <div className="form-group">
            <label htmlFor="monthlyIncome">Monthly Income</label>
            <span className="form-icon">💼</span>
            <input
              type="number"
              id="monthlyIncome"
              name="monthlyIncome"
              value={formData.monthlyIncome || ''}
              onChange={handleIncomeExpenseChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter your monthly income"
            />
          </div>

          <div className="form-group">
            <label htmlFor="monthlyExpenses">Monthly Expenses</label>
            <span className="form-icon">💳</span>
            <input
              type="number"
              id="monthlyExpenses"
              name="monthlyExpenses"
              value={formData.monthlyExpenses || ''}
              onChange={handleIncomeExpenseChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter your monthly expenses"
            />
          </div>

          <div className="form-group">
            <label htmlFor="calculatedSavings">Calculated Monthly Savings</label>
            <span className="form-icon">💰</span>
            <input
              type="number"
              id="calculatedSavings"
              name="calculatedSavings"
              value={calculatedSavings}
              readOnly
              className="calculated-field"
              placeholder="Your calculated monthly savings"
            />
          </div>

          <div className="form-group">
            <label htmlFor="financialGoal">Financial Goal Amount</label>
            <span className="form-icon">🎯</span>
            <input
              type="number"
              id="financialGoal"
              name="financialGoal"
              value={formData.financialGoal || ''}
              onChange={handleNumberChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter your financial goal"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleNextStep} className="next-button">
              Next Step
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="form-step">
          <h2 className="form-step-title">Lifestyle Information</h2>
          <p className="form-step-description">
            Tell us a bit more about your lifestyle to help us create a more personalized plan.
          </p>

          <div className="form-group">
            <label htmlFor="occupation">Occupation</label>
            <span className="form-icon">👔</span>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleTextChange}
              required
              placeholder="Enter your occupation"
            />
          </div>

          <div className="form-group select-group">
            <label htmlFor="housingType">Housing Type</label>
            <span className="form-icon">🏠</span>
            <select
              id="housingType"
              name="housingType"
              value={formData.housingType}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select your housing type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="with parents">Living with parents</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group select-group">
            <label htmlFor="diningOutFrequency">Dining Out Frequency</label>
            <span className="form-icon">🍽️</span>
            <select
              id="diningOutFrequency"
              name="diningOutFrequency"
              value={formData.diningOutFrequency}
              onChange={handleSelectChange}
              required
            >
              <option value="">How often do you dine out?</option>
              <option value="rarely">Rarely (1-2 times per month)</option>
              <option value="sometimes">Sometimes (1-2 times per week)</option>
              <option value="often">Often (3-5 times per week)</option>
              <option value="daily">Daily</option>
            </select>
          </div>

          <div className="form-group select-group">
            <label htmlFor="commutingMethod">Primary Commuting Method</label>
            <span className="form-icon">🚗</span>
            <select
              id="commutingMethod"
              name="commutingMethod"
              value={formData.commutingMethod}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select your primary commuting method</option>
              <option value="car">Car</option>
              <option value="public transit">Public Transit</option>
              <option value="bike">Bicycle</option>
              <option value="walk">Walking</option>
              <option value="work from home">Work from home</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handlePrevStep} className="prev-button">
              Previous
            </button>
            <button type="button" onClick={handleNextStep} className="next-button">
              Next Step
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="form-step">
          <h2 className="form-step-title">Spending & Lifestyle</h2>
          <p className="form-step-description">
            Understanding your spending habits and lifestyle preferences will help us personalize your financial plan.
          </p>

          <div className="form-group checkbox-group">
            <label onClick={() => setIsExpenseDropdownOpen(!isExpenseDropdownOpen)} className="dropdown-label">
              Top Expense Categories
              {isExpenseDropdownOpen ? <span className="form-icon">🔼</span> : <span className="form-icon">🔽</span>}
            </label>
            
            {isExpenseDropdownOpen && (
              <div className="checkbox-container">
                {expenseCategories.map(category => (
                  <label key={category} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.topExpenseCategories.includes(category)}
                      onChange={(e) => handleCheckboxChange('topExpenseCategories', category, e.target.checked)}
                    />
                    {category}
                  </label>
                ))}
                <div className="custom-input-container">
                  <input
                    type="text"
                    value={customExpense}
                    onChange={(e) => setCustomExpense(e.target.value)}
                    placeholder="Add other expense category"
                    className="custom-input"
                  />
                  <button 
                    type="button" 
                    className="custom-add-button"
                    onClick={() => addCustomItem('topExpenseCategories', customExpense, setCustomExpense)}
                  >
                    Add
                  </button>
                </div>
                {formData.topExpenseCategories.length > 0 && (
                  <div className="selected-items">
                    <label>Selected Categories:</label>
                    <div className="tag-list">
                      {formData.topExpenseCategories.map(cat => (
                        <span key={cat} className="selected-tag">
                          {cat}
                          <button 
                            type="button" 
                            className="tag-remove"
                            onClick={() => handleCheckboxChange('topExpenseCategories', cat, false)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label>Subscription Services</label>
            <div className="checkbox-container">
              {subscriptionTypes.map(sub => (
                <label key={sub} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.subscriptionServices.includes(sub)}
                    onChange={(e) => handleCheckboxChange('subscriptionServices', sub, e.target.checked)}
                  />
                  {sub}
                </label>
              ))}
              <div className="custom-input-container">
                <input
                  type="text"
                  value={customSubscription}
                  onChange={(e) => setCustomSubscription(e.target.value)}
                  placeholder="Add other subscription"
                  className="custom-input"
                />
                <button 
                  type="button" 
                  className="custom-add-button"
                  onClick={() => addCustomItem('subscriptionServices', customSubscription, setCustomSubscription)}
                >
                  Add
                </button>
              </div>
              {formData.subscriptionServices.length > 0 && (
                <div className="selected-items">
                  <label>Selected Subscriptions:</label>
                  <div className="tag-list">
                    {formData.subscriptionServices.map(sub => (
                      <span key={sub} className="selected-tag">
                        {sub}
                        <button 
                          type="button" 
                          className="tag-remove"
                          onClick={() => handleCheckboxChange('subscriptionServices', sub, false)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label onClick={() => setIsHobbyDropdownOpen(!isHobbyDropdownOpen)} className="dropdown-label">
              Hobbies & Interests
              {isHobbyDropdownOpen ? <span className="form-icon">🔼</span> : <span className="form-icon">🔽</span>}
            </label>
            
            {isHobbyDropdownOpen && (
              <div className="checkbox-container">
                {hobbyOptions.map(hobby => (
                  <label key={hobby} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.hobbies.includes(hobby)}
                      onChange={(e) => handleCheckboxChange('hobbies', hobby, e.target.checked)}
                    />
                    {hobby}
                  </label>
                ))}
                <div className="custom-input-container">
                  <input
                    type="text"
                    value={customHobby}
                    onChange={(e) => setCustomHobby(e.target.value)}
                    placeholder="Add other hobby"
                    className="custom-input"
                  />
                  <button 
                    type="button" 
                    className="custom-add-button"
                    onClick={() => addCustomItem('hobbies', customHobby, setCustomHobby)}
                  >
                    Add
                  </button>
                </div>
                {formData.hobbies.length > 0 && (
                  <div className="selected-items">
                    <label>Selected Hobbies:</label>
                    <div className="tag-list">
                      {formData.hobbies.map(hobby => (
                        <span key={hobby} className="selected-tag">
                          {hobby}
                          <button 
                            type="button" 
                            className="tag-remove"
                            onClick={() => handleCheckboxChange('hobbies', hobby, false)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label onClick={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)} className="dropdown-label">
              Financial Priorities
              {isPriorityDropdownOpen ? <span className="form-icon">🔼</span> : <span className="form-icon">🔽</span>}
            </label>
            
            {isPriorityDropdownOpen && (
              <div className="checkbox-container">
                {priorityOptions.map(priority => (
                  <label key={priority} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.financialPriorities.includes(priority as any)}
                      onChange={(e) => handleCheckboxChange('financialPriorities', priority, e.target.checked)}
                    />
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </label>
                ))}
                {formData.financialPriorities.length > 0 && (
                  <div className="selected-items">
                    <label>Selected Priorities:</label>
                    <div className="tag-list">
                      {formData.financialPriorities.map(priority => (
                        <span key={priority} className="selected-tag">
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          <button 
                            type="button" 
                            className="tag-remove"
                            onClick={() => handleCheckboxChange('financialPriorities', priority, false)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={handlePrevStep} className="prev-button">
              Previous
            </button>
            <button type="button" onClick={handleNextStep} className="next-button">
              Next Step
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="form-step">
          <h2 className="form-step-title">Submit Your Information</h2>
          <p className="form-step-description">
            We're ready to create your personalized financial plan! Review your information and click "Generate Plan" to continue.
          </p>

          <div className="summary-section">
            <h3>Financial Summary</h3>
            <div className="summary-row">
              <span className="summary-label">Monthly Income:</span>
              <span className="summary-value">{formData.monthlyIncome}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Monthly Expenses:</span>
              <span className="summary-value">{formData.monthlyExpenses}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Monthly Savings:</span>
              <span className="summary-value">{calculatedSavings}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Financial Goal:</span>
              <span className="summary-value">{formData.financialGoal}</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handlePrevStep} className="prev-button">
              Previous
            </button>
            <button type="submit" className="submit-button">
              Generate Plan
            </button>
          </div>
        </div>
      )}
    </form>
  );
};