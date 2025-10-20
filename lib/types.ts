// 用户类型
export type UserRole = "user" | "admin"
export type UserStatus = "active" | "banned" | "pending"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  department: string
  role: UserRole
  status: UserStatus
  wechatBound: boolean
  wechatId?: string
  registeredAt: string
  avatar?: string
}

// 仪器类型
export type InstrumentStatus = "available" | "in-use" | "maintenance" | "offline"

export interface Instrument {
  id: string
  name: string
  model: string
  assetNumber: string
  manufacturer: string
  manufactureDate: string
  purchaseDate: string
  department: string
  category: string
  contact: string
  contactPhone: string
  location: string
  status: InstrumentStatus
  description: string
  imageUrl?: string
  requiresTraining: boolean
  requiresQualification: boolean
}

// 资质申请
export type QualificationStatus = "pending" | "approved" | "rejected"

export interface QualificationApplication {
  id: string
  userId: string
  instrumentId: string
  appliedAt: string
  status: QualificationStatus
  reviewedAt?: string
  reviewedBy?: string
  reviewNote?: string
  trainingCompleted: boolean
  examPassed: boolean
}

// 预约记录
export type ReservationStatus = "pending" | "approved" | "rejected" | "completed" | "cancelled"

export interface Reservation {
  id: string
  userId: string
  instrumentId: string
  startTime: string
  endTime: string
  purpose: string
  status: ReservationStatus
  createdAt: string
  approvedAt?: string
  approvedBy?: string
  cancelledAt?: string
  cancelReason?: string
}

// 使用记录
export interface UsageRecord {
  id: string
  userId: string
  instrumentId: string
  reservationId?: string
  startTime: string
  endTime?: string
  duration?: number // 分钟
  fee?: number
  status: "in-progress" | "completed"
  notes?: string
}

// 送样预约
export type SampleStatus = "pending" | "approved" | "rejected" | "testing" | "completed"

export interface SampleSubmission {
  id: string
  userId: string
  instrumentId: string
  sampleName: string
  sampleType: string
  quantity: number
  testItems: string[]
  urgency: "normal" | "urgent"
  description: string
  status: SampleStatus
  submittedAt: string
  expectedCompletionDate?: string
  actualCompletionDate?: string
  result?: string
  fee?: number
}

// 培训记录
export interface TrainingRecord {
  id: string
  userId: string
  instrumentId: string
  trainedAt: string
  trainer: string
  duration: number // 小时
  passed: boolean
  certificate?: string
}

// 扣费记录
export type FeeStatus = "pending" | "confirmed" | "disputed"

export interface FeeRecord {
  id: string
  userId: string
  type: "usage" | "sample" | "training" | "other"
  relatedId: string // 关联的使用记录或送样记录ID
  amount: number
  description: string
  status: FeeStatus
  createdAt: string
  confirmedAt?: string
}

// 消息通知
export type MessageType =
  | "reservation-reminder"
  | "qualification-result"
  | "reservation-result"
  | "overtime-warning"
  | "system-notice"

export interface Message {
  id: string
  userId: string
  type: MessageType
  title: string
  content: string
  read: boolean
  createdAt: string
  relatedId?: string
}

// 公告
export interface Announcement {
  id: string
  title: string
  content: string
  instrumentId?: string
  publishedAt: string
  expiresAt?: string
  mustRead: boolean
}
