import React, { useState, useEffect } from 'react'
import { Calculator, Info, DollarSign, Users, Home, GraduationCap, Heart, Car, PiggyBank } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  TAX_BRACKETS,
  EXEMPTION_AMOUNTS,
  SPECIAL_DEDUCTIONS,
  BASIC_LIVING_EXPENSE,
  TAX_SAVING_TIPS,
  TAX_FREE_THRESHOLDS,
  calculateTax
} from '../data/taxRules'

interface TaxCalculatorProps {}

interface FamilyMember {
  type: 'self' | 'spouse' | 'child' | 'elderly' | 'dependent';
  age?: number;
  hasDisability?: boolean;
  isStudent?: boolean;
}

interface TaxInputs {
  totalIncome: number;
  familyMembers: FamilyMember[];
  childrenUnder6: number;
  studentsInCollege: number;
  eldersOver70: number;
  disabilityCount: number;
  isMarried: boolean;
  hasRentalExpense: boolean;
  rentalAmount: number;
  savingsInterest: number;
  longtermCareCount: number;
  useStandardDeduction: boolean;
  itemizedDeductions: {
    donations: number;
    insurance: number;
    medical: number;
    mortgageInterest: number;
  };
}

const TaxCalculator: React.FC<TaxCalculatorProps> = () => {
  const [inputs, setInputs] = useState<TaxInputs>({
    totalIncome: 0,
    familyMembers: [{ type: 'self' }],
    childrenUnder6: 0,
    studentsInCollege: 0,
    eldersOver70: 0,
    disabilityCount: 0,
    isMarried: false,
    hasRentalExpense: false,
    rentalAmount: 0,
    savingsInterest: 0,
    longtermCareCount: 0,
    useStandardDeduction: true,
    itemizedDeductions: {
      donations: 0,
      insurance: 0,
      medical: 0,
      mortgageInterest: 0,
    }
  });

  const [results, setResults] = useState({
    netIncome: 0,
    taxAmount: 0,
    effectiveRate: 0,
    totalDeductions: 0,
    exemptions: 0,
    specialDeductions: 0,
    basicLifeExpenseDiff: 0
  });

  const [selectedTab, setSelectedTab] = useState<'calculator' | 'brackets' | 'tips'>('calculator');

  // 计算税额
  const calculateTaxResults = () => {
    // 计算免税额
    const regularMembers = inputs.familyMembers.length - inputs.eldersOver70;
    const exemptions = (regularMembers * EXEMPTION_AMOUNTS.standard) +
                      (inputs.eldersOver70 * EXEMPTION_AMOUNTS.elderly);

    // 计算标准扣除额或列举扣除额
    const standardDeduction = inputs.isMarried ? 262000 : 131000;
    const itemizedTotal = Object.values(inputs.itemizedDeductions).reduce((sum, val) => sum + val, 0);
    const chosenDeduction = inputs.useStandardDeduction ? standardDeduction : itemizedTotal;

    // 计算特别扣除额
    let specialDeductions = 0;

    // 薪资扣除额（假设主要收入来源为薪资）
    const salaryDeduction = Math.min(inputs.totalIncome, 218000) * inputs.familyMembers.length;
    specialDeductions += salaryDeduction;

    // 幼儿学前扣除额
    if (inputs.childrenUnder6 > 0) {
      specialDeductions += 150000; // 第一名
      if (inputs.childrenUnder6 > 1) {
        specialDeductions += (inputs.childrenUnder6 - 1) * 225000; // 第二名起
      }
    }

    // 教育扣除额
    specialDeductions += inputs.studentsInCollege * 25000;

    // 身心障碍扣除额
    specialDeductions += inputs.disabilityCount * 218000;

    // 长期照顾扣除额
    specialDeductions += inputs.longtermCareCount * 120000;

    // 储蓄投资扣除额
    specialDeductions += Math.min(inputs.savingsInterest, 270000);

    // 房屋租金扣除额
    if (inputs.hasRentalExpense) {
      specialDeductions += Math.min(inputs.rentalAmount, 180000);
    }

    // 计算基本生活费差额
    const totalMembers = inputs.familyMembers.length;
    const basicLifeExpenseTotal = totalMembers * BASIC_LIVING_EXPENSE.amount;
    const deductionTotal = exemptions + chosenDeduction +
                          Math.min(inputs.savingsInterest, 270000) + // 储蓄投资特别扣除额
                          inputs.disabilityCount * 218000 + // 身心障碍扣除额
                          inputs.studentsInCollege * 25000; // 教育扣除额
    const basicLifeExpenseDiff = Math.max(0, basicLifeExpenseTotal - deductionTotal);

    // 计算综合所得净额
    const totalDeductions = exemptions + chosenDeduction + specialDeductions + basicLifeExpenseDiff;
    const netIncome = Math.max(0, inputs.totalIncome - totalDeductions);

    // 计算税额
    const { taxAmount, effectiveRate } = calculateTax(netIncome);

    setResults({
      netIncome,
      taxAmount,
      effectiveRate,
      totalDeductions,
      exemptions,
      specialDeductions,
      basicLifeExpenseDiff
    });
  };

  useEffect(() => {
    calculateTaxResults();
  }, [inputs]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getBracketColor = (rate: number) => {
    switch(rate) {
      case 5: return 'tax-bracket-5';
      case 12: return 'tax-bracket-12';
      case 20: return 'tax-bracket-20';
      case 30: return 'tax-bracket-30';
      case 40: return 'tax-bracket-40';
      default: return 'tax-bracket-5';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 标题 */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="text-blue-600" />
          台湾综合所得税计算器 2025
        </h1>
        <p className="text-gray-600 text-lg">最新税制规则 · 详细说明 · 节税建议</p>
      </div>

      {/* 导航标签 */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            variant={selectedTab === 'calculator' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('calculator')}
            className="px-6"
          >
            <Calculator className="w-4 h-4 mr-2" />
            税额计算
          </Button>
          <Button
            variant={selectedTab === 'brackets' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('brackets')}
            className="px-6"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            税率级距
          </Button>
          <Button
            variant={selectedTab === 'tips' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('tips')}
            className="px-6"
          >
            <Info className="w-4 h-4 mr-2" />
            节税建议
          </Button>
        </div>
      </div>

      {selectedTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 输入区域 */}
          <div className="space-y-6">
            {/* 基本信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  基本信息
                </CardTitle>
                <CardDescription>
                  请输入您的年收入和家庭成员信息
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    年总收入 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    value={inputs.totalIncome || ''}
                    onChange={(e) => setInputs({...inputs, totalIncome: Number(e.target.value)})}
                    placeholder="请输入年总收入（新台币）"
                    className="text-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    包含薪资、奖金、利息、股利等各项所得
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={inputs.isMarried}
                        onChange={(e) => setInputs({...inputs, isMarried: e.target.checked})}
                      />
                      <span className="text-sm font-medium">已婚（夫妻合并申报）</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 扶养亲属 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  扶养亲属
                </CardTitle>
                <CardDescription>
                  各类扶养亲属都有不同的免税额和扣除额
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      6岁以下子女
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.childrenUnder6}
                      onChange={(e) => setInputs({...inputs, childrenUnder6: Number(e.target.value)})}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      第1名15万，第2名起22.5万扣除额
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      70岁以上长辈
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.eldersOver70}
                      onChange={(e) => setInputs({...inputs, eldersOver70: Number(e.target.value)})}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      每人免税额14.55万（比一般多4.85万）
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      大专院校学生
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.studentsInCollege}
                      onChange={(e) => setInputs({...inputs, studentsInCollege: Number(e.target.value)})}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      每人教育扣除额2.5万
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      身心障碍人数
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.disabilityCount}
                      onChange={(e) => setInputs({...inputs, disabilityCount: Number(e.target.value)})}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      每人扣除额21.8万
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 其他扣除项目 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="w-5 h-5" />
                  其他扣除项目
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    储蓄投资利息收入
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={inputs.savingsInterest}
                    onChange={(e) => setInputs({...inputs, savingsInterest: Number(e.target.value)})}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    银行存款利息等，每户最高扣除27万
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={inputs.hasRentalExpense}
                      onChange={(e) => setInputs({...inputs, hasRentalExpense: e.target.checked})}
                    />
                    <span className="text-sm font-medium">租房支出扣除额</span>
                  </label>
                  {inputs.hasRentalExpense && (
                    <div>
                      <Input
                        type="number"
                        min="0"
                        value={inputs.rentalAmount}
                        onChange={(e) => setInputs({...inputs, rentalAmount: Number(e.target.value)})}
                        placeholder="年租金支出"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        租屋自住，每户最高扣除18万（新制：特别扣除额）
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    长期照顾需求人数
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={inputs.longtermCareCount}
                    onChange={(e) => setInputs({...inputs, longtermCareCount: Number(e.target.value)})}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    符合长照需求者，每人扣除12万
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 计算结果区域 */}
          <div className="space-y-6">
            {/* 计算结果摘要 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  税额计算结果
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {formatCurrency(results.taxAmount)}
                      </div>
                      <div className="text-sm text-gray-600">应纳税额</div>
                      <div className="text-xs text-gray-500 mt-1">
                        有效税率: {results.effectiveRate.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">年总收入</div>
                      <div className="font-semibold">{formatCurrency(inputs.totalIncome)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">扣除额合计</div>
                      <div className="font-semibold text-green-600">-{formatCurrency(results.totalDeductions)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">综合所得净额</div>
                      <div className="font-semibold">{formatCurrency(results.netIncome)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">适用税率</div>
                      <div className="font-semibold">
                        {TAX_BRACKETS.find(b =>
                          results.netIncome >= b.min && (b.max === null || results.netIncome <= b.max)
                        )?.rate || 5}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 扣除额明细 */}
            <Card>
              <CardHeader>
                <CardTitle>扣除额明细</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>免税额</span>
                    <span className="font-medium">{formatCurrency(results.exemptions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>标准/列举扣除额</span>
                    <span className="font-medium">{formatCurrency(inputs.isMarried ? 262000 : 131000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>特别扣除额</span>
                    <span className="font-medium">{formatCurrency(results.specialDeductions)}</span>
                  </div>
                  {results.basicLifeExpenseDiff > 0 && (
                    <div className="flex justify-between">
                      <span>基本生活费差额</span>
                      <span className="font-medium">{formatCurrency(results.basicLifeExpenseDiff)}</span>
                    </div>
                  )}
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>扣除额总计</span>
                    <span className="text-green-600">{formatCurrency(results.totalDeductions)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 完整计算公式 */}
            <Card>
              <CardHeader>
                <CardTitle>完整计算公式</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm space-y-2">
                  <div>综合所得净额 = 所得总额 - 扣除额总计</div>
                  <div>= {formatCurrency(inputs.totalIncome)} - {formatCurrency(results.totalDeductions)}</div>
                  <div>= {formatCurrency(results.netIncome)}</div>
                  <hr className="my-2" />
                  <div>应纳税额 = 综合所得净额 × 税率 - 累进差额</div>
                  <div>= {formatCurrency(results.netIncome)} × {TAX_BRACKETS.find(b =>
                    results.netIncome >= b.min && (b.max === null || results.netIncome <= b.max)
                  )?.rate || 5}% - {formatCurrency(TAX_BRACKETS.find(b =>
                    results.netIncome >= b.min && (b.max === null || results.netIncome <= b.max)
                  )?.progressiveDifference || 0)}</div>
                  <div className="font-bold text-blue-600">= {formatCurrency(results.taxAmount)}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedTab === 'brackets' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>2025年综合所得税率级距表</CardTitle>
              <CardDescription>
                累进税率制，所得越高税率越高
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">综合所得净额</th>
                      <th className="text-left p-3">税率</th>
                      <th className="text-left p-3">累进差额</th>
                      <th className="text-left p-3">说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TAX_BRACKETS.map((bracket, index) => (
                      <tr key={index} className={`border-b ${bracket.color}`}>
                        <td className="p-3 font-medium">
                          {formatCurrency(bracket.min)} {bracket.max ? `- ${formatCurrency(bracket.max)}` : '以上'}
                        </td>
                        <td className="p-3 font-bold text-lg">{bracket.rate}%</td>
                        <td className="p-3">{formatCurrency(bracket.progressiveDifference)}</td>
                        <td className="p-3 text-sm">{bracket.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>免税门槛快速查询</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TAX_FREE_THRESHOLDS.map((threshold, index) => (
                  <div key={index} className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <h4 className="font-semibold text-green-800">{threshold.familyType}</h4>
                    <div className="text-2xl font-bold text-green-600 my-2">
                      {formatCurrency(threshold.threshold)}
                    </div>
                    <p className="text-xs text-green-700">{threshold.calculation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'tips' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>节税建议与策略</CardTitle>
              <CardDescription>
                合法节税，减轻税务负担
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TAX_SAVING_TIPS.map((tip, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2">{tip.category}</h4>
                    <p className="text-blue-700 mb-2">{tip.tip}</p>
                    <p className="text-xs text-blue-600">{tip.detail}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2025年税制新变化</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-yellow-800">幼儿学前特别扣除额大幅调整</h4>
                  <ul className="text-yellow-700 mt-2 space-y-1 text-sm">
                    <li>• 适用年龄从5岁以下扩大至6岁以下</li>
                    <li>• 第2名子女起享有加成50%（22.5万）</li>
                    <li>• 取消排富规定，所有家庭均可适用</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-semibold text-green-800">房屋租金支出改列特别扣除额</h4>
                  <ul className="text-green-700 mt-2 space-y-1 text-sm">
                    <li>• 从列举扣除额改为特别扣除额，申报更简便</li>
                    <li>• 每户每年最高18万元</li>
                    <li>• 适用租屋自住且无自有住宅者</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-800">各项金额调升</h4>
                  <ul className="text-blue-700 mt-2 space-y-1 text-sm">
                    <li>• 免税额：每人9.7万（+5000）</li>
                    <li>• 标准扣除额：单身13.1万（+7000）、夫妻26.2万（+14000）</li>
                    <li>• 薪资及身心障碍扣除额：各21.8万（+11000）</li>
                    <li>• 基本生活费：每人21万（+8000）</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TaxCalculator;