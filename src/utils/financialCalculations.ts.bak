import { FinancialData, FinancialPlan, DailyAction } from '../types';

const getCategoryInfo = (savingsRate: number): { category: 'Growing' | 'Stuck' | 'Critical', message: string } => {
  if (savingsRate >= 0.2) {
    return {
      category: 'Growing',
      message: "Great job on your savings! You're building a strong financial foundation. Let's look at ways to make your money work even harder for you."
    };
  } else if (savingsRate >= 0.1) {
    return {
      category: 'Stuck',
      message: "You're making progress with your savings, but there's room to grow. We'll help you find opportunities to save more while maintaining your lifestyle."
    };
  } else {
    return {
      category: 'Critical',
      message: "Everyone starts somewhere! Let's work together to find simple ways to build your savings while keeping your daily life comfortable."
    };
  }
};

const generateDailyActions = (data: FinancialData, category: 'Growing' | 'Stuck' | 'Critical'): DailyAction[] => {
  const monthlyExpenseTarget = Math.round(data.monthlyExpenses * 0.1);
  const dailySavingsGoal = Math.round(data.financialGoal / 365);
  
  const awarenessActions: DailyAction[] = [
    { day: 1, task: "Download a spending tracker app", category: 'awareness', emoji: '📱' },
    { day: 2, task: "List all your monthly subscriptions", category: 'awareness', emoji: '📝' },
    { day: 3, task: "Review last month's bank statement", category: 'awareness', emoji: '🏦' },
    { day: 4, task: "Calculate your daily coffee/snack spending", category: 'awareness', emoji: '☕' },
    { day: 5, task: "List your financial goals and priorities", category: 'awareness', emoji: '🎯' }
  ];

  const habitActions: DailyAction[] = [
    { day: 6, task: "Pack lunch for tomorrow", category: 'habit', emoji: '🍱' },
    { day: 7, task: "Unsubscribe from shopping newsletters", category: 'habit', emoji: '✉️' },
    { day: 8, task: "Create a simple meal plan for the week", category: 'habit', emoji: '📅' },
    { day: 9, task: "Set up auto-transfer for savings", category: 'habit', emoji: '💰' },
    { day: 10, task: "Find a free weekend activity", category: 'habit', emoji: '🎨' }
  ];

  const growingActions: DailyAction[] = [
    { day: 11, task: "Research index fund investing", category: 'action', emoji: '📊' },
    { day: 12, task: `Set aside $${dailySavingsGoal} today`, category: 'action', emoji: '💵' },
    { day: 13, task: "Compare interest rates on savings accounts", category: 'action', emoji: '🏦' },
    { day: 14, task: "List potential side hustle ideas", category: 'action', emoji: '💡' },
    { day: 15, task: "Review your retirement contributions", category: 'action', emoji: '👵' }
  ];

  const stuckActions: DailyAction[] = [
    { day: 11, task: "Find one subscription to cancel", category: 'action', emoji: '✂️' },
    { day: 12, task: `Find items worth $${monthlyExpenseTarget} to sell`, category: 'action', emoji: '📦' },
    { day: 13, task: "Compare prices on your regular purchases", category: 'action', emoji: '🔍' },
    { day: 14, task: "Call one service provider to negotiate rates", category: 'action', emoji: '📞' },
    { day: 15, task: "Research cashback credit cards", category: 'action', emoji: '💳' }
  ];

  const criticalActions: DailyAction[] = [
    { day: 11, task: "List 3 free alternatives to paid activities", category: 'action', emoji: '🎭' },
    { day: 12, task: "Find one unnecessary expense to cut", category: 'action', emoji: '✂️' },
    { day: 13, task: "Research local free financial counseling", category: 'action', emoji: '🤝' },
    { day: 14, task: "Create a simple debt payoff plan", category: 'action', emoji: '📊' },
    { day: 15, task: "List skills you could monetize", category: 'action', emoji: '💪' }
  ];

  // Common actions for days 16-30
  const commonActions: DailyAction[] = [
    { day: 16, task: "Review your progress so far", category: 'awareness', emoji: '📈' },
    { day: 17, task: "Share a money-saving tip with a friend", category: 'habit', emoji: '👥' },
    { day: 18, task: "Try a no-spend day challenge", category: 'action', emoji: '🎯' },
    { day: 19, task: "Update your expense tracker", category: 'habit', emoji: '✏️' },
    { day: 20, task: "Find a free financial podcast to follow", category: 'awareness', emoji: '🎧' },
    { day: 21, task: "Calculate this week's savings", category: 'awareness', emoji: '🧮' },
    { day: 22, task: "Plan next month's budget", category: 'action', emoji: '📅' },
    { day: 23, task: "Review your financial goals", category: 'awareness', emoji: '🎯' },
    { day: 24, task: "Learn one new financial term", category: 'awareness', emoji: '📚' },
    { day: 25, task: "Write down your money wins", category: 'habit', emoji: '✨' },
    { day: 26, task: "Plan a fun, free weekend activity", category: 'habit', emoji: '🎨' },
    { day: 27, task: "Review your subscriptions again", category: 'awareness', emoji: '🔍' },
    { day: 28, task: "Set a new savings milestone", category: 'action', emoji: '🏆' },
    { day: 29, task: "Share your progress with family", category: 'habit', emoji: '👨‍👩‍👧‍👦' },
    { day: 30, task: "Create next month's action plan", category: 'action', emoji: '📝' }
  ];

  const categorySpecificActions = 
    category === 'Growing' ? growingActions :
    category === 'Stuck' ? stuckActions :
    criticalActions;

  return [
    ...awarenessActions,
    ...habitActions,
    ...categorySpecificActions,
    ...commonActions
  ];
};

export const generateFinancialPlan = (data: FinancialData): FinancialPlan => {
  const savingsRate = data.monthlyIncome > 0 ? data.monthlySavings / data.monthlyIncome : 0;
  const { category, message } = getCategoryInfo(savingsRate);
  
  const disposableIncome = data.monthlyIncome - data.monthlyExpenses - data.monthlySavings;
  const potentialSavings = Math.max(disposableIncome * 0.5, 0);
  const expenseReduction = Math.min(data.monthlyExpenses * 0.1, disposableIncome * 0.3);

  const commonTips = [
    `Try to save an additional $${potentialSavings.toFixed(2)} per month`,
    `Look for ways to reduce expenses by $${expenseReduction.toFixed(2)}`,
  ];

  const categorySpecificTips = {
    Growing: [
      'Consider investing in low-cost index funds',
      'Look into tax-advantaged retirement accounts',
      'Set up automatic transfers to your savings'
    ],
    Stuck: [
      'Track all daily expenses in a spending journal',
      'Try the 50/30/20 budgeting rule',
      'Review and cancel unused subscriptions'
    ],
    Critical: [
      'Start with small, achievable savings goals',
      'Cook meals at home more frequently',
      'Look for free entertainment options in your area'
    ]
  };

  return {
    dailyTips: [...commonTips, ...categorySpecificTips[category]],
    savingsTarget: potentialSavings,
    expenseReductionTarget: expenseReduction,
    projectedSavings: data.monthlySavings + potentialSavings,
    savingsRate: savingsRate,
    category: category,
    categoryMessage: message,
    thirtyDayPlan: generateDailyActions(data, category)
  };
};