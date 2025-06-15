// 2025年台灣綜合所得稅規則資料

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  progressiveDifference: number;
  description: string;
  color: string;
}

export interface TaxDeduction {
  name: string;
  amount: number;
  description: string;
  example: string;
  conditions?: string[];
}

export interface SpecialDeduction {
  name: string;
  amount: number | number[];
  description: string;
  example: string;
  conditions?: string[];
  isPerPerson?: boolean;
}

export interface ItemizedDeduction {
  name: string;
  limit: number | string;
  description: string;
  example: string;
  conditions: string[];
  requiredDocuments: string[];
}

// 2025年稅率級距表
export const TAX_BRACKETS: TaxBracket[] = [
  {
    min: 0,
    max: 590000,
    rate: 5,
    progressiveDifference: 0,
    description: "年所得淨額59萬元以下",
    color: "tax-bracket-5"
  },
  {
    min: 590001,
    max: 1330000,
    rate: 12,
    progressiveDifference: 41300,
    description: "年所得淨額59萬-133萬元",
    color: "tax-bracket-12"
  },
  {
    min: 1330001,
    max: 2660000,
    rate: 20,
    progressiveDifference: 147700,
    description: "年所得淨額133萬-266萬元",
    color: "tax-bracket-20"
  },
  {
    min: 2660001,
    max: 4980000,
    rate: 30,
    progressiveDifference: 413700,
    description: "年所得淨額266萬-498萬元",
    color: "tax-bracket-30"
  },
  {
    min: 4980001,
    max: null,
    rate: 40,
    progressiveDifference: 911700,
    description: "年所得淨額498萬元以上",
    color: "tax-bracket-40"
  }
];

// 免稅額 (每人可減除金額)
export const EXEMPTION_AMOUNTS = {
  standard: 97000, // 一般免稅額 (較112年度增加5,000元)
  elderly: 145500, // 70歲以上免稅額 (較112年度增加7,500元)
  description: "納稅義務人本人、配偶及受扶養親屬每人免稅額97,000元",
  elderlyDescription: "年滿70歲之納稅義務人、配偶及受扶養直系尊親屬每人145,500元",
  conditions: [
    "受扶養親屬須符合所得稅法第17條規定",
    "直系尊親屬年滿60歲或無謀生能力",
    "子女未成年或因就學、身心障礙、無謀生能力受扶養",
    "同胞兄弟姊妹未成年或符合扶養條件",
    "其他親屬須確實居住並受扶養"
  ]
};

// 標準扣除額 (可選擇標準扣除額或列舉扣除額)
export const STANDARD_DEDUCTIONS: TaxDeduction[] = [
  {
    name: "單身標準扣除額",
    amount: 131000, // 較112年度增加7,000元
    description: "單身納稅人可選擇標準扣除額131,000元",
    example: "單身上班族年收入80萬元，可直接扣除13.1萬元，無需逐項列舉各項支出"
  },
  {
    name: "夫妻標準扣除額",
    amount: 262000, // 較112年度增加14,000元
    description: "夫妻合併申報可選擇標準扣除額262,000元",
    example: "夫妻合併申報年收入150萬元，可直接扣除26.2萬元"
  }
];

// 列舉扣除額 (需檢附證明文件，與標準扣除額擇一適用)
export const ITEMIZED_DEDUCTIONS: ItemizedDeduction[] = [
  {
    name: "捐贈",
    limit: "綜合所得總額20%",
    description: "對合法立案之教育、文化、公益、慈善機構團體之捐贈",
    example: "年收入100萬元，捐贈慈濟基金會15萬元，可全額列舉扣除",
    conditions: [
      "一般捐贈：不超過綜合所得總額20%",
      "政府捐獻：國防、勞軍、對政府捐獻無金額限制",
      "文化資產：古蹟修覆等文化捐贈無金額限制",
      "政治獻金：不超過綜合所得總額20%，最高20萬元"
    ],
    requiredDocuments: [
      "受贈單位開立之收據正本",
      "政治獻金須檢附監察院規定格式收據",
      "實物捐贈須檢附買賣契約及成本證明"
    ]
  },
  {
    name: "人身保險費",
    limit: "每人每年24,000元",
    description: "納稅義務人、配偶、受扶養直系親屬之人身保險費",
    example: "全家4口每人保險費3萬元，可扣除：4人×2.4萬=9.6萬元",
    conditions: [
      "人身保險費：每人每年上限24,000元",
      "全民健保費：不受金額限制，全額扣除",
      "被保險人與要保人須在同一申報戶",
      "限人身保險：人壽、健康、傷害、年金保險",
      "包含：勞保、就保、軍公教保、國民年金、農保"
    ],
    requiredDocuments: [
      "保險費收據正本或繳納證明",
      "由機關彙繳者需服務單位證明",
      "國外保險需保險單及收據正本"
    ]
  },
  {
    name: "醫藥及生育費",
    limit: "無金額限制",
    description: "付與公立醫院、健保特約醫院及合法醫院之醫療費用",
    example: "家人住院手術費15萬元，扣除保險給付3萬元，可列舉扣除12萬元",
    conditions: [
      "醫療院所：公立醫院、健保特約醫院診所",
      "包含：掛號費、部分負擔、醫療費、生育費",
      "特殊醫材：助聽器、義肢、輪椅等全額扣除",
      "牙科治療：鑲牙、假牙、齒列矯正(非美容目的)",
      "國外就醫：限公立醫院或大學附設醫院",
      "長照費用：身心失能長期照護醫療費"
    ],
    requiredDocuments: [
      "醫療院所開立之收據正本",
      "國外就醫需醫院證明(大陸地區需海基會驗證)",
      "特殊醫材需醫師診斷證明",
      "收據遺失可用存根聯影本並加蓋醫院章"
    ]
  },
  {
    name: "災害損失",
    limit: "無金額限制",
    description: "遭受不可抗力災害之財產損失",
    example: "住宅因地震受損50萬元，扣除保險理賠10萬元，可扣除40萬元",
    conditions: [
      "不可抗力災害：震災、風災、水災、火災、土石流等",
      "須扣除：保險賠償、救濟金、財產出售部分",
      "申請期限：災害發生後30日內報請稽徵機關勘查",
      "範圍：納稅人、配偶、受扶養親屬之財產損失"
    ],
    requiredDocuments: [
      "國稅局核發之災害損失證明",
      "損失清單及相關證明文件",
      "未及時申請者需提出確實證據"
    ]
  },
  {
    name: "自用住宅購屋借款利息",
    limit: "每戶每年300,000元",
    description: "購買自用住宅向金融機構借款所支付之利息",
    example: "房貸年利息40萬元，儲蓄扣除額15萬元，可扣除：40-15=25萬元",
    conditions: [
      "金額限制：支付利息-儲蓄投資特別扣除額，最高30萬元",
      "房屋限制：每一申報戶限一屋",
      "所有權：房屋須為納稅人、配偶或受扶養親屬所有",
      "使用限制：供自住使用，無出租、營業或執業",
      "戶籍登記：須於該址辦竣戶籍登記",
      "借款限制：限向金融機構借款"
    ],
    requiredDocuments: [
      "當年度繳納利息單據正本",
      "建物權狀影本",
      "戶籍資料影本",
      "借款契約書影本"
    ]
  }
];

// 特別扣除額 (符合條件者可同時適用)
export const SPECIAL_DEDUCTIONS: SpecialDeduction[] = [
  {
    name: "財產交易損失扣除額",
    amount: 0, // 以當年度財產交易所得為限
    description: "前3年度財產交易損失可扣除當年度財產交易所得",
    example: "去年股票損失10萬元，今年股票獲利5萬元，可扣除5萬元損失",
    conditions: [
      "扣除限制：不得超過當年度財產交易所得",
      "年限：損失可往後3年扣除",
      "分開計稅：夫妻分開計稅者限扣除個人所得",
      "免稅所得：免稅財產交易所得不得扣除損失"
    ]
  },
  {
    name: "儲蓄投資特別扣除額",
    amount: 270000,
    description: "銀行存款利息及儲蓄性質信托收益扣除",
    example: "銀行定存利息25萬元，可全額扣除；超過27萬元以27萬元為限",
    conditions: [
      "適用範圍：金融機構存款利息、儲蓄性質信託收益",
      "金額上限：每戶全年合計27萬元",
      "不包含：郵政儲金免稅利息、公債公司債利息",
      "不包含：分離課稅之有價證券利息",
      "夫妻分開計稅：優先由他方及受扶養親屬扣除"
    ]
  },
  {
    name: "薪資所得特別扣除額",
    amount: 218000, // 較112年度增加11,000元
    description: "每位有薪資所得者均可扣除218,000元",
    example: "夫妻皆有薪資所得，可扣除：2人×21.8萬=43.6萬元",
    isPerPerson: true,
    conditions: [
      "適用對象：有薪資所得者",
      "扣除金額：每人每年218,000元",
      "無須證明：不需檢附任何文件"
    ]
  },
  {
    name: "身心障礙特別扣除額",
    amount: 218000, // 較112年度增加11,000元
    description: "領有身心障礙證明或精神疾病嚴重病人每人可扣除218,000元",
    example: "家中有2名身心障礙成員，可扣除：2人×21.8萬=43.6萬元",
    isPerPerson: true,
    conditions: [
      "適用對象：納稅人、配偶、受扶養親屬",
      "身心障礙者：領有身心障礙證明",
      "精神病患：精神衛生法第3條第4款嚴重病人",
      "扣除金額：每人每年218,000元"
    ]
  },
  {
    name: "教育學費特別扣除額",
    amount: 25000,
    description: "大專以上院校就讀子女教育學費，每人最高25,000元",
    example: "子女大學學費8萬元，可扣除2.5萬元；學費2萬元，可扣除2萬元",
    isPerPerson: true,
    conditions: [
      "適用對象：納稅人申報扶養就讀大專以上子女",
      "學校限制：經教育部認可之大專以上院校",
      "不適用：空大、空專、五專前3年",
      "扣除金額：每人最高25,000元，不足者以實際發生額為限",
      "已受補助：須扣除政府補助金額"
    ]
  },
  {
    name: "幼兒學前特別扣除額",
    amount: [150000, 225000],
    description: "6歲以下子女扣除額，第1名150,000元，第2名起每人225,000元",
    example: "家有3名5歲以下子女：15萬+22.5萬+22.5萬=60萬元",
    conditions: [
      "適用年齡：6歲以下(民國107年含該年以後出生)",
      "第1名子女：每年扣除150,000元",
      "第2名以上：每人每年扣除225,000元(加成50%)",
      "重大變革：取消排富規定，所有家庭均可適用",
      "較112年度變化：年齡從5歲以下擴大至6歲以下"
    ]
  },
  {
    name: "長期照顧特別扣除額",
    amount: 120000,
    description: "符合長期照顧需求之身心失能者，每人可扣除120,000元",
    example: "家中有失智癥長者符合長照需求，可扣除12萬元",
    isPerPerson: true,
    conditions: [
      "適用對象：須長期照顧之身心失能者",
      "資格條件：符合衛福部相關公告規定",
      "外籍看護：聘僱外籍看護或符合聘僱資格",
      "長照服務：使用長照2.0服務達第2-8級",
      "住宿機構：入住機構全年達90日",
      "排富規定：適用稅率20%以上或基本所得額超過750萬元不適用"
    ]
  },
  {
    name: "房屋租金支出特別扣除額",
    amount: 180000,
    description: "租屋自住支出，每戶每年最高可扣除180,000元(重大變革：改為特別扣除額)",
    example: "年租金支出20萬元，可扣除18萬元(以較低者為準)",
    conditions: [
      "重大變革：從列舉扣除額改為特別扣除額",
      "適用對象：納稅人、配偶及受扶養直系親屬",
      "房屋條件：在國內租屋供自住，非營業或執業使用",
      "無自有住宅：租屋期間在國內無自有住宅",
      "扣除金額：每戶每年180,000元為限",
      "須扣除：接受政府補助部分",
      "排富規定：適用稅率20%以上或基本所得額超過750萬元不適用"
    ]
  }
];

// 基本生活費 (保障基本生活水準)
export const BASIC_LIVING_EXPENSE = {
  amount: 210000, // 較112年度增加8,000元
  description: "每人基本生活費210,000元",
  note: "基本生活費總額超過免稅額及各項扣除額合計時，可減除差額",
  calculation: "基本生活費總額 = 210,000元 × (納稅人+配偶+受扶養親屬人數)",
  conditions: [
    "比較項目：免稅額+一般扣除額+儲蓄投資+身心障礙+教育學費+幼兒學前+長期照顧+房屋租金特別扣除額",
    "差額扣除：基本生活費總額 > 比較項目合計數，可扣除差額",
    "保障機制：確保每人基本生活所需不被課稅"
  ]
};

// 退職所得定額免稅 (較112年度調增)
export const RETIREMENT_INCOME_EXEMPTION = {
  onetime: {
    threshold1: 198000, // 較112年度增加10,000元
    threshold2: 398000, // 較112年度增加21,000元
    description: "一次領取退職所得免稅門檻調升"
  },
  periodic: {
    threshold: 859000, // 較112年度增加45,000元
    description: "分期領取退職所得免稅門檻調升"
  }
};

// 免稅門檻快速查詢
export const TAX_FREE_THRESHOLDS = [
  {
    familyType: "單身上班族",
    threshold: 446000,
    calculation: "免稅額9.7萬 + 標準扣除額13.1萬 + 薪資扣除額21.8萬 = 44.6萬元"
  },
  {
    familyType: "雙薪夫妻",
    threshold: 892000,
    calculation: "免稅額19.4萬 + 標準扣除額26.2萬 + 薪資扣除額43.6萬 = 89.2萬元"
  },
  {
    familyType: "四口之家(2名6歲以下子女)",
    threshold: 1461000,
    calculation: "免稅額38.8萬 + 標準扣除額26.2萬 + 薪資扣除額43.6萬 + 幼兒扣除額37.5萬 = 146.1萬元"
  },
  {
    familyType: "三代同堂(含70歲以上長者)",
    threshold: 1200000,
    calculation: "依具體家庭成員結構計算，長者享有更高免稅額14.55萬元"
  }
];

// 節稅建議
export const TAX_SAVING_TIPS = [
  {
    category: "扣除額選擇策略",
    tip: "精算標準扣除額vs列舉扣除額，選擇較高者",
    detail: "列舉扣除包括：捐贈、保險費、醫療費、房貸利息、災害損失等，需保留單據證明"
  },
  {
    category: "保險費規劃",
    tip: "善用人身保險費扣除額，每人每年最高2.4萬元",
    detail: "包括人壽、健康、傷害、年金保險，全民健保費不受金額限制全額扣除"
  },
  {
    category: "捐贈節稅",
    tip: "合法捐贈可列舉扣除，一般限所得總額20%",
    detail: "對政府、國防、文化資產等特定捐贈不受20%限制，可全額扣除"
  },
  {
    category: "幼兒扣除額善用",
    tip: "2025年幼兒扣除額大幅優化，第2名起加成50%",
    detail: "年齡從5歲擴大至6歲以下，取消排富規定，所有家庭均可適用"
  },
  {
    category: "房屋租金新制",
    tip: "租屋族重大利多：房租改列特別扣除額",
    detail: "從列舉扣除改為特別扣除，每戶18萬元，無自有住宅租屋自住者適用"
  },
  {
    category: "醫療費用扣除",
    tip: "醫療費無金額上限，可全額列舉扣除",
    detail: "包含掛號費、醫療費、特殊醫材等，需扣除保險理賠部分"
  },
  {
    category: "儲蓄投資規劃",
    tip: "儲蓄投資特別扣除額每戶27萬元",
    detail: "銀行存款利息在27萬元內可全額扣除，超過部分按一般所得課稅"
  },
  {
    category: "長期照顧扣除",
    tip: "家有長照需求者每人可扣除12萬元",
    detail: "須符合衛福部長照評估標準，檢附相關證明文件"
  }
];

// 2025年重大稅制變革摘要
export const TAX_REFORM_2025 = [
  {
    item: "幼兒學前特別扣除額",
    change: "年齡擴大、金額加成、取消排富",
    before: "5歲以下每人12萬元，有排富規定",
    after: "6歲以下第1名15萬、第2名起22.5萬元，無排富規定",
    impact: "多子女家庭大幅受惠"
  },
  {
    item: "房屋租金支出扣除",
    change: "從列舉改為特別扣除額",
    before: "列舉扣除每戶12萬元，與購屋貸款利息擇一",
    after: "特別扣除每戶18萬元，可與其他扣除額並用",
    impact: "租屋族稅負減輕"
  },
  {
    item: "各項金額全面調升",
    change: "免稅額、扣除額普遍上調",
    before: "免稅額9.2萬、標準扣除額單身12.4萬",
    after: "免稅額9.7萬、標準扣除額單身13.1萬",
    impact: "整體稅負減輕"
  }
];

// 計算扣除額總額
export function calculateDeductions(params: {
  isMarried: boolean;
  childrenCount: number;
  dependentsCount?: number;
  elderlyCount: number;
  studentCount: number;
  disabledCount: number;
  longTermCareCount?: number;
  rentalExpenses: number;
  savingsInterest: number;
  useItemizedDeduction: boolean;
  donations: number;
  insurancePremiums: number;
  healthInsurancePremiums?: number;
  medicalExpenses: number;
  disasterLoss: number;
  mortgageInterest: number;
  grossIncome: number;
  hasSalaryIncome?: boolean;
}) {
  const {
    isMarried,
    childrenCount,
    dependentsCount = 0,
    elderlyCount,
    studentCount,
    disabledCount,
    longTermCareCount = 0,
    rentalExpenses,
    savingsInterest,
    useItemizedDeduction,
    donations,
    insurancePremiums,
    healthInsurancePremiums = 0,
    medicalExpenses,
    disasterLoss,
    mortgageInterest,
    grossIncome
  } = params;

  // 計算家庭人數
  const familySize = 1 + (isMarried ? 1 : 0) + childrenCount + dependentsCount + elderlyCount + studentCount + disabledCount;

  // 計算免稅額
  const regularMembers = familySize - elderlyCount;
  const exemptions = regularMembers * EXEMPTION_AMOUNTS.standard + elderlyCount * EXEMPTION_AMOUNTS.elderly;

  // 計算一般扣除額（標準扣除額 vs 列舉扣除額）
  let generalDeductions;
  if (useItemizedDeduction) {
    // 列舉扣除額計算
    let itemizedTotal = 0;

    // 捐贈（限所得總額20%）
    itemizedTotal += Math.min(donations, grossIncome * 0.2);

    // 人身保險費（每人限24,000元，健保費無限制）
    const familyInsuranceLimit = familySize * 24000;
    itemizedTotal += Math.min(insurancePremiums, familyInsuranceLimit);

    // 全民健保費（無金額限制）
    itemizedTotal += healthInsurancePremiums;

    // 醫療費用（無限制）
    itemizedTotal += medicalExpenses;

    // 災害損失（無限制）
    itemizedTotal += disasterLoss;

    // 購屋借款利息（限30萬，需減除儲蓄投資扣除額）
    const mortgageDeduction = Math.max(0, Math.min(mortgageInterest, 300000) - Math.min(savingsInterest, 270000));
    itemizedTotal += mortgageDeduction;

    // 比較標準扣除額與列舉扣除額，選擇較高者
    const standardAmount = isMarried ? STANDARD_DEDUCTIONS[1].amount : STANDARD_DEDUCTIONS[0].amount;
    generalDeductions = Math.max(standardAmount, itemizedTotal);
  } else {
    // 使用標準扣除額
    generalDeductions = isMarried ? STANDARD_DEDUCTIONS[1].amount : STANDARD_DEDUCTIONS[0].amount;
  }

    // 計算特別扣除額（薪資特別扣除額已在收入階段處理）
  let specialDeductions = 0;

  // 幼兒學前特別扣除額
  if (childrenCount > 0) {
    specialDeductions += 150000; // 第1名
    if (childrenCount > 1) {
      specialDeductions += (childrenCount - 1) * 225000; // 第2名起
    }
  }

  // 教育學費特別扣除額
  specialDeductions += studentCount * 25000;

  // 身心障礙特別扣除額
  specialDeductions += disabledCount * 218000;

  // 長期照顧特別扣除額
  specialDeductions += longTermCareCount * 120000;

  // 儲蓄投資特別扣除額
  specialDeductions += Math.min(savingsInterest, 270000);

  // 房屋租金支出特別扣除額（2025年新制）
  specialDeductions += Math.min(rentalExpenses, 180000);

  // 基本生活費差額計算
  const basicLifeExpense = familySize * BASIC_LIVING_EXPENSE.amount;
  const comparionItems = exemptions + generalDeductions +
    Math.min(savingsInterest, 270000) + // 儲蓄投資
    disabledCount * 218000 + // 身心障礙
    longTermCareCount * 120000 + // 長期照顧
    studentCount * 25000 + // 教育學費
    (childrenCount > 0 ? (150000 + (childrenCount - 1) * 225000) : 0) + // 幼兒學前
    Math.min(rentalExpenses, 180000); // 房屋租金

  const basicLivingDifference = Math.max(0, basicLifeExpense - comparionItems);

  const totalDeductions = exemptions + generalDeductions + specialDeductions + basicLivingDifference;

  return {
    exemptions,
    generalDeductions,
    specialDeductions,
    basicLivingDifference,
    totalDeductions,
    familySize,
    breakdown: {
      standardDeduction: !useItemizedDeduction ? generalDeductions : 0,
      itemizedDeduction: useItemizedDeduction ? generalDeductions : 0,
      salaryDeduction: 0, // 薪資扣除額已在收入階段處理
      childrenDeduction: childrenCount > 0 ? (150000 + (childrenCount - 1) * 225000) : 0,
      educationDeduction: studentCount * 25000,
      disabilityDeduction: disabledCount * 218000,
      longTermCareDeduction: longTermCareCount * 120000,
      savingsDeduction: Math.min(savingsInterest, 270000),
      rentalDeduction: Math.min(rentalExpenses, 180000)
    }
  };
}

// 計算稅額
export function calculateTax(netIncome: number): {
  taxAmount: number;
  effectiveRate: number;
  bracketInfo: TaxBracket;
} {
  // 找到適用的稅率級距
  let applicableBracket = TAX_BRACKETS[0];
  for (const bracket of TAX_BRACKETS) {
    if (netIncome >= bracket.min && (bracket.max === null || netIncome <= bracket.max)) {
      applicableBracket = bracket;
      break;
    }
  }

  // 計算應納稅額：綜合所得淨額 × 稅率 - 累進差額
  const taxAmount = Math.max(0, netIncome * (applicableBracket.rate / 100) - applicableBracket.progressiveDifference);

  // 計算有效稅率
  const effectiveRate = netIncome > 0 ? (taxAmount / netIncome) * 100 : 0;

  return {
    taxAmount,
    effectiveRate,
    bracketInfo: applicableBracket
  };
}

// 計算所得淨額
export function calculateNetIncome(grossIncome: number, deductions: ReturnType<typeof calculateDeductions>): number {
  return Math.max(0, grossIncome - deductions.totalDeductions);
}

// 計算完整稅務信息
export function calculateFullTaxInfo(params: Parameters<typeof calculateDeductions>[0]) {
  const deductions = calculateDeductions(params);
  const netIncome = calculateNetIncome(params.grossIncome, deductions);
  const taxInfo = calculateTax(netIncome);

  return {
    grossIncome: params.grossIncome,
    deductions,
    netIncome,
    ...taxInfo,
    afterTaxIncome: params.grossIncome - taxInfo.taxAmount
  };
}