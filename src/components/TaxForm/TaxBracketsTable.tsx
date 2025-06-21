import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TAX_BRACKETS } from '../../data/taxRules';
import { formatCurrency } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

interface TaxBracketsTableProps {
  result: any;
  formData: any;
}

const TaxBracketsTable: React.FC<TaxBracketsTableProps> = ({ result, formData }) => {
  const { t } = useLanguage();

  // 计算达到指定税率级距所需的年收入
  const calculateRequiredIncome = (targetRate: number) => {
    if (!result || !result.deductions?.totalDeductions) return 0;

    const targetBracket = TAX_BRACKETS.find(bracket => bracket.rate === targetRate);
    if (!targetBracket) return 0;

    return targetBracket.min + (result.deductions.totalDeductions || 0);
  };

  // 建议收入分配 (针对已婚情况)
  const getSuggestion = (targetRate: number) => {
    if (!formData.isMarried) {
      const suggestedIncome = calculateRequiredIncome(targetRate);
      const currentIncome = result?.grossIncome || 0;
      const difference = suggestedIncome - currentIncome;
      const changePercent = currentIncome > 0 ? Math.abs(difference / currentIncome * 100) : 0;
      const changeSign = difference > 0 ? '+' : '';

      return `${t.taxBrackets.suggestedIncome}：${formatCurrency(Math.max(0, suggestedIncome))} (${changeSign}${changePercent.toFixed(1)}%)`;
    }

    // 已婚情况的建议收入分配
    const targetIncome = calculateRequiredIncome(targetRate);
    const currentTotal = result?.grossIncome || 0;
    const difference = targetIncome - currentTotal;
    const changePercent = currentTotal > 0 ? Math.abs(difference / currentTotal * 100) : 0;
    const changeSign = difference > 0 ? '+' : '';

    if (formData.taxCalculationMethod === 'salary_separate') {
      // 薪资分开计税建议
      const suggestedTaxpayerIncome = targetIncome * 0.6; // 建议比例
      const currentTaxpayerIncome = (parseFloat(formData.salaryIncome) || 0) + (parseFloat(formData.otherIncome) || 0);

      const taxpayerDiff = suggestedTaxpayerIncome - currentTaxpayerIncome;
      const taxpayerPercent = currentTaxpayerIncome > 0 ? Math.abs(taxpayerDiff / currentTaxpayerIncome * 100) : 0;
      const taxpayerSign = taxpayerDiff > 0 ? '+' : '';

      const newTaxpayerTotal = Math.max(0, suggestedTaxpayerIncome);

      return `${t.taxBrackets.suggestedIncome}：${formatCurrency(Math.max(0, newTaxpayerTotal))} (${taxpayerSign}${taxpayerPercent.toFixed(1)}%)`;
    }

    if (formData.taxCalculationMethod === 'all_separate') {
      // 全部分开计税建议
      const newSpouseTotal = targetIncome * 0.5;

      return `${t.taxBrackets.suggestedIncome}：${formatCurrency(Math.max(0, newSpouseTotal))} (${changeSign}${changePercent.toFixed(1)}%)`;
    }

    // 合并计税建议
    const newIncome = Math.max(0, targetIncome);

    return `${t.taxBrackets.suggestedIncome}：${formatCurrency(Math.max(0, newIncome))} (${changeSign}${changePercent.toFixed(1)}%)`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-purple-600">{t.labels.taxBracketTable2025}</CardTitle>
        <div className="text-sm text-gray-600 space-y-1">
          <div>{t.taxBrackets.description}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">{t.taxBrackets.netIncomeRange}</th>
                <th className="text-left p-2">{t.taxBrackets.taxRate}</th>
                <th className="text-left p-2">{t.taxBrackets.progressiveDifference}</th>
                <th className="text-left p-2">{t.taxBrackets.requiredIncome}</th>
                <th className="text-left p-2">{t.taxBrackets.suggestion}</th>
              </tr>
            </thead>
            <tbody>
              {TAX_BRACKETS.map((bracket, index) => {
                const isApplicable = result?.bracketInfo?.rate === bracket.rate;
                const requiredIncome = calculateRequiredIncome(bracket.rate);

                return (
                  <tr
                    key={index}
                    className={`border-b ${
                      isApplicable
                        ? 'bg-purple-50 border-purple-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="p-2">
                      <div className={`${bracket.color} font-medium`}>
                        {(t.taxBrackets as any)?.[bracket.description] || bracket.description}
                      </div>
                    </td>
                    <td className="p-2">
                      <span className={`font-bold ${bracket.color}`}>
                        {bracket.rate}%
                      </span>
                      {isApplicable && (
                        <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                          {t.taxBrackets.yourApplicableBracket}
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-gray-600">
                      {formatCurrency(bracket.progressiveDifference)}
                    </td>
                    <td className="p-2">
                      <span className="font-medium">
                        {formatCurrency(requiredIncome)}
                      </span>
                    </td>
                    <td className="p-2 text-xs text-gray-500">
                      {getSuggestion(bracket.rate)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded">
          <div><strong>{t.taxBrackets.explanationTitle}</strong></div>
          <div>{t.taxBrackets.currentIncome}：{formatCurrency(result?.grossIncome || 0)}，{t.taxBrackets.totalDeductions}：{formatCurrency(result?.deductions?.totalDeductions || 0)}</div>
          <div>• {t.taxBrackets.netIncomeFormula}</div>
          <div>• {t.taxBrackets.taxAmountFormula}</div>
          <div>• {t.taxBrackets.colorCoding}</div>
          <div>• {t.taxBrackets.tableNote}</div>
          <div>• {t.taxBrackets.disclaimer}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxBracketsTable;