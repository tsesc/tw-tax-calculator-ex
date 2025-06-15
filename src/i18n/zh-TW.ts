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

export const zhTW: I18nTexts = {
  title: "台灣綜合所得稅計算器 2025",
  description: "基於2025年最新稅制規則，動態計算稅務並提供完整扣除額說明",

  features: {
    realTimeCalculation: "即時動態計算",
    detailedDeductions: "詳細扣除額分項",
    completeFormula: "完整公式說明",
    taxSavingTips: "節稅建議",
    autoSave: "自動保存輸入"
  },

  buttons: {
    clearAllData: "清除所有輸入資料"
  },

  cardTitles: {
    majorTaxReforms2025: "🎯 2025年重大稅制變革",
    taxFreeThresholds: "💡 免稅門檻快速查詢",
    basicInfo: "基本資訊",
    dependents: "扶養親屬",
    deductionChoice: "扣除額選擇",
    specialDeductions: "特別扣除額",
    calculationResults: "計算結果",
    separateFilingDetails: "分開計稅詳細資訊",
    filingMethodComparison: "計稅方式比較",
    completeCalculationFormula: "完整計算公式",
    deductionDetails: "扣除額詳細說明",
    taxBrackets2025: "2025年稅率級距表",
    itemizedDeductionDetails: "列舉扣除額詳細說明",
    taxSavingTips: "💰 節稅建議",
    importantNotes: "⚠️ 注意事項"
  },

  basicInfo: {
    salaryIncome: "薪資收入 (NT$)",
    salaryPlaceholder: "薪資、獎金等所得",
    salaryDescription: "包含：薪資、獎金、年終獎金等薪資所得",
    otherIncome: "其他收入 (NT$)",
    otherPlaceholder: "利息、股利、租金等其他所得",
    otherDescription: "包含：利息所得、股利所得、租賃所得、其他所得等",
    married: "已婚",
    spouseInfo: "配偶資訊",
    spouseSalaryIncome: "配偶薪資收入 (NT$)",
    spouseSalaryPlaceholder: "配偶薪資、獎金等所得",
    spouseOtherIncome: "配偶其他收入 (NT$)",
    spouseOtherPlaceholder: "配偶其他所得",
    taxCalculationMethod: "計稅方式 (2018年修法後)",
    combinedFiling: "全部合併計稅 (傳統方式)",
    salarySeparate: "薪資分開計稅，其他合併",
    allSeparate: "各類所得都分開計稅 (最常見)",
    autoSelect: "🤖 自動選擇最省稅方式",
    eTaxDescription: "eTax系統會自動計算三種方式，選擇稅負最低的那種"
  },

  dependents: {
    description: "每位扶養親屬可享有免稅額，特定條件另有特別扣除額",
    childrenUnder6: "6歲以下子女人數 (🎯2025年新制)",
    childrenPlaceholder: "民國107年(含)以後出生",
    childrenDescription: "2025年新制：第1名15萬元，第2名起22.5萬元，已取消排富規定",
    elderlyOver70: "70歲以上長輩人數",
    elderlyPlaceholder: "年滿70歲之直系尊親屬",
    elderlyDescription: "享有較高免稅額145,500元(一般為97,000元)",
    generalDependents: "一般扶養親屬人數",
    generalPlaceholder: "6歲以上70歲以下扶養親屬",
    generalDescription: "享有一般免稅額97,000元",
    students: "大專院校學生人數",
    studentsPlaceholder: "大專以上在學子女",
    studentsDescription: "每人可享教育學費特別扣除額25,000元",
    disabled: "身心障礙人數",
    disabledPlaceholder: "持有身心障礙證明者",
    disabledDescription: "每人可享身心障礙特別扣除額218,000元",
    longTermCare: "長期照顧需求人數",
    longTermCarePlaceholder: "符合長期照顧需求者",
    longTermCareDescription: "每人可享長期照顧特別扣除額120,000元",
    longTermCareWarning: "⚠️ 有排富規定：適用稅率20%以上不適用"
  },

  deductionChoice: {
    description: "可選擇標準扣除額或列舉扣除額，系統會自動選擇對您最有利的方案",
    useItemizedDeduction: "使用列舉扣除額 (需檢附證明文件)",
    standardDeductionNote: "標準扣除額：單身131,000元、夫妻262,000元",
    itemizedDeductionDetails: "列舉扣除額明細",
    itemizedDeductionReminder: "💡 提醒：列舉扣除額需檢附收據證明，國稅局有資料者免附",

    donations: "1. 捐贈金額 (NT$)",
    donationsPlaceholder: "對合法團體之捐贈",
    donationsConditions: [
      "• 教育、文化、公益、慈善機構：限所得總額20%",
      "• 政府、國防、勞軍、古蹟維護：無金額限制",
      "• 政治獻金：限所得總額20%，最高20萬元",
      "• 需檢附：受贈單位收據正本"
    ],

    personalInsurance: "2a. 人身保險費 (非健保) (NT$)",
    personalInsurancePlaceholder: "人身保險費（不含健保費）",
    personalInsuranceConditions: [
      "• 人身保險費：每人限24,000元（壽險、傷害險、年金險等）",
      "• 勞保、國民年金、軍公教保險：每人限24,000元",
      "• 要保人與被保人需在同一申報戶",
      "• 需檢附：保險費收據正本或繳費證明"
    ],

    healthInsurance: "2b. 全民健保費 (NT$)",
    healthInsurancePlaceholder: "全民健保費總額",
    healthInsuranceConditions: [
      "• 全民健保費：無金額限制，可全額扣除",
      "• 包含：一般保費、補充保費",
      "• 不限要保人與被保人關係",
      "• 需檢附：健保費繳費證明或收據"
    ],

    medicalExpenses: "3. 醫療及生育費用 (NT$)",
    medicalPlaceholder: "合法醫院之醫療費用",
    medicalConditions: [
      "• 核實認列，無金額限制",
      "• 限公立醫院、健保特約醫院或診所",
      "• 包含長照治療費用",
      "• 保險理賠部分不可列入",
      "• 需檢附：醫院開立的收據正本"
    ],

    disasterLoss: "4. 災害損失 (NT$)",
    disasterPlaceholder: "不可抗力災害損失",
    disasterConditions: [
      "• 核實認列，無金額限制",
      "• 限不可抗力災害（天災等）",
      "• 保險理賠、救濟金部分不可列入",
      "• 需檢附：國稅局核發的證明文件"
    ],

    mortgageInterest: "5. 自用住宅購屋借款利息 (NT$)",
    mortgagePlaceholder: "自用住宅購屋借款利息",
    mortgageConditions: [
      "• 每戶限30萬元，限一屋",
      "• 需完成戶籍登記且未出租、營業",
      "• 需先扣除儲蓄投資特別扣除額",
      "• 需檢附：金融機構利息單據正本"
    ],

    excludedItems: "❌ 不可列入列舉扣除額的項目：",
    excludedItemsList: [
      "• 醫美整形費用",
      "• 已獲保險理賠的醫療費",
      "• 看護費用",
      "• 月子中心費用",
      "• 非人身保險費（如財產險）",
      "• 未經核准在台銷售的境外保單"
    ]
  },

  specialDeductions: {
    description: "符合條件可同時適用多項特別扣除額",
    rentalExpenses: "房屋租金支出 (NT$) (🎯2025年新制)",
    rentalPlaceholder: "租屋自住年支出",
    rentalDescription: "2025年重大變革：從列舉扣除改為特別扣除，每戶限180,000元",
    savingsInterest: "儲蓄投資利息 (NT$)",
    savingsPlaceholder: "銀行存款利息收入",
    savingsDescription: "每戶限270,000元，超過部分按一般所得課稅"
  },

  calculationResults: {
    taxAmount: "應納稅額",
    effectiveTaxRate: "有效稅率",
    afterTaxIncome: "稅後淨收入",
    applicableTaxBracket: "適用稅率級距",
    separateFilingDescription: "各自適用不同稅率級距，分別計算稅額",
    taxpayer: "納稅人",
    spouse: "配偶",
    grossIncome: "綜合所得總額",
    totalDeductions: "扣除額總計",
    netIncome: "綜合所得淨額",
    applicableTaxRate: "適用稅率",
    taxpayerSalaryPortion: "本人薪資所得（分開計稅）",
    remainingPortion: "剩餘所得（合併計稅）",
    taxpayerSalaryNet: "本人薪資所得淨額",
    taxpayerExemption: "本人免稅額",
    taxableNetAmount: "薪資應稅淨額",
    remainingIncomeTotal: "剩餘所得總額",
    remainingIncomeNet: "剩餘所得淨額",
    spouseSalaryIncluded: "包括：配偶薪資",
    separateFilingTotal: "分開計稅總計",
    salarySeperateTotal: "薪資分開計稅總計",
    calculationFormula: "計算公式",
    taxpayerSalary: "本人薪資",
    remainingIncome: "剩餘所得",
    minusDeductionsTotal: "減：扣除額總計",
    salaryTaxableNet: "薪資應稅淨額",
    taxpayerSalaryTaxAmount: "本人薪資應納稅額",
    remainingIncomeTaxAmount: "剩餘所得應納稅額",
    separateFilingTotalLabel: "分開計稅總計",
    salarySeperateTotalLabel: "薪資分開計稅總計",
    calculationFormulaLabel: "計算公式",
    bestChoice: "✓ 最優選擇",
    savingsMessage: "💰 相比傳統合併申報，您節省了"
  },

  filingMethodComparison: {
    description: "系統自動選擇稅負最低的計稅方式",
    taxAmount: "稅額",
    bestChoice: "✓ 最優選擇",
    savingsMessage: "💰 相比傳統合併申報，您節省了",
    taxSavings: "的稅款"
  },

  calculationSteps: {
    step1: "步驟1：計算薪資淨額（薪資所得扣除薪資特別扣除額）",
    step2: "步驟2：計算免稅額",
    step3: "步驟3：計算一般扣除額",
    step4: "步驟4：計算特別扣除額",
    step5: "步驟5：基本生活費差額",
    step6: "步驟6：計算綜合所得淨額",
    step7: "步驟7：計算應納稅額",

    taxpayerSalaryIncome: "納稅人薪資所得",
    spouseSalaryIncome: "配偶薪資所得",
    salarySpecialDeduction: "薪資特別扣除額",
    salaryNetAmount: "薪資淨額",
    spouseSalaryNet: "配偶薪資淨額",
    totalGrossIncome: "綜合所得總額",

    generalExemptionCount: "一般免稅額人數",
    elderlyExemptionCount: "70歲以上免稅額人數",
    exemptionSubtotal: "免稅額小計",

    itemizedDeductionChoice: "選擇列舉扣除額：",
    donationDeduction: "捐贈扣除額",
    personalInsuranceDeduction: "人身保險費（非健保）",
    healthInsuranceDeduction: "全民健保費",
    medicalDeduction: "醫療費用",
    disasterDeduction: "災害損失",
    mortgageDeduction: "房貸利息",
    generalDeductionSubtotal: "一般扣除額小計",
    singleStandardDeduction: "單身標準扣除額",
    marriedStandardDeduction: "夫妻標準扣除額",

    salarySpecialDeductionNote: "注：薪資特別扣除額已在步驟1計算",
    childrenDeduction: "幼兒學前扣除額",
    educationDeduction: "教育學費扣除額",
    disabilityDeduction: "身心障礙扣除額",
    longTermCareDeduction: "長期照顧扣除額",
    savingsDeduction: "儲蓄投資扣除額",
    rentalDeduction: "房屋租金扣除額",
    specialDeductionSubtotal: "特別扣除額小計",

    basicLivingExpenseTotal: "基本生活費總額",
    basicLivingExpenseDifference: "基本生活費差額",

    annualTotalIncome: "年總收入",
    totalDeductionsAmount: "扣除額總計",

    separateFilingNote: "分開計稅：各自適用不同稅率級距",
    taxpayerTaxCalculation: "納稅人稅額計算",
    spouseTaxCalculation: "配偶稅額計算",
    taxpayerSalaryTaxCalculation: "本人薪資稅額計算",
    remainingIncomeTaxCalculation: "剩餘所得稅額計算",
    applicableTaxBracket: "適用稅率級距",
    taxRate: "稅率",
    subtotal: "小計",
    progressiveDifference: "累進差額",
    taxpayerTaxAmount: "納稅人應納稅額",
    spouseTaxAmount: "配偶應納稅額",
    taxpayerSalaryTaxAmount: "本人薪資應納稅額",
    remainingIncomeTaxAmount: "剩餘所得應納稅額",
    totalTaxAmount: "應納稅額總計",
    combinedFilingDisplay: "合併計稅顯示",
    calculateSalaryNet: "計算薪資淨額（薪資所得扣除薪資特別扣除額）",
    calculateExemptions: "計算免稅額",
    calculateGeneralDeductions: "計算一般扣除額",
    calculateSpecialDeductions: "計算特別扣除額",
    calculateBasicLivingDifference: "基本生活費差額",
    calculateNetIncome: "計算綜合所得淨額",
    calculateTaxAmount: "計算應納稅額",
    salarySpecialDeductionAlreadyCalculated: "注：薪資特別扣除額已在步驟1計算",
    generalExemptionPeople: "一般免稅額人數",
    elderlyExemptionPeople: "70歲以上免稅額人數",
    chooseItemizedDeduction: "選擇列舉扣除額：",
    donationDeductionItem: "• 捐贈扣除額",
    personalInsuranceDeductionItem: "• 人身保險費（非健保）",
    healthInsuranceDeductionItem: "• 全民健保費",
    medicalExpensesItem: "• 醫療費用",
    disasterLossItem: "• 災害損失",
    mortgageInterestItem: "• 房貸利息",
    childrenDeductionItem: "• 幼兒學前扣除額",
    educationDeductionItem: "• 教育學費扣除額",
    disabilityDeductionItem: "• 身心障礙扣除額",
    longTermCareDeductionItem: "• 長期照顧扣除額",
    savingsDeductionItem: "• 儲蓄投資扣除額",
    rentalDeductionItem: "• 房屋租金扣除額",
    basicLivingExpenseTotalCalc: "基本生活費總額",
    minusExemptionsAndDeductions: "減：免稅額+扣除額合計",
    multiplyTaxRate: "× 稅率",
    minusProgressiveDifference: "減：累進差額",
    people: "人",
    deductionSummary: "扣除額總結",
    exemptions: "免稅額",
    generalDeductions: "一般扣除額",
    specialDeductions: "特別扣除額",
    basicLivingExpenseDiff: "基本生活費差額",
    totalDeductions: "扣除額總計",
    minus: "減：",
    stepNumber: "步驟"
  },

  deductionDetails: {
    exemptions: "免稅額",
    generalExemption: "一般免稅額：每人97,000元",
    elderlyExemption: "70歲以上免稅額：每人145,500元",
    applicableConditions: "適用條件：",
    specialDeductionDetails: "特別扣除額明細",
    conditions: "條件："
  },

  taxBrackets: {
    progressiveDifference: "累進差額",
    yourApplicableBracket: "← 您的適用級距",
    above: "以上",
    netIncomeRange: "綜合所得淨額",
    taxRate: "稅率"
  },

  itemizedDeductionDetails: {
    description: "需檢附證明文件，與標準扣除額擇一適用",
    limit: "限額：",
    description2: "說明：",
    example: "例子：",
    conditions: "條件：",
    requiredDocuments: "應備文件："
  },

  importantNotes: {
    calculatorReference: "• 本計算器僅供參考，實際稅額計算請以財政部公告為準",
    documentReminder: "• 列舉扣除額需檢附相關證明文件，請妥善保存收據",
    professionalAdvice: "• 建議在正式申報前諮詢專業稅務人員",
    wealthRestrictions: "• 排富規定：長期照顧及房屋租金扣除額有排富限制",
    basicLivingProtection: "• 基本生活費保障機制確保每人基本生活所需不被課稅",
    disclaimerTitle: "⚠️ 免責聲明",
    documentReminderTitle: "📋 文件提醒",
    professionalAdviceTitle: "💡 專業建議",
    basicLivingProtectionTitle: "🛡️ 基本生活保障"
  },

  emptyState: {
    title: "請輸入年總收入開始計算",
    description: "系統將自動為您計算稅額和詳細扣除額"
  },

  common: {
    people: "人",
    ntd: "NT$",
    minus: "減：",
    multiply: "×",
    percent: "%",
    total: "總計",
    subtotal: "小計",
    amount: "金額",
    rate: "稅率",
    description: "說明",
    example: "例子",
    conditions: "條件",
    limit: "限額",
    unlimited: "無金額限制",
    perPerson: "每人",
    perHousehold: "每戶",
    annually: "每年",
    yuan: "元",
    tenThousandYuan: "萬元"
  },

  taxReforms: {
    before: "修正前",
    after: "修正後",
    impact: "影響"
  },

  labels: {
    info: "資訊",
    spouseInfo: "配偶資訊",
    taxCalculationMethodPost2018: "計稅方式 (2018年修法後)",
    childrenUnder6New2025: "6歲以下子女人數 (🎯2025年新制)",
    elderlyOver70Count: "70歲以上長輩人數",
    generalDependentsCount: "一般扶養親屬人數",
    collegeStudentsCount: "大專院校學生人數",
    disabledCount: "身心障礙人數",
    longTermCareCount: "長期照顧需求人數",
    rentalExpensesNew2025: "房屋租金支出 (NT$) (🎯2025年新制)",
    savingsInterestIncome: "儲蓄投資利息 (NT$)",
    itemizedDeductionDetails: "列舉扣除額明細",
    itemizedDeductionReminder: "💡 提醒：列舉扣除額需檢附收據證明，國稅局有資料者免附",
    donationAmount: "1. 捐贈金額 (NT$)",
    personalInsuranceNonNHI: "2a. 人身保險費 (非健保) (NT$)",
    nationalHealthInsurance: "2b. 全民健保費 (NT$)",
    medicalAndBirthExpenses: "3. 醫療及生育費用 (NT$)",
    disasterLosses: "4. 災害損失 (NT$)",
    mortgageInterestSelfUse: "5. 自用住宅購屋借款利息 (NT$)",
    excludedFromItemizedDeduction: "❌ 不可列入列舉扣除額的項目：",
    separateFilingDetailedInfo: "分開計稅詳細資訊",
    filingMethodComparisonTitle: "計稅方式比較",
    detailedCalculationProcess: "詳細計算過程",
    taxBracketTable2025: "2025年稅率級距表"
  },

  placeholders: {
    salaryAndBonus: "薪資、獎金等所得",
    interestDividendRent: "利息、股利、租金等其他所得",
    spouseSalaryAndBonus: "配偶薪資、獎金等所得",
    spouseOtherIncome: "配偶其他所得",
    bornAfter2018: "民國107年(含)以後出生",
    elderlyOver70: "年滿70歲之直系尊親屬",
    dependents6to70: "6歲以上70歲以下扶養親屬",
    collegeStudents: "大專以上在學子女",
    disabledPersons: "持有身心障礙證明者",
    longTermCareNeeds: "符合長期照顧條件者",
    rentalExpensesForSelfUse: "租屋自住年支出",
    bankDepositInterest: "銀行存款利息收入",
    donationsToLegalOrgs: "對合法團體之捐贈",
    personalInsuranceExcludingNHI: "人身保險費（不含健保費）",
    totalNHIPremiums: "全民健保費總額",
    legalHospitalMedicalFees: "合法醫院之醫療費用",
    forceDisasterLosses: "不可抗力災害損失",
    selfUseMortgageInterest: "自用住宅購屋借款利息"
  },

  descriptions: {
    salaryIncomeIncluding: "包含：薪資、獎金、年終獎金等薪資所得",
    otherIncomeIncluding: "包含：利息所得、股利所得、租賃所得、其他所得等",
    elderlyHigherExemption: "享有較高免稅額145,500元(一般為97,000元)",
    generalExemptionAmount: "享有一般免稅額97,000元",
    educationFeeDeduction: "每人可享教育學費特別扣除額25,000元",
    disabilityDeduction: "每人可享身心障礙特別扣除額218,000元",
    longTermCareDeduction: "每人可享長期照顧特別扣除額120,000元",
    rentalMajorReform2025: "2025年重大變革：從列舉扣除改為特別扣除，每戶限180,000元",
    savingsInterestLimit: "每戶限270,000元，超過部分按一般所得課稅",
    standardDeductionAmounts: "標準扣除額：單身131,000元、夫妻262,000元",
    includesSpouseSalary: "包括：配偶薪資",
    otherIncome: "+ 其他所得"
  }
};

export default zhTW;