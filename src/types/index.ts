export interface FinancialData {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  financialGoal: number;
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
}