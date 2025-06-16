interface I18nTexts {
  title: string;
  description: string;
  features: {
    realTimeCalculation: string;
    detailedDeductions: string;
    completeFormula: string;
    taxSavingTips: string;
    autoSave: string;
  };
  buttons: {
    clearAllData: string;
    changeLanguage: string;
  };
  cardTitles: {
    majorTaxReforms2025: string;
    taxFreeThresholds: string;
    basicInfo: string;
    dependents: string;
    deductionChoice: string;
    specialDeductions: string;
    calculationResults: string;
    separateFilingDetails: string;
    filingMethodComparison: string;
    completeCalculationFormula: string;
    deductionDetails: string;
    taxBrackets2025: string;
    itemizedDeductionDetails: string;
    taxSavingTips: string;
    importantNotes: string;
  };
  basicInfo: {
    salaryIncome: string;
    salaryPlaceholder: string;
    salaryDescription: string;
    otherIncome: string;
    otherPlaceholder: string;
    otherDescription: string;
    married: string;
    spouseInfo: string;
    spouseSalaryIncome: string;
    spouseSalaryPlaceholder: string;
    spouseOtherIncome: string;
    spouseOtherPlaceholder: string;
    taxCalculationMethod: string;
    combinedFiling: string;
    salarySeparate: string;
    allSeparate: string;
    autoSelect: string;
    eTaxDescription: string;
  };
  dependents: {
    description: string;
    childrenUnder6: string;
    childrenPlaceholder: string;
    childrenDescription: string;
    elderlyOver70: string;
    elderlyPlaceholder: string;
    elderlyDescription: string;
    generalDependents: string;
    generalPlaceholder: string;
    generalDescription: string;
    students: string;
    studentsPlaceholder: string;
    studentsDescription: string;
    disabled: string;
    disabledPlaceholder: string;
    disabledDescription: string;
    longTermCare: string;
    longTermCarePlaceholder: string;
    longTermCareDescription: string;
    longTermCareWarning: string;
  };
  deductionChoice: {
    description: string;
    useItemizedDeduction: string;
    standardDeductionNote: string;
    itemizedDeductionDetails: string;
    itemizedDeductionReminder: string;
    donations: string;
    donationsPlaceholder: string;
    donationsConditions: string[];
    personalInsurance: string;
    personalInsurancePlaceholder: string;
    personalInsuranceConditions: string[];
    healthInsurance: string;
    healthInsurancePlaceholder: string;
    healthInsuranceConditions: string[];
    medicalExpenses: string;
    medicalPlaceholder: string;
    medicalConditions: string[];
    disasterLoss: string;
    disasterPlaceholder: string;
    disasterConditions: string[];
    mortgageInterest: string;
    mortgagePlaceholder: string;
    mortgageConditions: string[];
    excludedItems: string;
    excludedItemsList: string[];
  };
  specialDeductions: {
    description: string;
    rentalExpenses: string;
    rentalPlaceholder: string;
    rentalDescription: string;
    savingsInterest: string;
    savingsPlaceholder: string;
    savingsDescription: string;
  };
  calculationResults: {
    taxAmount: string;
    effectiveTaxRate: string;
    afterTaxIncome: string;
    applicableTaxBracket: string;
    separateFilingDescription: string;
    taxpayer: string;
    spouse: string;
    grossIncome: string;
    totalDeductions: string;
    netIncome: string;
    applicableTaxRate: string;
    taxpayerSalaryPortion: string;
    remainingPortion: string;
    taxpayerSalaryNet: string;
    taxpayerExemption: string;
    taxableNetAmount: string;
    remainingIncomeTotal: string;
    remainingIncomeNet: string;
    spouseSalaryIncluded: string;
    separateFilingTotal: string;
    salarySeperateTotal: string;
    calculationFormula: string;
    taxpayerSalary: string;
    remainingIncome: string;
    minusDeductionsTotal: string;
    salaryTaxableNet: string;
    taxpayerSalaryTaxAmount: string;
    remainingIncomeTaxAmount: string;
    separateFilingTotalLabel: string;
    salarySeperateTotalLabel: string;
    calculationFormulaLabel: string;
    bestChoice: string;
    savingsMessage: string;
    totalIncome: string;
    effectiveTaxRateFormula: string;
    afterTaxIncomeFormula: string;
  };
  filingMethodComparison: {
    description: string;
    taxAmount: string;
    bestChoice: string;
    savingsMessage: string;
    taxSavings: string;
  };
  calculationSteps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    step6: string;
    step7: string;
    taxpayerSalaryIncome: string;
    spouseSalaryIncome: string;
    salarySpecialDeduction: string;
    salaryNetAmount: string;
    spouseSalaryNet: string;
    totalGrossIncome: string;
    generalExemptionCount: string;
    elderlyExemptionCount: string;
    exemptionSubtotal: string;
    itemizedDeductionChoice: string;
    donationDeduction: string;
    personalInsuranceDeduction: string;
    healthInsuranceDeduction: string;
    medicalDeduction: string;
    disasterDeduction: string;
    mortgageDeduction: string;
    generalDeductionSubtotal: string;
    singleStandardDeduction: string;
    marriedStandardDeduction: string;
    salarySpecialDeductionNote: string;
    childrenDeduction: string;
    educationDeduction: string;
    disabilityDeduction: string;
    longTermCareDeduction: string;
    savingsDeduction: string;
    rentalDeduction: string;
    specialDeductionSubtotal: string;
    basicLivingExpenseTotal: string;
    basicLivingExpenseDifference: string;
    annualTotalIncome: string;
    totalDeductionsAmount: string;
    separateFilingNote: string;
    taxpayerTaxCalculation: string;
    spouseTaxCalculation: string;
    taxpayerSalaryTaxCalculation: string;
    remainingIncomeTaxCalculation: string;
    applicableTaxBracket: string;
    taxRate: string;
    subtotal: string;
    progressiveDifference: string;
    taxpayerTaxAmount: string;
    spouseTaxAmount: string;
    taxpayerSalaryTaxAmount: string;
    remainingIncomeTaxAmount: string;
    totalTaxAmount: string;
    combinedFilingDisplay: string;
    calculateSalaryNet: string;
    calculateExemptions: string;
    calculateGeneralDeductions: string;
    calculateSpecialDeductions: string;
    calculateBasicLivingDifference: string;
    calculateNetIncome: string;
    calculateTaxAmount: string;
    salarySpecialDeductionAlreadyCalculated: string;
    generalExemptionPeople: string;
    elderlyExemptionPeople: string;
    chooseItemizedDeduction: string;
    donationDeductionItem: string;
    personalInsuranceDeductionItem: string;
    healthInsuranceDeductionItem: string;
    medicalExpensesItem: string;
    disasterLossItem: string;
    mortgageInterestItem: string;
    childrenDeductionItem: string;
    educationDeductionItem: string;
    disabilityDeductionItem: string;
    longTermCareDeductionItem: string;
    savingsDeductionItem: string;
    rentalDeductionItem: string;
    basicLivingExpenseTotalCalc: string;
    minusExemptionsAndDeductions: string;
    multiplyTaxRate: string;
    minusProgressiveDifference: string;
    people: string;
    deductionSummary: string;
    exemptions: string;
    generalDeductions: string;
    specialDeductions: string;
    basicLivingExpenseDiff: string;
    totalDeductions: string;
    minus: string;
    stepNumber: string;
  };
  deductionDetails: {
    exemptions: string;
    generalExemption: string;
    elderlyExemption: string;
    applicableConditions: string;
    specialDeductionDetails: string;
    conditions: string;
  };
  taxBrackets: {
    progressiveDifference: string;
    yourApplicableBracket: string;
    above: string;
    netIncomeRange: string;
    taxRate: string;
  };
  itemizedDeductionDetails: {
    description: string;
    limit: string;
    description2: string;
    example: string;
    conditions: string;
    requiredDocuments: string;
  };
  importantNotes: {
    calculatorReference: string;
    documentReminder: string;
    professionalAdvice: string;
    wealthRestrictions: string;
    basicLivingProtection: string;
    disclaimerTitle: string;
    documentReminderTitle: string;
    professionalAdviceTitle: string;
    basicLivingProtectionTitle: string;
  };
  emptyState: {
    title: string;
    description: string;
  };
  common: {
    people: string;
    ntd: string;
    minus: string;
    multiply: string;
    percent: string;
    total: string;
    subtotal: string;
    amount: string;
    rate: string;
    description: string;
    example: string;
    conditions: string;
    limit: string;
    unlimited: string;
    perPerson: string;
    perHousehold: string;
    annually: string;
    yuan: string;
    tenThousandYuan: string;
    annualSalary: string;
    averageMonthlyIncome: string;
    averageMonthlySalary: string;
    annualIncome: string;
  };
  taxReforms: {
    before: string;
    after: string;
    impact: string;
  };
  labels: {
    info: string;
    spouseInfo: string;
    taxCalculationMethodPost2018: string;
    childrenUnder6New2025: string;
    elderlyOver70Count: string;
    generalDependentsCount: string;
    collegeStudentsCount: string;
    disabledCount: string;
    longTermCareCount: string;
    rentalExpensesNew2025: string;
    savingsInterestIncome: string;
    itemizedDeductionDetails: string;
    itemizedDeductionReminder: string;
    donationAmount: string;
    personalInsuranceNonNHI: string;
    nationalHealthInsurance: string;
    medicalAndBirthExpenses: string;
    disasterLosses: string;
    mortgageInterestSelfUse: string;
    excludedFromItemizedDeduction: string;
    separateFilingDetailedInfo: string;
    filingMethodComparisonTitle: string;
    detailedCalculationProcess: string;
    taxBracketTable2025: string;
  };
  placeholders: {
    salaryAndBonus: string;
    interestDividendRent: string;
    spouseSalaryAndBonus: string;
    spouseOtherIncome: string;
    bornAfter2018: string;
    elderlyOver70: string;
    dependents6to70: string;
    collegeStudents: string;
    disabledPersons: string;
    longTermCareNeeds: string;
    rentalExpensesForSelfUse: string;
    bankDepositInterest: string;
    donationsToLegalOrgs: string;
    personalInsuranceExcludingNHI: string;
    totalNHIPremiums: string;
    legalHospitalMedicalFees: string;
    forceDisasterLosses: string;
    selfUseMortgageInterest: string;
  };
  descriptions: {
    salaryIncomeIncluding: string;
    otherIncomeIncluding: string;
    elderlyHigherExemption: string;
    generalExemptionAmount: string;
    educationFeeDeduction: string;
    disabilityDeduction: string;
    longTermCareDeduction: string;
    rentalMajorReform2025: string;
    savingsInterestLimit: string;
    standardDeductionAmounts: string;
    includesSpouseSalary: string;
    otherIncome: string;
  };
}

const enUS: I18nTexts = {
  title: "2025 Taiwan Income Tax Calculator",
  description: "Calculate Taiwan individual income tax instantly with real-time results and detailed breakdown",
  features: {
    realTimeCalculation: "Real-time calculation",
    detailedDeductions: "Detailed deductions",
    completeFormula: "Complete formula",
    taxSavingTips: "Tax saving tips",
    autoSave: "Auto save"
  },
  buttons: {
    clearAllData: "Clear All Data",
    changeLanguage: "Language"
  },
  cardTitles: {
    majorTaxReforms2025: "Major Tax Reforms 2025",
    taxFreeThresholds: "Tax-Free Thresholds Quick Reference",
    basicInfo: "Basic Information",
    dependents: "Dependents",
    deductionChoice: "Deduction Selection",
    specialDeductions: "Special Deductions",
    calculationResults: "Tax Calculation Results",
    separateFilingDetails: "Separate Filing Details",
    filingMethodComparison: "Filing Method Comparison",
    completeCalculationFormula: "Complete Calculation Process",
    deductionDetails: "Deduction Details",
    taxBrackets2025: "2025 Tax Brackets",
    itemizedDeductionDetails: "Itemized Deduction Details",
    taxSavingTips: "Tax Saving Tips",
    importantNotes: "Important Notes & Disclaimer"
  },
  basicInfo: {
    salaryIncome: "Annual Salary Income (NT$)",
    salaryPlaceholder: "Enter annual salary income",
    salaryDescription: "Including: salary, bonuses, year-end bonuses, etc.",
    otherIncome: "Other Annual Income (NT$)",
    otherPlaceholder: "Enter other income",
    otherDescription: "Including: interest, dividends, rental income, etc.",
    married: "Married",
    spouseInfo: "Spouse Information",
    spouseSalaryIncome: "Spouse Annual Salary (NT$)",
    spouseSalaryPlaceholder: "Enter spouse salary",
    spouseOtherIncome: "Spouse Other Income (NT$)",
    spouseOtherPlaceholder: "Enter spouse other income",
    taxCalculationMethod: "Tax Calculation Method",
    combinedFiling: "Joint Filing",
    salarySeparate: "Salary Separate",
    allSeparate: "Completely Separate",
    autoSelect: "Auto Select (Best)",
    eTaxDescription: "Choose the most tax-efficient filing method"
  },
  dependents: {
    description: "Enter number of dependents to calculate exemptions and special deductions",
    childrenUnder6: "Children Under 6 (🎯2025 New)",
    childrenPlaceholder: "Number of children",
    childrenDescription: "Born in 2018 or later, eligible for preschool deduction",
    elderlyOver70: "Elderly Over 70",
    elderlyPlaceholder: "Number of elderly",
    elderlyDescription: "Direct ascendants aged 70+, higher exemption NT$145,500",
    generalDependents: "General Dependents",
    generalPlaceholder: "Number of dependents",
    generalDescription: "Dependents aged 6-70, general exemption NT$97,000",
    students: "College Students",
    studentsPlaceholder: "Number of students",
    studentsDescription: "College students, education fee deduction NT$25,000 per person",
    disabled: "Disabled Persons",
    disabledPlaceholder: "Number of disabled",
    disabledDescription: "Disability certificate holders, deduction NT$218,000 per person",
    longTermCare: "Long-term Care Recipients",
    longTermCarePlaceholder: "Number requiring care",
    longTermCareDescription: "Qualifying for long-term care, deduction NT$120,000 per person",
    longTermCareWarning: "Subject to income restrictions"
  },
  deductionChoice: {
    description: "Choose between standard deduction or itemized deduction (whichever is higher will be used)",
    useItemizedDeduction: "Use Itemized Deduction",
    standardDeductionNote: "Standard Deduction: Single NT$131,000, Married NT$262,000",
    itemizedDeductionDetails: "Itemized Deduction Details",
    itemizedDeductionReminder: "💡 Reminder: Itemized deductions require receipts. Documents already with tax authority need not be submitted.",
    donations: "1. Donations (NT$)",
    donationsPlaceholder: "Enter donation amount",
    donationsConditions: [
      "Limited to 20% of total income for general donations",
      "No limit for government, defense, cultural heritage donations",
      "Donations to political parties or candidates limited to NT$200,000 or 20% of income"
    ],
    personalInsurance: "2a. Personal Insurance (Non-NHI) (NT$)",
    personalInsurancePlaceholder: "Enter insurance premiums",
    personalInsuranceConditions: [
      "Life, accident, annuity insurance premiums",
      "Limited to NT$24,000 per person annually",
      "Must be for taxpayer, spouse, or dependents"
    ],
    healthInsurance: "2b. National Health Insurance (NT$)",
    healthInsurancePlaceholder: "Enter NHI premiums",
    healthInsuranceConditions: [
      "No amount limit, fully deductible",
      "Include all NHI premiums paid"
    ],
    medicalExpenses: "3. Medical & Birth Expenses (NT$)",
    medicalPlaceholder: "Enter medical expenses",
    medicalConditions: [
      "No amount limit, actual expenses",
      "Must be from qualified hospitals",
      "Include medical equipment purchases"
    ],
    disasterLoss: "4. Disaster Losses (NT$)",
    disasterPlaceholder: "Enter disaster losses",
    disasterConditions: [
      "Force majeure disasters only",
      "No amount limit",
      "Must deduct insurance compensation received"
    ],
    mortgageInterest: "5. Self-use Housing Loan Interest (NT$)",
    mortgagePlaceholder: "Enter mortgage interest",
    mortgageConditions: [
      "Limited to NT$300,000 per household",
      "⚠️ Important: Must deduct savings investment deduction first",
      "Self-use housing only, no rental property"
    ],
    excludedItems: "❌ Items NOT eligible for itemized deduction:",
    excludedItemsList: [
      "Supplementary health insurance premiums",
      "Fines and penalties",
      "Non-medical cosmetic procedures",
      "Investment losses"
    ]
  },
  specialDeductions: {
    description: "Special deductions (automatically applied, separate from general deductions)",
    rentalExpenses: "Housing Rental Expenses (🎯2025 New)",
    rentalPlaceholder: "Enter annual rental expenses",
    rentalDescription: "2025 major reform: Changed from itemized to special deduction, limited to NT$180,000 per household",
    savingsInterest: "Savings Interest Income (NT$)",
    savingsPlaceholder: "Enter interest income",
    savingsDescription: "Limited to NT$270,000 per household, excess taxed as general income"
  },
  calculationResults: {
    taxAmount: "Tax Payable",
    effectiveTaxRate: "Effective Tax Rate",
    afterTaxIncome: "After-tax Income",
    applicableTaxBracket: "Applicable Tax Bracket",
    separateFilingDescription: "Separate filing: Each spouse applies different tax brackets",
    taxpayer: "Taxpayer",
    spouse: "Spouse",
    grossIncome: "Gross Income",
    totalDeductions: "Total Deductions",
    netIncome: "Net Income",
    applicableTaxRate: "Applicable Tax Rate",
    taxpayerSalaryPortion: "Taxpayer Salary Portion",
    remainingPortion: "Remaining Portion",
    taxpayerSalaryNet: "Taxpayer Salary Net",
    taxpayerExemption: "Taxpayer Exemption",
    taxableNetAmount: "Taxable Net Amount",
    remainingIncomeTotal: "Remaining Income Total",
    remainingIncomeNet: "Remaining Income Net",
    spouseSalaryIncluded: "Including spouse salary",
    separateFilingTotal: "Separate Filing Total",
    salarySeperateTotal: "Salary Separate Total",
    calculationFormula: "Calculation Formula",
    taxpayerSalary: "Taxpayer Salary",
    remainingIncome: "Remaining Income",
    minusDeductionsTotal: "Minus Total Deductions",
    salaryTaxableNet: "Salary Taxable Net",
    taxpayerSalaryTaxAmount: "Taxpayer Salary Tax",
    remainingIncomeTaxAmount: "Remaining Income Tax",
    separateFilingTotalLabel: "Separate Filing Total",
    salarySeperateTotalLabel: "Salary Separate Total",
    calculationFormulaLabel: "Calculation Formula",
    bestChoice: "Best Choice",
    savingsMessage: "You save",
    totalIncome: "Total Income",
    effectiveTaxRateFormula: "Tax Payable ÷ Total Income",
    afterTaxIncomeFormula: "Total Income - Tax Payable"
  },
  filingMethodComparison: {
    description: "System automatically compares three filing methods and selects the one with lowest tax burden",
    taxAmount: "Tax Amount",
    bestChoice: "Best Choice",
    savingsMessage: "Tax Savings",
    taxSavings: "Save"
  },
  calculationSteps: {
    step1: "Step 1: Calculate Salary Net Amount",
    step2: "Step 2: Calculate Exemptions",
    step3: "Step 3: Calculate General Deductions",
    step4: "Step 4: Calculate Special Deductions",
    step5: "Step 5: Basic Living Expense Difference",
    step6: "Step 6: Calculate Comprehensive Income Net Amount",
    step7: "Step 7: Calculate Tax Payable",
    taxpayerSalaryIncome: "Taxpayer salary income",
    spouseSalaryIncome: "Spouse salary income",
    salarySpecialDeduction: "Salary special deduction",
    salaryNetAmount: "Salary net amount",
    spouseSalaryNet: "Spouse salary net",
    totalGrossIncome: "Total gross income",
    generalExemptionCount: "General exemption count",
    elderlyExemptionCount: "Elderly exemption count",
    exemptionSubtotal: "Exemption subtotal",
    itemizedDeductionChoice: "Itemized deduction choice",
    donationDeduction: "Donation deduction",
    personalInsuranceDeduction: "Personal insurance deduction",
    healthInsuranceDeduction: "Health insurance deduction",
    medicalDeduction: "Medical deduction",
    disasterDeduction: "Disaster deduction",
    mortgageDeduction: "Mortgage deduction",
    generalDeductionSubtotal: "General deduction subtotal",
    singleStandardDeduction: "Single standard deduction",
    marriedStandardDeduction: "Married standard deduction",
    salarySpecialDeductionNote: "Note: Salary special deduction calculated in Step 1",
    childrenDeduction: "Children deduction",
    educationDeduction: "Education deduction",
    disabilityDeduction: "Disability deduction",
    longTermCareDeduction: "Long-term care deduction",
    savingsDeduction: "Savings deduction",
    rentalDeduction: "Rental deduction",
    specialDeductionSubtotal: "Special deduction subtotal",
    basicLivingExpenseTotal: "Basic living expense total",
    basicLivingExpenseDifference: "Basic living expense difference",
    annualTotalIncome: "Annual total income",
    totalDeductionsAmount: "Total deductions amount",
    separateFilingNote: "Separate filing: Each applies different tax brackets",
    taxpayerTaxCalculation: "Taxpayer tax calculation",
    spouseTaxCalculation: "Spouse tax calculation",
    taxpayerSalaryTaxCalculation: "Taxpayer salary tax calculation",
    remainingIncomeTaxCalculation: "Remaining income tax calculation",
    applicableTaxBracket: "Applicable tax bracket",
    taxRate: "Tax rate",
    subtotal: "Subtotal",
    progressiveDifference: "Progressive difference",
    taxpayerTaxAmount: "Taxpayer tax amount",
    spouseTaxAmount: "Spouse tax amount",
    taxpayerSalaryTaxAmount: "Taxpayer salary tax amount",
    remainingIncomeTaxAmount: "Remaining income tax amount",
    totalTaxAmount: "Total tax amount",
    combinedFilingDisplay: "Combined filing display",
    calculateSalaryNet: "Calculate salary net (salary income minus salary special deduction)",
    calculateExemptions: "Calculate exemptions",
    calculateGeneralDeductions: "Calculate general deductions",
    calculateSpecialDeductions: "Calculate special deductions",
    calculateBasicLivingDifference: "Basic living expense difference",
    calculateNetIncome: "Calculate comprehensive income net amount",
    calculateTaxAmount: "Calculate tax payable",
    salarySpecialDeductionAlreadyCalculated: "Note: Salary special deduction calculated in Step 1",
    generalExemptionPeople: "General exemption people",
    elderlyExemptionPeople: "Elderly exemption people (70+)",
    chooseItemizedDeduction: "Choose itemized deduction:",
    donationDeductionItem: "• Donation deduction",
    personalInsuranceDeductionItem: "• Personal insurance (non-NHI)",
    healthInsuranceDeductionItem: "• National health insurance",
    medicalExpensesItem: "• Medical expenses",
    disasterLossItem: "• Disaster losses",
    mortgageInterestItem: "• Mortgage interest",
    childrenDeductionItem: "• Preschool children deduction",
    educationDeductionItem: "• Education fee deduction",
    disabilityDeductionItem: "• Disability deduction",
    longTermCareDeductionItem: "• Long-term care deduction",
    savingsDeductionItem: "• Savings investment deduction",
    rentalDeductionItem: "• Housing rental deduction",
    basicLivingExpenseTotalCalc: "Basic living expense total",
    minusExemptionsAndDeductions: "Minus: Exemptions + Deductions total",
    multiplyTaxRate: "× Tax rate",
    minusProgressiveDifference: "Minus: Progressive difference",
    people: "people",
    deductionSummary: "Deduction Summary",
    exemptions: "Exemptions",
    generalDeductions: "General Deductions",
    specialDeductions: "Special Deductions",
    basicLivingExpenseDiff: "Basic Living Expense Diff",
    totalDeductions: "Total Deductions",
    minus: "Minus:",
    stepNumber: "Step"
  },
  deductionDetails: {
    exemptions: "Exemptions",
    generalExemption: "General exemption: NT$97,000 per person",
    elderlyExemption: "Elderly (70+) exemption: NT$145,500 per person",
    applicableConditions: "Applicable conditions:",
    specialDeductionDetails: "Special Deduction Details",
    conditions: "Conditions:"
  },
  taxBrackets: {
    progressiveDifference: "Progressive Difference",
    yourApplicableBracket: "← Your Applicable Bracket",
    above: "and above",
    netIncomeRange: "Comprehensive Income Net Amount",
    taxRate: "Tax Rate"
  },
  itemizedDeductionDetails: {
    description: "Requires supporting documents, choose between this and standard deduction",
    limit: "Limit:",
    description2: "Description:",
    example: "Example:",
    conditions: "Conditions:",
    requiredDocuments: "Required documents:"
  },
  importantNotes: {
    calculatorReference: "• This calculator is for reference only. Actual tax calculation should follow Ministry of Finance announcements",
    documentReminder: "• Itemized deductions require supporting documents. Keep receipts properly",
    professionalAdvice: "• Recommend consulting professional tax advisors before official filing",
    wealthRestrictions: "• Income restrictions: Long-term care and housing rental deductions have income limits",
    basicLivingProtection: "• Basic living expense protection ensures basic living needs are not taxed",
    disclaimerTitle: "⚠️ Disclaimer",
    documentReminderTitle: "📋 Document Reminder",
    professionalAdviceTitle: "💡 Professional Advice",
    basicLivingProtectionTitle: "🛡️ Basic Living Protection"
  },
  emptyState: {
    title: "Enter annual income to start calculation",
    description: "System will automatically calculate tax amount and detailed deductions"
  },
  common: {
    people: "people",
    ntd: "NT$",
    minus: "Minus:",
    multiply: "×",
    percent: "%",
    total: "Total",
    subtotal: "Subtotal",
    amount: "Amount",
    rate: "Rate",
    description: "Description",
    example: "Example",
    conditions: "Conditions",
    limit: "Limit",
    unlimited: "No limit",
    perPerson: "per person",
    perHousehold: "per household",
    annually: "annually",
    yuan: "yuan",
    tenThousandYuan: "ten thousand yuan",
    annualSalary: "Annual Salary",
    averageMonthlyIncome: "Average Monthly Income",
    averageMonthlySalary: "Average Monthly Salary",
    annualIncome: "Annual Income"
  },
  taxReforms: {
    before: "Before",
    after: "After",
    impact: "Impact"
  },
  labels: {
    info: "Information",
    spouseInfo: "Spouse Information",
    taxCalculationMethodPost2018: "Tax Calculation Method (Post-2018 reform)",
    childrenUnder6New2025: "Children Under 6 Count (🎯2025 New)",
    elderlyOver70Count: "Elderly Over 70 Count",
    generalDependentsCount: "General Dependents Count",
    collegeStudentsCount: "College Students Count",
    disabledCount: "Disabled Count",
    longTermCareCount: "Long-term Care Count",
    rentalExpensesNew2025: "Housing Rental Expenses (NT$) (🎯2025 New)",
    savingsInterestIncome: "Savings Interest Income (NT$)",
    itemizedDeductionDetails: "Itemized Deduction Details",
    itemizedDeductionReminder: "💡 Reminder: Itemized deductions require receipts. Documents already with tax authority need not be submitted",
    donationAmount: "1. Donation Amount (NT$)",
    personalInsuranceNonNHI: "2a. Personal Insurance (Non-NHI) (NT$)",
    nationalHealthInsurance: "2b. National Health Insurance (NT$)",
    medicalAndBirthExpenses: "3. Medical & Birth Expenses (NT$)",
    disasterLosses: "4. Disaster Losses (NT$)",
    mortgageInterestSelfUse: "5. Self-use Housing Loan Interest (NT$)",
    excludedFromItemizedDeduction: "❌ Items NOT eligible for itemized deduction:",
    separateFilingDetailedInfo: "Separate Filing Detailed Information",
    filingMethodComparisonTitle: "Filing Method Comparison",
    detailedCalculationProcess: "Detailed Calculation Process",
    taxBracketTable2025: "2025 Tax Bracket Table"
  },
  placeholders: {
    salaryAndBonus: "Salary, bonuses and other employment income",
    interestDividendRent: "Interest, dividends, rent and other income",
    spouseSalaryAndBonus: "Spouse salary, bonuses and other employment income",
    spouseOtherIncome: "Spouse other income",
    bornAfter2018: "Born in 2018 or later",
    elderlyOver70: "Direct ascendants aged 70 or above",
    dependents6to70: "Dependents aged 6-70",
    collegeStudents: "College or above students",
    disabledPersons: "Persons with disability certificates",
    longTermCareNeeds: "Persons qualifying for long-term care",
    rentalExpensesForSelfUse: "Annual rental expenses for self-use",
    bankDepositInterest: "Bank deposit interest income",
    donationsToLegalOrgs: "Donations to legal organizations",
    personalInsuranceExcludingNHI: "Personal insurance premiums (excluding NHI)",
    totalNHIPremiums: "Total national health insurance premiums",
    legalHospitalMedicalFees: "Medical fees from qualified hospitals",
    forceDisasterLosses: "Force majeure disaster losses",
    selfUseMortgageInterest: "Self-use housing mortgage interest"
  },
  descriptions: {
    salaryIncomeIncluding: "Including: salary, bonuses, year-end bonuses and other employment income",
    otherIncomeIncluding: "Including: interest income, dividend income, rental income, other income etc.",
    elderlyHigherExemption: "Eligible for higher exemption NT$145,500 (general is NT$97,000)",
    generalExemptionAmount: "Eligible for general exemption NT$97,000",
    educationFeeDeduction: "Each person eligible for education fee special deduction NT$25,000",
    disabilityDeduction: "Each person eligible for disability special deduction NT$218,000",
    longTermCareDeduction: "Each person eligible for long-term care special deduction NT$120,000",
    rentalMajorReform2025: "2025 major reform: Changed from itemized to special deduction, limited to NT$180,000 per household",
    savingsInterestLimit: "Limited to NT$270,000 per household, excess taxed as general income",
    standardDeductionAmounts: "Standard deduction: Single NT$131,000, Married NT$262,000",
    includesSpouseSalary: "Including: spouse salary",
    otherIncome: "+ Other income"
  }
};

export default enUS;