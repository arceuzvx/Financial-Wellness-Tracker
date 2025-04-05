import React, { useState } from 'react';
import { FinancialData } from '../types';
import { 
  DollarSign, 
  CreditCard, 
  Briefcase, 
  Target, 
  Home, 
  Coffee, 
  Monitor, 
  Truck, 
  Heart,
  Star,
  ChevronDown,
  ChevronUp
} from 'react-feather';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
            <Briefcase size={18} />
            <input
              type="number"
              id="monthlyIncome"
              name="monthlyIncome"
              value={formData.monthlyIncome || ''}
              onChange={handleNumberChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter your monthly income"
            />
          </div>

          <div className="form-group">
            <label htmlFor="monthlyExpenses">Monthly Expenses</label>
            <CreditCard size={18} />
            <input
              type="number"
              id="monthlyExpenses"
              name="monthlyExpenses"
              value={formData.monthlyExpenses || ''}
              onChange={handleNumberChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter your monthly expenses"
            />
          </div>

          <div className="form-group">
            <label htmlFor="monthlySavings">Current Monthly Savings</label>
            <DollarSign size={18} />
            <input
              type="number"
              id="monthlySavings"
              name="monthlySavings"
              value={formData.monthlySavings || ''}
              onChange={handleNumberChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter your current savings"
            />
          </div>

          <div className="form-group">
            <label htmlFor="financialGoal">Financial Goal</label>
            <Target size={18} />
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

          <button type="button" className="next-button" onClick={handleNextStep}>
            Continue to Personal Details
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="form-step">
          <h2 className="form-step-title">Personal Information</h2>
          <p className="form-step-description">
            Tell us more about your personal situation to help us provide more relevant financial advice.
          </p>

          <div className="form-group">
            <label htmlFor="occupation">Occupation / Industry</label>
            <Briefcase size={18} />
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleTextChange}
              required
              placeholder="Enter your job title or industry"
            />
          </div>

          <div className="form-group">
            <label htmlFor="housingType">Housing Situation</label>
            <Home size={18} />
            <select
              id="housingType"
              name="housingType"
              value={formData.housingType}
              onChange={handleSelectChange}
              required
              className="select-input"
            >
              <option value="" disabled>Select your housing situation</option>
              <option value="rent">Renting</option>
              <option value="own">Own home</option>
              <option value="with family">Living with family</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="commutingMethod">Primary Commuting Method</label>
            <Truck size={18} />
            <select
              id="commutingMethod"
              name="commutingMethod"
              value={formData.commutingMethod}
              onChange={handleSelectChange}
              required
              className="select-input"
            >
              <option value="" disabled>Select your primary commuting method</option>
              <option value="car">Car</option>
              <option value="public transport">Public Transportation</option>
              <option value="bicycle">Bicycle</option>
              <option value="walk">Walk</option>
              <option value="work from home">Work from Home</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="diningOutFrequency">How often do you dine out?</label>
            <Coffee size={18} />
            <select
              id="diningOutFrequency"
              name="diningOutFrequency"
              value={formData.diningOutFrequency}
              onChange={handleSelectChange}
              required
              className="select-input"
            >
              <option value="" disabled>Select frequency</option>
              <option value="rarely">Rarely (few times a month)</option>
              <option value="sometimes">Sometimes (once a week)</option>
              <option value="often">Often (2-3 times a week)</option>
              <option value="very often">Very Often (almost daily)</option>
            </select>
          </div>

          <div className="form-nav-buttons">
            <button type="button" className="prev-button" onClick={handlePrevStep}>
              Back
            </button>
            <button type="button" className="next-button" onClick={handleNextStep}>
              Continue to Spending & Lifestyle
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
              {isExpenseDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
              {isHobbyDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
              {isPriorityDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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

          <div className="form-nav-buttons">
            <button type="button" className="prev-button" onClick={handlePrevStep}>
              Back
            </button>
            <button type="submit" className="submit-button">
              Generate Financial Plan
            </button>
          </div>
        </div>
      )}
    </form>
  );
};