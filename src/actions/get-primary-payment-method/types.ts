export interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  currency: 'USD';
  primary_buy: boolean;
  primary_sell: boolean;
  instant_buy: boolean;
  instant_sell: boolean;
  created_at: Date;
  updated_at: Date;
  resource: 'payment_method';
  resource_path: string;
  limits: Record<any, any>;
  allow_buy: boolean;
  allow_sell: boolean;
  allow_deposit: boolean;
  allow_withdraw: boolean;
  verified: boolean;
  minimum_purchase_amount: Record<any, any>;
  picker_data: Record<any, any>;
  verification_method: string;
}
