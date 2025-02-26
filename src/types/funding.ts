export interface FundingEntry {
  id: string;
  name: string;
  amount: number;
  profilePic?: string;
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