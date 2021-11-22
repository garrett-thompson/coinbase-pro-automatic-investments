export interface Order {
  id: string;
  price?: string;
  size?: string;
  product_id: string;
  profile_id?: string;
  side: string;
  funds?: string;
  specified_funds?: string;
  type: string;
  post_only: boolean;
  created_at: Date;
  fill_fees: string;
  filled_size: string;
  executed_value: string;
  status: string;
  settled: boolean;
}
