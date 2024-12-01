export type SectionType = 
  | 'main'
  | 'fraudDetection'
  | 'alerts'
  | 'imageAnalysis'
  | 'userSettings'
  | 'familyManagement'
  | 'operationHistory'
  | 'antiScamGuide'
  | 'termsOfService'
  | 'helpCenter'
  | 'systemSettings';

export interface TransactionState {
  isFrozen: boolean;
  frozenUntil: Date | null;
  frozenOptions: FreezeOptions | null;
}

export interface FreezeOptions {
  blockAll: boolean;
  blockOnline: boolean;
  blockInternational: boolean;
  maxAmount: number;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}