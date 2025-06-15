// 税务计算相关类型定义

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  progressiveDifference: number;
  description: string;
}

export interface TaxResult {
  taxAmount: number;
  effectiveRate: number;
  bracketInfo?: TaxBracket;
  netIncome?: number;
  grossIncome?: number;
}

export interface DeductionBreakdown {
  salaryDeduction?: number;
  childrenDeduction: number;
  educationDeduction: number;
  disabilityDeduction: number;
  longTermCareDeduction: number;
  savingsDeduction: number;
  rentalDeduction: number;
}

export interface Deductions {
  exemptions: number;
  generalDeductions: number;
  specialDeductions: number;
  totalDeductions: number;
  basicLivingDifference: number;
  familySize: number;
  breakdown: DeductionBreakdown;
}

export interface SalaryBreakdown {
  taxpayerSalary: number;
  taxpayerSalaryNet: number;
  spouseSalary: number;
  spouseSalaryNet: number;
  totalSalaryDeduction: number;
}

export interface MarriedTaxResult extends TaxResult {
  method: 'combined' | 'salary_separate' | 'all_separate';
  description: string;
  totalTax: number;
  salaryBreakdown?: SalaryBreakdown;
  deductions: Deductions;
  taxpayer?: TaxResult & { deductions: Deductions };
  spouse?: TaxResult & { deductions: Deductions };
  taxpayerSalaryPortion?: TaxResult & { description: string; exemption?: number };
  remainingPortion?: TaxResult & { description: string };
  chosenMethod?: string;
  allMethods?: Record<string, MarriedTaxResult>;
  savingsComparedToCombined?: number;
}

export interface TaxFormData {
  salaryIncome: string;
  otherIncome: string;
  spouseSalaryIncome: string;
  spouseOtherIncome: string;
  isMarried: boolean;
  taxCalculationMethod: 'auto' | 'combined' | 'salary_separate' | 'all_separate';
  childrenUnder6: string;
  dependentsGeneral: string;
  elderlyOver70: string;
  students: string;
  disabled: string;
  rentalExpenses: string;
  savingsInterest: string;
  longTermCare: string;
  useItemizedDeduction: boolean;
  donations: string;
  insurancePremiums: string;
  healthInsurancePremiums: string;
  medicalExpenses: string;
  disasterLoss: string;
  mortgageInterest: string;
}

export interface CalculateAllMarriedMethodsParams {
  taxpayerSalary: number;
  taxpayerOther: number;
  spouseSalary: number;
  spouseOther: number;
  childrenCount: number;
  dependentsCount: number;
  elderlyCount: number;
  studentCount: number;
  disabledCount: number;
  longTermCareCount: number;
  rentalExpenses: number;
  savingsInterest: number;
  useItemizedDeduction: boolean;
  donations: number;
  insurancePremiums: number;
  healthInsurancePremiums: number;
  medicalExpenses: number;
  disasterLoss: number;
  mortgageInterest: number;
}