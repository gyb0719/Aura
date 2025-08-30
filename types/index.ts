export interface User {
  id: string
  email: string
  name?: string
  image?: string
  role: UserRole
  verified: boolean
  membershipTier: MembershipTier
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  USER = 'USER',
  PREMIUM = 'PREMIUM',
  ADMIN = 'ADMIN'
}

export enum MembershipTier {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND'
}

export interface Profile {
  id: string
  userId: string
  bio?: string
  age: number
  gender: Gender
  location: string
  occupation?: string
  education?: string
  height?: number
  interests: string[]
  lookingFor: LookingFor[]
  photos: Photo[]
  preferences: Preferences
  verified: boolean
  verificationStatus: VerificationStatus
  completionScore: number
  lastActive: Date
  createdAt: Date
  updatedAt: Date
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum LookingFor {
  RELATIONSHIP = 'RELATIONSHIP',
  MARRIAGE = 'MARRIAGE',
  FRIENDSHIP = 'FRIENDSHIP',
  DATING = 'DATING'
}

export interface Photo {
  id: string
  url: string
  isPrimary: boolean
  isVerified: boolean
  order: number
}

export interface Preferences {
  ageRange: [number, number]
  distance: number
  gender: Gender[]
  heightRange?: [number, number]
  education?: string[]
  hasChildren?: boolean
  wantsChildren?: boolean
  smoking?: boolean
  drinking?: string
  religion?: string
}

export interface VerificationStatus {
  identity: boolean
  education: boolean
  occupation: boolean
  social: boolean
  income?: boolean
}

export interface Match {
  id: string
  userId1: string
  userId2: string
  compatibility: number
  status: MatchStatus
  initiatedBy?: string
  matchedAt?: Date
  lastInteraction?: Date
  createdAt: Date
  updatedAt: Date
}

export enum MatchStatus {
  PENDING = 'PENDING',
  MATCHED = 'MATCHED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  BLOCKED = 'BLOCKED'
}

export interface Message {
  id: string
  matchId: string
  senderId: string
  content: string
  read: boolean
  readAt?: Date
  createdAt: Date
}

export interface Subscription {
  id: string
  userId: string
  tier: MembershipTier
  status: SubscriptionStatus
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  createdAt: Date
  updatedAt: Date
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  TRIAL = 'TRIAL',
  PAST_DUE = 'PAST_DUE'
}