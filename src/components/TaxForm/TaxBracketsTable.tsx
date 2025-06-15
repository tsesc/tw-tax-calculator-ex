import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TAX_BRACKETS } from '../../data/taxRules';
import { formatCurrency } from '../../utils/formatters';
import { TaxFormData } from '../../types/tax';
import zhTW from '../../i18n/zh-TW';

interface TaxBracketsTableProps {
  result?: any;
  formData?: TaxFormData;
}

const TaxBracketsTable: React.FC<TaxBracketsTableProps> = ({ result, formData }) => {
  // 计算达到指定税率级距所需的年收入
  const calculateRequiredIncome = (targetBracketRate: number): number | null => {
    if (!result || !formData) return null;

    // 获取当前扣除额总计
    const currentDeductions = result.deductions?.totalDeductions || 0;

    // 找到目标税率级距
    const targetBracket = TAX_BRACKETS.find(bracket => bracket.rate === targetBracketRate);
    if (!targetBracket) return null;

    // 计算达到该级距所需的净收入
    let requiredNetIncome: number;
    if (targetBracketRate === 5) {
      requiredNetIncome = 0; // 5%级距从0开始
    } else {
      requiredNetIncome = targetBracket.min; // 其他级距从最小值开始
    }

    // 反推总收入 = 净收入 + 扣除额总计
    const requiredGrossIncome = requiredNetIncome + currentDeductions;

    return requiredGrossIncome;
  };

  // 计算收入调整建议
  const getIncomeAdjustmentSuggestion = (targetRate: number, currentRate: number): string => {
    if (!result || !formData) return '';

    const requiredIncome = calculateRequiredIncome(targetRate);
    if (requiredIncome === null) return '';

    const currentIncome = result.grossIncome || 0;
    const difference = requiredIncome - currentIncome;

    if (Math.abs(difference) < 1000) return ''; // 差距太小不显示

    // 根据已婚状态给出建议
    if (formData.isMarried) {
      const taxpayerSalary = parseFloat(formData.salaryIncome) || 0;
      const spouseSalary = parseFloat(formData.spouseSalaryIncome) || 0;
      const taxpayerOther = parseFloat(formData.otherIncome) || 0;
      const spouseOther = parseFloat(formData.spouseOtherIncome) || 0;

      const taxpayerTotal = taxpayerSalary + taxpayerOther;
      const spouseTotal = spouseSalary + spouseOther;

      // 建议调整收入较高的一方
      if (taxpayerTotal >= spouseTotal) {
        const newTaxpayerTotal = taxpayerTotal + difference;
        const changePercent = taxpayerTotal > 0 ? ((difference / taxpayerTotal) * 100) : 0;
        const changeSign = difference > 0 ? '+' : '';
        return `建議報稅人年收入：${formatCurrency(Math.max(0, newTaxpayerTotal))} (${changeSign}${changePercent.toFixed(1)}%)`;
      } else {
        const newSpouseTotal = spouseTotal + difference;
        const changePercent = spouseTotal > 0 ? ((difference / spouseTotal) * 100) : 0;
        const changeSign = difference > 0 ? '+' : '';
        return `建議配偶年收入：${formatCurrency(Math.max(0, newSpouseTotal))} (${changeSign}${changePercent.toFixed(1)}%)`;
      }
    } else {
      const newIncome = currentIncome + difference;
      const changePercent = currentIncome > 0 ? ((difference / currentIncome) * 100) : 0;
      const changeSign = difference > 0 ? '+' : '';
      return `建議年收入：${formatCurrency(Math.max(0, newIncome))} (${changeSign}${changePercent.toFixed(1)}%)`;
    }
  };

  const currentRate = result?.bracketInfo?.rate || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{zhTW.labels.taxBracketTable2025}</CardTitle>
        {result && formData && (
          <p className="text-sm text-gray-600">
            根據您目前的扣除額設定，以下顯示達到各稅率級距所需的年收入
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">{zhTW.taxBrackets.netIncomeRange}</th>
                <th className="text-left p-2">{zhTW.taxBrackets.taxRate}</th>
                <th className="text-left p-2">{zhTW.taxBrackets.progressiveDifference}</th>
                {result && formData && (
                  <th className="text-left p-2">所需年收入</th>
                )}
              </tr>
            </thead>
            <tbody>
              {TAX_BRACKETS.map((bracket, index) => {
                const requiredIncome = result && formData ? calculateRequiredIncome(bracket.rate) : null;
                const suggestion = result && formData ? getIncomeAdjustmentSuggestion(bracket.rate, currentRate) : '';

                return (
                  <tr
                    key={index}
                    className={`border-b ${
                      result?.bracketInfo?.rate === bracket.rate
                        ? 'bg-blue-50 font-medium'
                        : ''
                    }`}
                  >
                    <td className="p-2">
                      {index === 0 ? '0' : formatCurrency(TAX_BRACKETS[index - 1].max || 0)} - {' '}
                      {bracket.max === null ? `${zhTW.taxBrackets.above}${formatCurrency(bracket.min || 0)}` : formatCurrency(bracket.max || 0)}
                    </td>
                    <td className="p-2">
                      <span className={result?.bracketInfo?.rate === bracket.rate ? 'text-blue-600 font-bold' : ''}>
                        {bracket.rate}%
                      </span>
                      {result?.bracketInfo?.rate === bracket.rate && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          目前級距
                        </span>
                      )}
                    </td>
                    <td className="p-2">{formatCurrency(bracket.progressiveDifference)}</td>
                    {result && formData && (
                      <td className="p-2">
                        {requiredIncome !== null ? (
                          <div className="space-y-1">
                            <div className="font-medium text-green-600">
                              {formatCurrency(requiredIncome)}
                            </div>
                            {suggestion && (
                              <div className="text-xs text-gray-600 break-all">
                                {suggestion}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {result?.bracketInfo && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-blue-800 font-medium">
              {zhTW.taxBrackets.yourApplicableBracket}：{result.bracketInfo.rate}%
            </div>
            {result.grossIncome && (
              <div className="text-sm text-blue-600 mt-1">
                目前年收入：{formatCurrency(result.grossIncome)}，扣除額總計：{formatCurrency(result.deductions?.totalDeductions || 0)}
              </div>
            )}
          </div>
        )}

        {result && formData && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <div className="text-yellow-800 font-medium text-sm">
              💡 稅率級距調整建議
            </div>
            <div className="text-xs text-yellow-700 mt-2 space-y-1">
              <div>• 上表「所需年收入」是根據您目前的扣除額設定計算</div>
              <div>• 調整收入建議優先考慮收入較高的一方</div>
              <div>• 實際操作前請諮詢專業稅務人員</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxBracketsTable;