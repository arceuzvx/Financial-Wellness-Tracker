export interface FinancialData {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  financialGoal: number;
  
  occupation: string;
  housingType: 'rent' | 'own' | 'with family' | 'other' | '';
  
  topExpenseCategories: string[];
  diningOutFrequency: 'rarely' | 'sometimes' | 'often' | 'very often' | '';
  subscriptionServices: string[];
  
  commutingMethod: 'car' | 'public transport' | 'bicycle' | 'walk' | 'work from home' | 'other' | '';
  hobbies: string[];
  financialPriorities: ('debt payment' | 'emergency fund' | 'retirement' | 'home purchase' | 'travel' | 'education' | 'other')[];
}

export interface DailyAction {
  day: number;
  task: string;
  category: 'awareness' | 'habit' | 'action';
  emoji: string;
}

export interface FinancialPlan {
  dailyTips: string[];
  savingsTarget: number;
  expenseReductionTarget: number;
  projectedSavings: number;
  savingsRate: number;
  category: 'Growing' | 'Stuck' | 'Critical';
  categoryMessage: string;
  thirtyDayPlan: DailyAction[];
  personalizedSuggestions: PersonalizedSuggestion[];
}

export interface PersonalizedSuggestion {
  category: 'housing' | 'transportation' | 'food' | 'entertainment' | 'subscriptions' | 'utilities' | 'career' | 'other';
  title: string;
  description: string;
  potentialSavings: number;
  implementationDifficulty: 'easy' | 'medium' | 'hard';
  timeFrame: 'immediate' | 'short-term' | 'long-term';
}