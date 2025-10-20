import type {
  User,
  Instrument,
  QualificationApplication,
  Reservation,
  UsageRecord,
  SampleSubmission,
  TrainingRecord,
  FeeRecord,
  Message,
  Announcement,
} from "./types"

// 模拟用户数据
export const mockUsers: User[] = [
  {
    id: "1",
    name: "张三",
    email: "zhangsan@example.com",
    phone: "13800138000",
    department: "生物工程学院",
    role: "user",
    status: "active",
    wechatBound: true,
    wechatId: "wx_zhangsan",
    registeredAt: "2024-01-15T08:00:00Z",
    avatar: "/diverse-user-avatars.png",
  },
  {
    id: "2",
    name: "李四",
    email: "lisi@example.com",
    phone: "13900139000",
    department: "化学学院",
    role: "admin",
    status: "active",
    wechatBound: true,
    wechatId: "wx_lisi",
    registeredAt: "2023-09-01T08:00:00Z",
    avatar: "/admin-avatar.png",
  },
]

// 模拟仪器数据
export const mockInstruments: Instrument[] = [
  {
    id: "1",
    name: "高效液相色谱仪",
    model: "HPLC-2030C",
    assetNumber: "INST-2023-001",
    manufacturer: "岛津",
    manufactureDate: "2023-03-15",
    purchaseDate: "2023-05-20",
    department: "分析测试中心",
    category: "色谱仪器",
    contact: "王老师",
    contactPhone: "010-12345678",
    location: "实验楼A座301",
    status: "available",
    description: "用于分离、鉴定和定量分析复杂混合物中的各组分",
    imageUrl: "/hplc-chromatography-instrument.jpg",
    requiresTraining: true,
    requiresQualification: true,
  },
  {
    id: "2",
    name: "扫描电子显微镜",
    model: "SEM-5000",
    assetNumber: "INST-2022-015",
    manufacturer: "日立",
    manufactureDate: "2022-08-10",
    purchaseDate: "2022-10-15",
    department: "材料科学中心",
    category: "电镜设备",
    contact: "刘老师",
    contactPhone: "010-23456789",
    location: "实验楼B座201",
    status: "in-use",
    description: "用于观察样品表面形貌和微观结构",
    imageUrl: "/scanning-electron-microscope.jpg",
    requiresTraining: true,
    requiresQualification: true,
  },
  {
    id: "3",
    name: "核磁共振波谱仪",
    model: "NMR-600",
    assetNumber: "INST-2021-008",
    manufacturer: "布鲁克",
    manufactureDate: "2021-05-20",
    purchaseDate: "2021-07-10",
    department: "化学分析中心",
    category: "波谱仪器",
    contact: "陈老师",
    contactPhone: "010-34567890",
    location: "实验楼C座101",
    status: "available",
    description: "用于分析有机化合物的结构",
    imageUrl: "/nmr-spectrometer.jpg",
    requiresTraining: true,
    requiresQualification: true,
  },
  {
    id: "4",
    name: "气相色谱质谱联用仪",
    model: "GC-MS-7890",
    assetNumber: "INST-2023-012",
    manufacturer: "安捷伦",
    manufactureDate: "2023-01-15",
    purchaseDate: "2023-03-20",
    department: "环境科学中心",
    category: "质谱仪器",
    contact: "赵老师",
    contactPhone: "010-45678901",
    location: "实验楼A座205",
    status: "available",
    description: "用于复杂混合物的定性定量分析",
    imageUrl: "/gc-ms-instrument.jpg",
    requiresTraining: true,
    requiresQualification: true,
  },
]

// 模拟资质申请
export const mockQualifications: QualificationApplication[] = [
  {
    id: "1",
    userId: "1",
    instrumentId: "1",
    appliedAt: "2024-10-01T10:00:00Z",
    status: "approved",
    reviewedAt: "2024-10-02T14:30:00Z",
    reviewedBy: "2",
    reviewNote: "已完成培训和考试，准予使用",
    trainingCompleted: true,
    examPassed: true,
  },
  {
    id: "2",
    userId: "1",
    instrumentId: "3",
    appliedAt: "2024-10-15T09:00:00Z",
    status: "pending",
    trainingCompleted: false,
    examPassed: false,
  },
]

// 模拟预约记录
export const mockReservations: Reservation[] = [
  {
    id: "1",
    userId: "1",
    instrumentId: "1",
    startTime: "2024-10-21T09:00:00Z",
    endTime: "2024-10-21T11:00:00Z",
    purpose: "样品分析实验",
    status: "approved",
    createdAt: "2024-10-18T10:00:00Z",
    approvedAt: "2024-10-18T15:00:00Z",
    approvedBy: "2",
  },
  {
    id: "2",
    userId: "1",
    instrumentId: "1",
    startTime: "2024-10-22T14:00:00Z",
    endTime: "2024-10-22T16:00:00Z",
    purpose: "化合物结构分析",
    status: "pending",
    createdAt: "2024-10-19T11:00:00Z",
  },
]

// 模拟使用记录
export const mockUsageRecords: UsageRecord[] = [
  {
    id: "1",
    userId: "1",
    instrumentId: "1",
    reservationId: "1",
    startTime: "2024-10-15T09:00:00Z",
    endTime: "2024-10-15T11:30:00Z",
    duration: 150,
    fee: 300,
    status: "completed",
    notes: "实验顺利完成",
  },
]

// 模拟送样记录
export const mockSampleSubmissions: SampleSubmission[] = [
  {
    id: "1",
    userId: "1",
    instrumentId: "2",
    sampleName: "纳米材料样品A",
    sampleType: "固体粉末",
    quantity: 5,
    testItems: ["表面形貌观察", "元素分析"],
    urgency: "normal",
    description: "需要观察纳米颗粒的形貌和尺寸分布",
    status: "testing",
    submittedAt: "2024-10-10T10:00:00Z",
    expectedCompletionDate: "2024-10-25T17:00:00Z",
  },
]

// 模拟培训记录
export const mockTrainingRecords: TrainingRecord[] = [
  {
    id: "1",
    userId: "1",
    instrumentId: "1",
    trainedAt: "2024-09-20T14:00:00Z",
    trainer: "王老师",
    duration: 3,
    passed: true,
    certificate: "CERT-2024-001",
  },
]

// 模拟扣费记录
export const mockFeeRecords: FeeRecord[] = [
  {
    id: "1",
    userId: "1",
    type: "usage",
    relatedId: "1",
    amount: 300,
    description: "高效液相色谱仪使用费（2.5小时）",
    status: "confirmed",
    createdAt: "2024-10-15T12:00:00Z",
    confirmedAt: "2024-10-16T09:00:00Z",
  },
  {
    id: "2",
    userId: "1",
    type: "sample",
    relatedId: "1",
    amount: 500,
    description: "扫描电镜送样检测费",
    status: "pending",
    createdAt: "2024-10-10T11:00:00Z",
  },
]

// 模拟消息通知
export const mockMessages: Message[] = [
  {
    id: "1",
    userId: "1",
    type: "reservation-reminder",
    title: "预约提醒",
    content: "您预约的高效液相色谱仪将在明天上午9:00开始使用，请准时到达",
    read: false,
    createdAt: "2024-10-20T18:00:00Z",
    relatedId: "1",
  },
  {
    id: "2",
    userId: "1",
    type: "qualification-result",
    title: "资质审核通过",
    content: "您申请的高效液相色谱仪使用资质已通过审核，现在可以预约使用",
    read: true,
    createdAt: "2024-10-02T14:30:00Z",
    relatedId: "1",
  },
]

// 模拟公告
export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "国庆假期仪器使用安排",
    content: "国庆假期期间（10月1日-7日），所有仪器暂停预约使用，如有特殊需求请联系管理员",
    publishedAt: "2024-09-25T10:00:00Z",
    expiresAt: "2024-10-08T00:00:00Z",
    mustRead: true,
  },
  {
    id: "2",
    title: "扫描电镜维护通知",
    content: "扫描电子显微镜将于10月28日-30日进行年度维护保养，期间暂停使用",
    instrumentId: "2",
    publishedAt: "2024-10-18T09:00:00Z",
    expiresAt: "2024-10-31T00:00:00Z",
    mustRead: false,
  },
]

// 当前登录用户（模拟）
export const currentUser = mockUsers[0]
