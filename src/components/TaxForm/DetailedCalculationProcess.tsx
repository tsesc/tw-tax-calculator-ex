import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatCurrency } from '../../utils/formatters';
import { EXEMPTION_AMOUNTS, BASIC_LIVING_EXPENSE } from '../../data/taxRules';
import { TaxFormData } from '../../types/tax';
import zhTW from '../../i18n/zh-TW';

interface DetailedCalculationProcessProps {
  result: any;
  formData: TaxFormData;
}

const DetailedCalculationProcess: React.FC<DetailedCalculationProcessProps> = ({ result, formData }) => {
  if (!result) return null;

  const {
    isMarried,
    elderlyOver70,
    childrenUnder6,
    students,
    disabled,
    longTermCare,
    useItemizedDeduction,
    donations,
    insurancePremiums,
    healthInsurancePremiums,
    medicalExpenses,
    disasterLoss,
    mortgageInterest,
    savingsInterest
  } = formData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{zhTW.cardTitles.completeCalculationFormula}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          {/* 步骤1：计算薪资净额 */}
          {'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-bold text-orange-800 mb-3">步骤1：计算薪资净额（薪资所得扣除薪资{zhTW.cardTitles.specialDeductions}）</h4>
              <div className="space-y-2">
                {result.salaryBreakdown.taxpayerSalary > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>纳税人薪资所得</span>
                      <span>{formatCurrency(result.salaryBreakdown.taxpayerSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>减：薪资{zhTW.cardTitles.specialDeductions}</span>
                      <span>-{formatCurrency(Math.min(result.salaryBreakdown.taxpayerSalary, 218000))}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>薪资净额</span>
                      <span>{formatCurrency(result.salaryBreakdown.taxpayerSalaryNet)}</span>
                    </div>
                  </div>
                )}
                {result.salaryBreakdown.spouseSalary > 0 && (
                  <div className="space-y-1 mt-3 pt-3 border-t">
                    <div className="flex justify-between">
                      <span>{zhTW.calculationResults.spouse}薪资所得</span>
                      <span>{formatCurrency(result.salaryBreakdown.spouseSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>减：薪资{zhTW.cardTitles.specialDeductions}</span>
                      <span>-{formatCurrency(Math.min(result.salaryBreakdown.spouseSalary, 218000))}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>{zhTW.calculationResults.spouse}薪资净额</span>
                      <span>{formatCurrency(result.salaryBreakdown.spouseSalaryNet)}</span>
                    </div>
                  </div>
                )}
                <div className="border-t pt-2 font-bold flex justify-between text-orange-600">
                  <span>{zhTW.calculationResults.grossIncome}</span>
                  <span>{formatCurrency(result.grossIncome || 0)}</span>
                </div>
              </div>
            </div>
          )}

          {/* 步骤2：计算免税额 */}
          {'deductions' in result && result.deductions && (
            <>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-3">步骤{'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? '2' : '1'}：计算免税额</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>一般免税额人数：{result.deductions.familySize - parseInt(elderlyOver70 || '0')}人</span>
                    <span>{formatCurrency((result.deductions.familySize - parseInt(elderlyOver70 || '0')) * EXEMPTION_AMOUNTS.standard)}</span>
                  </div>
                  {parseInt(elderlyOver70 || '0') > 0 && (
                    <div className="flex justify-between">
                      <span>70岁以上免税额人数：{elderlyOver70}人</span>
                      <span>{formatCurrency(parseInt(elderlyOver70) * EXEMPTION_AMOUNTS.elderly)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 font-medium flex justify-between">
                    <span>免税额小计</span>
                    <span>{formatCurrency(result.deductions.exemptions)}</span>
                  </div>
                </div>
              </div>

              {/* 步骤3：计算一般扣除额 */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-3">步骤{'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? '3' : '2'}：计算一般扣除额</h4>
                {useItemizedDeduction ? (
                  <div className="space-y-2">
                    <div className="text-sm text-green-700 mb-2">选择列举扣除额：</div>
                    {parseFloat(donations || '0') > 0 && (
                      <div className="flex justify-between">
                        <span>• 捐赠扣除额</span>
                        <span>{formatCurrency(Math.min(parseFloat(donations), (result.grossIncome || 0) * 0.2))}</span>
                      </div>
                    )}
                    {parseFloat(insurancePremiums || '0') > 0 && (
                      <div className="flex justify-between">
                        <span>• 人身保险费（非健保）</span>
                        <span>{formatCurrency(Math.min(parseFloat(insurancePremiums), result.deductions.familySize * 24000))}</span>
                      </div>
                    )}
                    {parseFloat(healthInsurancePremiums || '0') > 0 && (
                      <div className="flex justify-between">
                        <span>• 全民健保费</span>
                        <span>{formatCurrency(parseFloat(healthInsurancePremiums))}</span>
                      </div>
                    )}
                    {parseFloat(medicalExpenses || '0') > 0 && (
                      <div className="flex justify-between">
                        <span>• 医疗费用</span>
                        <span>{formatCurrency(parseFloat(medicalExpenses))}</span>
                      </div>
                    )}
                    {parseFloat(disasterLoss || '0') > 0 && (
                      <div className="flex justify-between">
                        <span>• 灾害损失</span>
                        <span>{formatCurrency(parseFloat(disasterLoss))}</span>
                      </div>
                    )}
                    {parseFloat(mortgageInterest || '0') > 0 && (
                      <div className="flex justify-between">
                        <span>• 房贷利息</span>
                        <span>{formatCurrency(Math.max(0, Math.min(parseFloat(mortgageInterest), 300000) - Math.min(parseFloat(savingsInterest || '0'), 270000)))}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 font-medium flex justify-between">
                      <span>一般扣除额小计</span>
                      <span>{formatCurrency(result.deductions.generalDeductions)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{isMarried ? '夫妻标准扣除额' : '单身标准扣除额'}</span>
                      <span>{formatCurrency(result.deductions.generalDeductions)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 步骤4：计算特别扣除额 */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-3">步骤{'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? '4' : '3'}：计算{zhTW.cardTitles.specialDeductions}</h4>
                <div className="space-y-2">
                  <div className="text-xs text-purple-600 mb-2">注：薪资{zhTW.cardTitles.specialDeductions}已在步骤1计算</div>
                  {result.deductions.breakdown.childrenDeduction > 0 && (
                    <div className="flex justify-between">
                      <span>• 幼儿学前扣除额：{childrenUnder6}人</span>
                      <span>{formatCurrency(result.deductions.breakdown.childrenDeduction)}</span>
                    </div>
                  )}
                  {result.deductions.breakdown.educationDeduction > 0 && (
                    <div className="flex justify-between">
                      <span>• 教育学费扣除额：{students}人</span>
                      <span>{formatCurrency(result.deductions.breakdown.educationDeduction)}</span>
                    </div>
                  )}
                  {result.deductions.breakdown.disabilityDeduction > 0 && (
                    <div className="flex justify-between">
                      <span>• 身心障碍扣除额：{disabled}人</span>
                      <span>{formatCurrency(result.deductions.breakdown.disabilityDeduction)}</span>
                    </div>
                  )}
                  {result.deductions.breakdown.longTermCareDeduction > 0 && (
                    <div className="flex justify-between">
                      <span>• 长期照顾扣除额：{longTermCare}人</span>
                      <span>{formatCurrency(result.deductions.breakdown.longTermCareDeduction)}</span>
                    </div>
                  )}
                  {result.deductions.breakdown.savingsDeduction > 0 && (
                    <div className="flex justify-between">
                      <span>• 储蓄投资扣除额</span>
                      <span>{formatCurrency(result.deductions.breakdown.savingsDeduction)}</span>
                    </div>
                  )}
                  {result.deductions.breakdown.rentalDeduction > 0 && (
                    <div className="flex justify-between">
                      <span>• 房屋租金扣除额</span>
                      <span>{formatCurrency(result.deductions.breakdown.rentalDeduction)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 font-medium flex justify-between">
                    <span>{zhTW.cardTitles.specialDeductions}小计</span>
                    <span>{formatCurrency(result.deductions.specialDeductions - (result.deductions.breakdown.salaryDeduction || 0))}</span>
                  </div>
                </div>
              </div>

                             {/* 扣除额总结 */}
               <div className="bg-indigo-50 p-4 rounded-lg">
                 <h4 className="font-bold text-indigo-800 mb-3">扣除额总结</h4>
                 <div className="space-y-2">
                   <div className="flex justify-between">
                     <span>免税额</span>
                     <span>{formatCurrency(result.deductions.exemptions)}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>一般扣除额</span>
                     <span>{formatCurrency(result.deductions.generalDeductions)}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>特别扣除额</span>
                     <span>{formatCurrency(result.deductions.specialDeductions)}</span>
                   </div>
                   {result.deductions.basicLivingDifference > 0 && (
                     <div className="flex justify-between">
                       <span>基本生活费差额</span>
                       <span>{formatCurrency(result.deductions.basicLivingDifference)}</span>
                     </div>
                   )}
                   <div className="border-t pt-2 font-bold text-lg flex justify-between text-indigo-600">
                     <span>扣除额总计</span>
                     <span>{formatCurrency(result.deductions.totalDeductions)}</span>
                   </div>
                 </div>
               </div>

               {/* 步骤5：基本生活费差额 */}
               {result.deductions.basicLivingDifference > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-3">步骤{'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? '5' : '4'}：基本生活费差额</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>基本生活费总额：{result.deductions.familySize}人 × {formatCurrency(BASIC_LIVING_EXPENSE.amount)}</span>
                      <span>{formatCurrency(result.deductions.familySize * BASIC_LIVING_EXPENSE.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>减：免税额+扣除额合计</span>
                      <span>-{formatCurrency(result.deductions.familySize * BASIC_LIVING_EXPENSE.amount - result.deductions.basicLivingDifference)}</span>
                    </div>
                    <div className="border-t pt-2 font-medium flex justify-between">
                      <span>基本生活费差额</span>
                      <span>{formatCurrency(result.deductions.basicLivingDifference)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 步骤6：计算综合所得净额 */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">步骤{(() => {
                  let step = 'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? 5 : 4;
                  if (result.deductions.basicLivingDifference > 0) step++;
                  return step;
                })()}：计算{zhTW.calculationResults.netIncome}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>年总收入</span>
                    <span>{formatCurrency(result.grossIncome || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>减：扣除额总计</span>
                    <span>-{formatCurrency(result.deductions.totalDeductions)}</span>
                  </div>
                  <div className="border-t pt-2 font-bold text-lg flex justify-between">
                    <span>{zhTW.calculationResults.netIncome}</span>
                    <span>{formatCurrency(result.netIncome || 0)}</span>
                  </div>
                </div>
              </div>

              {/* 步骤7：计算应纳税额 */}
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-bold text-red-800 mb-3">步骤{(() => {
                  let step = 'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? 6 : 5;
                  if (result.deductions.basicLivingDifference > 0) step++;
                  return step;
                })()}：计算应纳税额</h4>

                <div className="space-y-2">
                  <div className="text-sm text-red-700 mb-2">{zhTW.calculationResults.applicableTaxBracket}：{result.bracketInfo?.description}</div>
                  <div className="flex justify-between">
                    <span>{zhTW.calculationResults.netIncome}</span>
                    <span>{formatCurrency(result.netIncome || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>× 税率</span>
                    <span>{result.bracketInfo?.rate || 0}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>小计</span>
                    <span>{formatCurrency((result.netIncome || 0) * (result.bracketInfo?.rate || 0) / 100)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>减：累进差额</span>
                    <span>-{formatCurrency(result.bracketInfo?.progressiveDifference || 0)}</span>
                  </div>
                  <div className="border-t pt-2 font-bold text-xl flex justify-between text-red-600">
                    <span>应纳税额</span>
                    <span>{formatCurrency(result.taxAmount || 0)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedCalculationProcess;