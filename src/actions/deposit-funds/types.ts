export interface Transfer {
  id: string;
  type: string;
  created_at: Date;
  completed_at?: Date;
  canceled_at?: Date;
  processed_at?: Date;
  account_id: string;
  user_id: string;
  user_nonce: any;
  amount: string;
  details: Record<any, any>;
  idem: any;
}
