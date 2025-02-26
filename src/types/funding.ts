export interface FundingEntry {
  id: string;
  name: string;
  amount: number;
  status?: 'pending' | 'completed';
  transactionId?: string;
  timestamp?: Date;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  qrCode: string;
} 