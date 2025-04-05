import { FinancialData, FinancialPlan, DailyAction, PersonalizedSuggestion } from '../types';

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
  
  // Personalize the daily actions based on the user's profile
  const awarenessActions: DailyAction[] = [
    { 
      day: 1, 
      task: data.subscriptionServices.length > 0 
        ? `Review your ${data.subscriptionServices.length} subscription services for duplicates` 
        : "Download a spending tracker app", 
      category: 'awareness', 
      emoji: '📱' 
    },
    { 
      day: 2, 
      task: data.topExpenseCategories.length > 0 
        ? `Analyze your top expense: ${data.topExpenseCategories[0]}` 
        : "List all your monthly subscriptions", 
      category: 'awareness', 
      emoji: '📝' 
    },
    { day: 3, task: "Review last month's bank statement", category: 'awareness', emoji: '🏦' },
    { 
      day: 4, 
      task: data.diningOutFrequency === 'often' || data.diningOutFrequency === 'very often' 
        ? "Calculate how much you spend dining out each week" 
        : "Calculate your daily coffee/snack spending", 
      category: 'awareness', 
      emoji: '☕' 
    },
    { 
      day: 5, 
      task: data.financialPriorities.length > 0 
        ? `Create a plan for your top priority: ${data.financialPriorities[0]}` 
        : "List your financial goals and priorities", 
      category: 'awareness', 
      emoji: '🎯' 
    }
  ];

  // Customize habit actions based on user data
  const habitActions: DailyAction[] = [
    { 
      day: 6, 
      task: data.diningOutFrequency === 'often' || data.diningOutFrequency === 'very often' 
        ? "Pack lunch for tomorrow instead of eating out" 
        : "Prepare a homemade coffee to save on café costs", 
      category: 'habit', 
      emoji: '🍱' 
    },
    { 
      day: 7, 
      task: data.topExpenseCategories.includes('Shopping') 
        ? "Unsubscribe from shopping newsletters and promotional emails" 
        : "Unsubscribe from one service you rarely use", 
      category: 'habit', 
      emoji: '✉️' 
    },
    { 
      day: 8, 
      task: data.topExpenseCategories.includes('Groceries') 
        ? "Create a budget-friendly meal plan using grocery ads" 
        : "Create a simple meal plan for the week", 
      category: 'habit', 
      emoji: '📅' 
    },
    { 
      day: 9, 
      task: data.financialPriorities.includes('emergency fund') 
        ? "Set up an automatic transfer of $20 to your emergency fund" 
        : "Set up auto-transfer for savings", 
      category: 'habit', 
      emoji: '💰' 
    },
    { 
      day: 10, 
      task: data.hobbies.length > 0 
        ? `Find a free way to enjoy your ${data.hobbies[0]} hobby` 
        : "Find a free weekend activity", 
      category: 'habit', 
      emoji: '🎨' 
    }
  ];

  // Customize growth actions
  const growingActions: DailyAction[] = [
    { 
      day: 11, 
      task: data.financialPriorities.includes('retirement') 
        ? "Research increasing your retirement contributions" 
        : "Research index fund investing", 
      category: 'action', 
      emoji: '📊' 
    },
    { 
      day: 12, 
      task: `Set aside $${dailySavingsGoal} today toward ${data.financialPriorities[0] || 'your financial goal'}`, 
      category: 'action', 
      emoji: '💵' 
    },
    { day: 13, task: "Compare interest rates on high-yield savings accounts", category: 'action', emoji: '🏦' },
    { 
      day: 14, 
      task: data.occupation 
        ? `List potential side hustle ideas related to your ${data.occupation} expertise` 
        : "List potential side hustle ideas", 
      category: 'action', 
      emoji: '💡' 
    },
    { day: 15, task: "Review your retirement contributions", category: 'action', emoji: '👵' }
  ];

  // Customize stuck actions based on user data
  const stuckActions: DailyAction[] = [
    { 
      day: 11, 
      task: data.subscriptionServices.length > 0 
        ? `Choose one subscription to cancel: ${data.subscriptionServices[0]}` 
        : "Find one subscription to cancel", 
      category: 'action', 
      emoji: '✂️' 
    },
    { 
      day: 12, 
      task: data.hobbies.includes('Collecting') 
        ? `Find collectibles worth $${monthlyExpenseTarget} to sell` 
        : `Find items worth $${monthlyExpenseTarget} to sell`, 
      category: 'action', 
      emoji: '📦' 
    },
    { 
      day: 13, 
      task: data.topExpenseCategories.length > 0 
        ? `Compare prices on your ${data.topExpenseCategories[0]} expenses` 
        : "Compare prices on your regular purchases", 
      category: 'action', 
      emoji: '🔍' 
    },
    { 
      day: 14, 
      task: data.housingType === 'rent' 
        ? "Research if you can negotiate your rent or find a more affordable option" 
        : "Call one service provider to negotiate rates", 
      category: 'action', 
      emoji: '📞' 
    },
    { day: 15, task: "Research cashback credit cards for your most common purchases", category: 'action', emoji: '💳' }
  ];

  // Customize critical actions
  const criticalActions: DailyAction[] = [
    { 
      day: 11, 
      task: data.hobbies.length > 0 
        ? `Find 3 free alternatives to paid ${data.hobbies[0]} activities` 
        : "List 3 free alternatives to paid activities", 
      category: 'action', 
      emoji: '🎭' 
    },
    { 
      day: 12, 
      task: data.topExpenseCategories.length > 0 && data.topExpenseCategories[0] !== 'Housing' 
        ? `Find one way to reduce your ${data.topExpenseCategories[0]} expenses` 
        : "Find one unnecessary expense to cut", 
      category: 'action', 
      emoji: '✂️' 
    },
    { day: 13, task: "Research local free financial counseling", category: 'action', emoji: '🤝' },
    { 
      day: 14, 
      task: data.financialPriorities.includes('debt payment') 
        ? "Create a debt snowball or avalanche plan" 
        : "Create a simple debt payoff plan", 
      category: 'action', 
      emoji: '📊' 
    },
    { 
      day: 15, 
      task: data.occupation 
        ? `List skills from your ${data.occupation} job that you could monetize` 
        : "List skills you could monetize", 
      category: 'action', 
      emoji: '💪' 
    }
  ];

  // Common actions with some personalization
  const commonActions: DailyAction[] = [
    { day: 16, task: "Review your progress so far", category: 'awareness', emoji: '📈' },
    { 
      day: 17, 
      task: data.financialPriorities.includes('emergency fund') 
        ? "Calculate how many months of expenses you have saved" 
        : "Share a money-saving tip with a friend", 
      category: 'habit', 
      emoji: '👥' 
    },
    { day: 18, task: "Try a no-spend day challenge", category: 'action', emoji: '🎯' },
    { day: 19, task: "Update your expense tracker", category: 'habit', emoji: '✏️' },
    { day: 20, task: "Find a free financial podcast to follow", category: 'awareness', emoji: '🎧' },
    { day: 21, task: "Calculate this week's savings", category: 'awareness', emoji: '🧮' },
    { 
      day: 22, 
      task: data.financialPriorities.length > 0 
        ? `Plan next month's budget with focus on ${data.financialPriorities[0]}` 
        : "Plan next month's budget", 
      category: 'action', 
      emoji: '📅' 
    },
    { day: 23, task: "Review your financial goals", category: 'awareness', emoji: '🎯' },
    { day: 24, task: "Learn one new financial term", category: 'awareness', emoji: '📚' },
    { day: 25, task: "Write down your money wins", category: 'habit', emoji: '✨' },
    { 
      day: 26, 
      task: data.hobbies.length > 0 
        ? `Plan a free ${data.hobbies[0]} activity` 
        : "Plan a fun, free weekend activity", 
      category: 'habit', 
      emoji: '🎨' 
    },
    { 
      day: 27, 
      task: data.subscriptionServices.length > 0 
        ? "Check for better deals on your current subscriptions" 
        : "Review your subscriptions again", 
      category: 'awareness', 
      emoji: '🔍' 
    },
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

const generatePersonalizedSuggestions = (data: FinancialData): PersonalizedSuggestion[] => {
  const suggestions: PersonalizedSuggestion[] = [];
  
  // Housing suggestions
  if (data.housingType === 'rent') {
    suggestions.push({
      category: 'housing',
      title: 'Optimize your housing costs',
      description: 'Consider negotiating your rent at renewal, finding a roommate, or exploring more affordable neighborhoods while still meeting your needs.',
      potentialSavings: data.monthlyExpenses * 0.15,
      implementationDifficulty: 'medium',
      timeFrame: 'long-term'
    });
  } else if (data.housingType === 'own') {
    suggestions.push({
      category: 'housing',
      title: 'Refinance your mortgage',
      description: 'If interest rates have dropped since you got your mortgage, refinancing could save you significantly over the life of the loan.',
      potentialSavings: data.monthlyExpenses * 0.05,
      implementationDifficulty: 'medium',
      timeFrame: 'long-term'
    });
  }

  // Transportation suggestions
  if (data.commutingMethod === 'car') {
    suggestions.push({
      category: 'transportation',
      title: 'Optimize your commuting costs',
      description: 'Consider carpooling, using public transportation part-time, or combining errands to save on fuel costs.',
      potentialSavings: data.monthlyExpenses * 0.04,
      implementationDifficulty: 'easy',
      timeFrame: 'immediate'
    });
  } else if (data.commutingMethod === 'public transport') {
    suggestions.push({
      category: 'transportation',
      title: 'Get the best fare deal',
      description: 'Check if monthly passes, employer discounts, or off-peak travel could reduce your public transportation costs.',
      potentialSavings: data.monthlyExpenses * 0.02,
      implementationDifficulty: 'easy',
      timeFrame: 'immediate'
    });
  }

  // Food & dining suggestions
  if (data.diningOutFrequency === 'often' || data.diningOutFrequency === 'very often') {
    suggestions.push({
      category: 'food',
      title: 'Reduce dining out expenses',
      description: `Since you dine out ${data.diningOutFrequency}, try reducing by 1-2 meals per week and batch cooking instead. Look for restaurant specials and happy hours when you do eat out.`,
      potentialSavings: data.diningOutFrequency === 'very often' ? data.monthlyExpenses * 0.12 : data.monthlyExpenses * 0.08,
      implementationDifficulty: 'medium',
      timeFrame: 'immediate'
    });
  }

  // Subscription suggestions
  if (data.subscriptionServices.length > 2) {
    suggestions.push({
      category: 'subscriptions',
      title: 'Streamline your subscription services',
      description: `You have ${data.subscriptionServices.length} subscriptions. Consider using service rotation (subscribe to only one streaming service at a time), sharing accounts with family, or using free alternatives.`,
      potentialSavings: data.subscriptionServices.length * 12,
      implementationDifficulty: 'easy',
      timeFrame: 'immediate'
    });
  }

  // Hobby-based suggestions
  if (data.hobbies.includes('Shopping')) {
    suggestions.push({
      category: 'entertainment',
      title: 'Mindful shopping practices',
      description: 'Try the 24-hour rule: wait a day before making non-essential purchases to avoid impulse buying. Create a "want list" and prioritize purchases.',
      potentialSavings: data.monthlyExpenses * 0.08,
      implementationDifficulty: 'medium',
      timeFrame: 'short-term'
    });
  }

  if (data.hobbies.includes('Traveling')) {
    suggestions.push({
      category: 'entertainment',
      title: 'Smarter travel spending',
      description: 'Book travel during off-peak times, use price comparison tools, and consider vacation rentals instead of hotels. Set up a dedicated travel fund with monthly contributions.',
      potentialSavings: data.monthlyExpenses * 0.05,
      implementationDifficulty: 'medium',
      timeFrame: 'long-term'
    });
  }

  // Career-based suggestions
  if (data.occupation) {
    suggestions.push({
      category: 'career',
      title: 'Leverage your professional skills',
      description: `With your experience in ${data.occupation}, consider freelancing, consulting, or teaching your skills for extra income. This could significantly increase your savings rate.`,
      potentialSavings: data.monthlyIncome * 0.1,
      implementationDifficulty: 'hard',
      timeFrame: 'long-term'
    });
  }

  // Top expense category suggestions
  if (data.topExpenseCategories.length > 0) {
    const topExpense = data.topExpenseCategories[0];
    
    if (topExpense === 'Groceries') {
      suggestions.push({
        category: 'food',
        title: 'Optimize grocery spending',
        description: 'Meal plan based on sales, use a grocery list to avoid impulse purchases, buy in bulk for non-perishables, and consider store brands for staples.',
        potentialSavings: data.monthlyExpenses * 0.05,
        implementationDifficulty: 'easy',
        timeFrame: 'immediate'
      });
    } else if (topExpense === 'Entertainment') {
      suggestions.push({
        category: 'entertainment',
        title: 'Reduce entertainment costs',
        description: 'Look for free events in your community, use library resources, take advantage of free trial periods, and check for discount days at venues.',
        potentialSavings: data.monthlyExpenses * 0.06,
        implementationDifficulty: 'easy',
        timeFrame: 'immediate'
      });
    } else if (topExpense === 'Utilities') {
      suggestions.push({
        category: 'utilities',
        title: 'Lower utility bills',
        description: 'Install energy-efficient bulbs, use a programmable thermostat, unplug devices when not in use, and check for better rates from providers.',
        potentialSavings: data.monthlyExpenses * 0.03,
        implementationDifficulty: 'medium',
        timeFrame: 'short-term'
      });
    }
  }

  // Generic suggestions everyone can use
  suggestions.push({
    category: 'other',
    title: 'Automate your savings',
    description: 'Set up automatic transfers to your savings account on payday so you save before you can spend.',
    potentialSavings: data.monthlyIncome * 0.03,
    implementationDifficulty: 'easy',
    timeFrame: 'immediate'
  });

  // Return the most relevant 5 suggestions
  return suggestions.slice(0, 5);
};

export const generateFinancialPlan = (data: FinancialData): FinancialPlan => {
  const savingsRate = data.monthlyIncome > 0 ? data.monthlySavings / data.monthlyIncome : 0;
  const { category, message } = getCategoryInfo(savingsRate);
  
  const disposableIncome = data.monthlyIncome - data.monthlyExpenses - data.monthlySavings;
  const potentialSavings = Math.max(disposableIncome * 0.5, 0);
  const expenseReduction = Math.min(data.monthlyExpenses * 0.1, disposableIncome * 0.3);

  // Generate personalized tips based on user data
  const personalizedTips = [];
  
  // Dining habits tips
  if (data.diningOutFrequency === 'often' || data.diningOutFrequency === 'very often') {
    personalizedTips.push(
      `Try reducing dining out from ${data.diningOutFrequency} to just 1-2 times per week to save approximately $${Math.round(data.monthlyExpenses * 0.08)}`
    );
  }
  
  // Housing situation tips
  if (data.housingType === 'rent') {
    personalizedTips.push('Consider negotiating your rent at renewal or exploring roommate options');
  } else if (data.housingType === 'own') {
    personalizedTips.push('Look into refinancing your mortgage if rates have dropped since you purchased');
  }
  
  // Commuting tips
  if (data.commutingMethod === 'car') {
    personalizedTips.push('Track your car expenses and look for carpooling opportunities to reduce costs');
  }
  
  // Subscription tips
  if (data.subscriptionServices.length > 0) {
    personalizedTips.push(`Review your ${data.subscriptionServices.length} subscription services and consider rotating them instead of keeping all active at once`);
  }
  
  // Occupation-based tips
  if (data.occupation) {
    personalizedTips.push(`Explore freelance opportunities in ${data.occupation} for additional income`);
  }
  
  // Hobby-based tips
  if (data.hobbies.includes('Shopping')) {
    personalizedTips.push('Try the 24-hour rule before making non-essential purchases to reduce impulse buying');
  }
  
  // Common financial tips that apply to everyone
  const commonTips = [
    `Try to save an additional $${potentialSavings.toFixed(2)} per month`,
    `Look for ways to reduce expenses by $${expenseReduction.toFixed(2)}`
  ];

  // Category-specific financial tips
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

  // Take a subset of the most relevant tips
  const combinedTips = [
    ...personalizedTips.slice(0, 3),
    ...commonTips,
    ...categorySpecificTips[category].slice(0, 2)
  ];

  return {
    dailyTips: combinedTips,
    savingsTarget: potentialSavings,
    expenseReductionTarget: expenseReduction,
    projectedSavings: data.monthlySavings + potentialSavings,
    savingsRate: savingsRate,
    category: category,
    categoryMessage: message,
    thirtyDayPlan: generateDailyActions(data, category),
    personalizedSuggestions: generatePersonalizedSuggestions(data)
  };
}; 