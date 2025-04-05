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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="financial-form">
      <div className="form-group">
        <label htmlFor="monthlyIncome">Monthly Income ($)</label>
        <input
          type="number"
          id="monthlyIncome"
          name="monthlyIncome"
          value={formData.monthlyIncome || ''}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="monthlyExpenses">Monthly Expenses ($)</label>
        <input
          type="number"
          id="monthlyExpenses"
          name="monthlyExpenses"
          value={formData.monthlyExpenses || ''}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="monthlySavings">Current Monthly Savings ($)</label>
        <input
          type="number"
          id="monthlySavings"
          name="monthlySavings"
          value={formData.monthlySavings || ''}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="financialGoal">Financial Goal ($)</label>
        <input
          type="number"
          id="financialGoal"
          name="financialGoal"
          value={formData.financialGoal || ''}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
      </div>

      <button type="submit" className="submit-button">
        Generate Financial Plan
      </button>
    </form>
  );
};